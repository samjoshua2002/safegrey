import { NextResponse } from "next/server";
import connectDB from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    
    console.log(
      "Mongo keepalive executed:",
      new Date().toISOString()
    );

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      message: "Database connection active"
    });

  } catch (error) {
    console.error("Database connection failed:", error);
    return NextResponse.json(
      { success: false, error: "Database connection failed" },
      { status: 500 }
    );
  }
}
