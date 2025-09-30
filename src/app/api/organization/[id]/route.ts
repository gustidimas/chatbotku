import authOptions from "@/app/lib/authOptions";
import dbConnect from "@/app/lib/mongodb";
import Organization from "@/app/models/organization";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized: login required" },
        { status: 401 }
      );
    }

    await dbConnect();

    const orgs = await Organization.find({
      administrator_id: session.user.id,
    }).select("-__v");

    if (orgs) {
      return NextResponse.json({ orgs });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
