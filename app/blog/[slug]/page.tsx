import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  params: { slug: string };
};

export const dynamic = "force-dynamic";

// ─── Per-Post SEO Metadata ────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post) return { title: "Post Not Found" };

  const title = post.seoTitle || `${post.title} | Best Internation Resources Blog`;
  const description = post.seoDesc || post.excerpt || `Read ${post.title} on Best Internation Resources.`;
  const canonicalUrl = `https://bestinternationresources.com/blog/${params.slug}`;

  return {
    title,
    description,
    keywords: post.seoKeywords || "Logistics Blog, Supply Chain, Freight Forwarding",
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Best Internation Resources",
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: ["Best Internation Resources LLC"],
      images: [
        {
          url: "https://bestinternationresources.com/logo.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://bestinternationresources.com/logo.png"],
    },
  };
}

// ─── Estimate reading time ────────────────────────────────────────────────────
function readingTime(text: string) {
  const wordsPerMin = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMin));
}

// ─── Article JSON-LD Schema (for Google News + AI Overviews citations) ───────
function ArticleSchema({ post }: { post: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDesc || post.excerpt,
    author: {
      "@type": "Organization",
      name: "Best Internation Resources LLC",
      url: "https://bestinternationresources.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Best Internation Resources LLC",
      logo: {
        "@type": "ImageObject",
        url: "https://bestinternationresources.com/logo.png",
      },
    },
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://bestinternationresources.com/blog/${post.slug}`,
    },
    image: "https://bestinternationresources.com/logo.png",
    keywords: post.seoKeywords || "logistics, supply chain, freight forwarding",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Breadcrumb Schema ────────────────────────────────────────────────────────
function BreadcrumbSchema({ post }: { post: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://bestinternationresources.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://bestinternationresources.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://bestinternationresources.com/blog/${post.slug}` },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogPost({ params }: Props) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post || !post.published) notFound();

  const readMins = readingTime(post.content);

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#FF6A00] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#FF6A00] transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-[#0D1B2A] font-medium truncate max-w-[200px]">{post.title}</span>
        </nav>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#FF6A00] mb-8 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          <span className="inline-block bg-[#FF6A00]/10 text-[#FF6A00] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
            Logistics Insights
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-[#0D1B2A] mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium pb-8 border-b border-gray-100">
            <span className="flex items-center gap-2">
              <Calendar size={16} className="text-[#FF6A00]" />
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long", day: "numeric", year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-2">
              <User size={16} className="text-[#FF6A00]" />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} className="text-[#FF6A00]" />
              {readMins} min read
            </span>
          </div>
        </header>

        {/* Excerpt / Intro highlight */}
        {post.excerpt && (
          <div className="mb-10 p-5 bg-[#0D1B2A]/5 border-l-4 border-[#FF6A00] rounded-r-lg text-[#0D1B2A] font-medium text-lg leading-relaxed italic">
            {post.excerpt}
          </div>
        )}

        {/* Rich Markdown Content */}
        <div className="prose prose-lg prose-headings:font-heading prose-headings:text-[#0D1B2A] prose-h1:text-4xl prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-a:text-[#FF6A00] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#0D1B2A] prose-li:text-gray-700 prose-p:text-gray-700 prose-p:leading-relaxed prose-hr:border-gray-200 max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Article Footer */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">Published by</p>
              <p className="font-heading font-bold text-[#0D1B2A]">Best Internation Resources LLC</p>
              <p className="text-sm text-gray-500">Sheridan, Wyoming · Founded 2019</p>
            </div>
            <Link
              href="/quote"
              className="bg-[#FF6A00] text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors shadow-md flex items-center gap-2 flex-shrink-0"
            >
              Get a Logistics Quote <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-12 bg-[#0D1B2A] rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-heading font-bold mb-2">Ready to optimize your supply chain?</h3>
            <p className="text-gray-300 text-sm">Talk to our logistics experts and get a custom freight solution for your business.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/contact" className="bg-white text-[#0D1B2A] px-5 py-3 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors">
              Contact Us
            </Link>
            <Link href="/quote" className="bg-[#FF6A00] text-white px-5 py-3 rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors">
              Get Quote
            </Link>
          </div>
        </div>
      </article>

      {/* Structured Data */}
      <ArticleSchema post={post} />
      <BreadcrumbSchema post={post} />
    </div>
  );
}
