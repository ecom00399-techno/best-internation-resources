import { NextRequest, NextResponse } from "next/server";
import { createToken } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const adminEmail = process.env.ADMIN_EMAIL || "Support@bestinternationresources.com";
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    const adminPasswordPlain = process.env.ADMIN_PASSWORD; // Fallback for simple setups

    let isPasswordValid = false;
    
    if (adminPasswordHash) {
      isPasswordValid = await bcrypt.compare(password, adminPasswordHash);
    } else if (adminPasswordPlain) {
      isPasswordValid = password === adminPasswordPlain;
    } else {
      // Default fallback if no env vars set (for development)
      isPasswordValid = password === "password123";
    }

    if (email === adminEmail && isPasswordValid) {
      const token = await createToken({ email });

      const response = NextResponse.json({ success: true }, { status: 200 });
      
      // Set HTTP-only cookie
      response.cookies.set({
        name: "admin_token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
