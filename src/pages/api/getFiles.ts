import { type NextApiRequest, type NextApiResponse } from "next";
import { getFilesInFolder } from "../../googleDrive";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const files = await getFilesInFolder(process.env.GOOGLE_DRIVE_ID!);
    res.status(200).json(files);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Error retrieving files" });
  }
}
