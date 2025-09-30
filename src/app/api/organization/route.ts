import dbConnect from "@/app/lib/mongodb";
import Organization from "@/app/models/organization";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const orgs = await Organization.find();
    if (orgs) {
      return NextResponse.json({ orgs });
    }
  } catch (error) {}
}

export async function POST(req: Request) {
  try {
    const { org_name } = await req.json();

    if (!org_name) {
      return NextResponse.json(
        { error: "Organization name are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    await Organization.create({
      org_name,
    });

    return NextResponse.json(
      { message: "Organization created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
