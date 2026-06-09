import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";

// POST: Create a new quote request
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, industry, service, details, timeline } = body;

    if (!name || !email || !details) {
      return NextResponse.json(
        { error: "Name, email, and details are required." },
        { status: 400 }
      );
    }

    const quote = await prisma.quoteRequest.create({
      data: {
        name,
        email,
        phone,
        company,
        industry,
        service,
        details,
        timeline,
        status: "new",
      },
    });

    return NextResponse.json({ success: true, quote }, { status: 201 });
  } catch (error) {
    console.error("Error creating quote request:", error);
    return NextResponse.json(
      { error: "Failed to submit request" },
      { status: 500 }
    );
  }
}

// GET: Fetch all quote requests (Protected)
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await verifyAuth(token);

    const quotes = await prisma.quoteRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ quotes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
