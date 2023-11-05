/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextApiRequest, type NextApiResponse } from "next";

async function getContent(type: string) {
  let endpoint: string | undefined;

  if (type === "event") {
    endpoint = process.env.EVENT_ENDPOINT;
  } else if (type === "reviewSession") {
    endpoint = process.env.REVIEW_SESSION_ENDPOINT;
  } else {
    throw new Error("Invalid content type");
  }

  try {
    const response = await fetch(endpoint!);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    throw new Error(`Failed to fetch ${type}s: ` + (error as Error).message);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { type } = req.query;

  try {
    if (typeof type !== "string") {
      throw new Error("Invalid type parameter");
    }

    const content = await getContent(type);
    res.status(200).json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error retrieving ${type}s` });
  }
}
