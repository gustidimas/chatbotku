import dbConnect from "@/app/lib/mongodb";
import Administrator from "@/app/models/administrator";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const administrator = await Administrator.find();
    if (administrator) {
      return NextResponse.json({ administrator });
    } else {
      return NextResponse.json(
        { message: "Administrator not found" },
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
