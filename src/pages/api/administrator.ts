import { dbConnect } from "@/app/lib/mongodb";
import Administrator from "@/app/models/administrator";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    const administrators = await Administrator.find({});
    return res.status(200).json(administrators);
  }

  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const newAdministrator = await Administrator.create({
        email,
        password,
      });

      return res.status(201).json(newAdministrator);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
