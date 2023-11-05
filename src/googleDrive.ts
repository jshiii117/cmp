import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";

const auth = new GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  },
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

const drive = google.drive({ version: "v3", auth });

interface Folder {
  name: string;
  link: string;
  children: (Folder | File)[];
  type: "folder";
}

interface File {
  name: string;
  link: string;
  type: "file";
}

export async function getFilesInFolder(folderId: string): Promise<Folder> {
  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    fields: "files(id, name, webViewLink, mimeType)",
  });

  if (process.env.NODE_ENV === "development") {
    console.log(`Retrieved ${res.data.files!.length} files from Google Drive`);
  }

  const folder: Folder = {
    name: "Review Packages",
    link: "",
    type: "folder",
    children: [],
  };

  for (const file of res.data.files!) {
    if (file.mimeType === "application/vnd.google-apps.folder") {
      const subFolder = await getFilesInFolder(file.id!);
      subFolder.name = file.name!;
      subFolder.link = file.webViewLink!;
      subFolder.type = "folder";
      folder.children.push(subFolder);
    } else {
      folder.children.push({
        name: file.name!,
        link: file.webViewLink!,
        type: "file",
      });
    }
  }

  return folder;
}
