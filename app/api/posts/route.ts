import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const post = await prisma.post.findUnique({
        where: { slug }
      });
      return NextResponse.json({ post });
    }

    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authCookie = cookies().get("admin_session");
    if (!authCookie || authCookie.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, content, excerpt, author, published, seoTitle, seoDesc, seoKeywords } = body;

    const newPost = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        author: author || "Admin",
        published: published || false,
        seoTitle,
        seoDesc,
        seoKeywords
      }
    });

    return NextResponse.json({ post: newPost }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const authCookie = cookies().get("admin_session");
    if (!authCookie || authCookie.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, title, slug, content, excerpt, author, published, seoTitle, seoDesc, seoKeywords } = body;

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        excerpt,
        author,
        published,
        seoTitle,
        seoDesc,
        seoKeywords
      }
    });

    return NextResponse.json({ post: updatedPost });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const authCookie = cookies().get("admin_session");
    if (!authCookie || authCookie.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    await prisma.post.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
