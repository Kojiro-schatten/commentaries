// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import challenges from "../challenges.json";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return;
  }
  res.status(200).json(challenges);
};
