import authOptions from "@/app/lib/authOptions";
import dbConnect from "@/app/lib/mongodb";
import Organization from "@/app/models/organization";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await dbConnect();

    const org = await Organization.findOne({
      _id: id,
      administrator_id: session.user.id,
    }).select("-__v");

    if (!org) {
      return NextResponse.json(
        { error: "Organization not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ org });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const { org_name } = body;

    if (typeof org_name !== "string" || org_name.trim() === "") {
      return NextResponse.json(
        { error: "Organization name is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const org = await Organization.findOneAndUpdate(
      {
        _id: id,
        administrator_id: session.user.id,
      },
      {
        org_name: org_name.trim(),
      },
      {
        new: true,
        runValidators: true,
        select: "-__v",
      }
    );

    if (!org) {
      return NextResponse.json(
        {
          error: "Organization not found or access denied",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ org });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        {
          error:
            "An organization with this name already exists for your account",
        },
        { status: 409 }
      );
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return NextResponse.json(
        { error: "Validation failed", details: messages },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();

    const org = await Organization.findOneAndDelete({
      _id: id,
      administrator_id: session.user.id,
    });

    if (!org) {
      return NextResponse.json(
        { error: "Organization not found or access denied" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Organization deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
