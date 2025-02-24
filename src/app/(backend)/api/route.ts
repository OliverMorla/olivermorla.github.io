import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "Serverless API is working!" },
    { status: 200 }
  );
}
