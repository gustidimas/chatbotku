import authOptions from "@/app/lib/authOptions";
import dbConnect from "@/app/lib/mongodb";
import Organization from "@/app/models/organization";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const orgs = await Organization.find();
    if (orgs) {
      return NextResponse.json({ orgs });
    } else {
      return NextResponse.json(
        { message: "Organization not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized: login required" },
        { status: 401 }
      );
    }

    const { org_name } = await req.json();

    if (!org_name) {
      return NextResponse.json(
        { error: "Organization name are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const newOrganization = await Organization.create({
      administrator_id: session.user.id,
      org_name,
    });

    return NextResponse.json(
      { message: "Organization created successfully", org: newOrganization },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
