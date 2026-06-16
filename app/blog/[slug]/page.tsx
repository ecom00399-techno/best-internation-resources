import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from "next";

const prisma = new PrismaClient();

type Props = {
  params: { slug: string }
};

export const dynamic = "force-dynamic";

export async function generateMetadata(

  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug }
  });

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.seoTitle || `${post.title} | Best Internation Resources Blog`,
    description: post.seoDesc || post.excerpt || `Read ${post.title} on Best Internation Resources.`,
    keywords: post.seoKeywords || "Logistics Blog, Supply Chain Insights",
  };
}

export default async function BlogPost({ params }: Props) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug }
  });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#FF6A00] mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Blog
        </Link>
        
        <header className="mb-10">
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-[#0D1B2A] mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-gray-500 font-medium pb-8 border-b border-gray-100">
            <span className="flex items-center gap-2"><Calendar size={16} className="text-[#FF6A00]"/> {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center gap-2"><User size={16} className="text-[#FF6A00]"/> {post.author}</span>
          </div>
        </header>

        {/* Since content might be simple text or Markdown, we render it simply. 
            For Markdown, a library like react-markdown would be needed, but we'll use whitespace preservation for basic formatting first. */}
        <div className="prose prose-lg prose-orange max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
          <div className="text-sm text-gray-500 font-medium">
            Published by Best Internation Resources LLC
          </div>
          <Link href="/quote" className="bg-[#FF6A00] text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors shadow-md">
            Get a Logistics Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
