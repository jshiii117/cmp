import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";

const auth = new GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  },
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

import { type Folder, File } from "./types";

const drive = google.drive({ version: "v3", auth });

export async function getFilesInFolder(folderId: string): Promise<Folder> {
  if (folderId == "initial") {
    folderId = process.env.GOOGLE_DRIVE_ID!;
  }

  try {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: "files(id, name, webViewLink, mimeType)",
    });

    if (process.env.NODE_ENV === "development") {
      console.log(
        `Retrieved ${res.data.files!.length} files from Google Drive`,
      );
    }

    const folder: Folder = {
      id: folderId,
      name: "here/?",
      link: "",
      type: "folder",
      children: [],
    };

    for (const file of res.data.files!) {
      if (file.mimeType === "application/vnd.google-apps.folder") {
        folder.children.push({
          id: file.id!, // Assuming the folder object has an 'id' property
          name: file.name!,
          link: file.webViewLink!,
          type: "folder",
          children: [], // Initially empty, to be populated when fetching data later
        });
      } else {
        folder.children.push({
          name: file.name!,
          link: file.webViewLink!,
          type: "file",
        });
      }
    }

    return folder;
  } catch (error) {
    console.error("Error fetching files in folder:", error);
    throw error;
  }
}
