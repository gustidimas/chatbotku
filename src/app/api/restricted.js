import { getServerSession } from "next-auth";
import Nextauth from "./auth/[...nextauth]";

export default async (req, res) => {
  const session = await getServerSession(req, res, Nextauth);

  if (session) {
    res.send({
      content: "This is protected content.",
    });
  } else {
    res.send({
      error: "You must be signed in to view the protected content.",
    });
  }
};
