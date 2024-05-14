import { NextResponse } from "next/server";
import { generateOtp } from "../../../utils/otp";

export async function GET() {
  const otp = generateOtp();
  return NextResponse.json({ otp });
}
