import { type NextApiRequest, type NextApiResponse } from "next";
import { getFilesInFolder } from "../../googleDrive";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { folderId } = req.query;
    if (typeof folderId !== "string") {
      res.status(400).json({ message: "Invalid folder ID" });
      return;
    }
    const files = await getFilesInFolder(folderId);
    res.status(200).json(files);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Error retrieving files" });
  }
}
