import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const adminEmail = process.env.ADMIN_EMAIL || "Support@bestinternationresources.com";
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    const adminPasswordPlain = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET || "bir-fallback-secret-key-2024";

    // Check email first
    if (email.toLowerCase() !== adminEmail.toLowerCase()) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Check password
    let isPasswordValid = false;
    if (adminPasswordHash && adminPasswordHash.startsWith("$2")) {
      // Valid bcrypt hash
      isPasswordValid = await bcrypt.compare(password, adminPasswordHash);
    } else if (adminPasswordPlain) {
      isPasswordValid = password === adminPasswordPlain;
    } else {
      // Dev fallback
      isPasswordValid = password === "BIR@Admin2024!";
    }

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create JWT token
    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(new TextEncoder().encode(jwtSecret));

    const response = NextResponse.json({ success: true }, { status: 200 });
    response.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;

  } catch (error: any) {
    console.error("Login error:", error?.message || error);
    return NextResponse.json({ error: "Internal server error", detail: error?.message }, { status: 500 });
  }
}
