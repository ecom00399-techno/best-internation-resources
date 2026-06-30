import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Calendar, User, Clock, ArrowRight, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logistics Blog & Supply Chain Insights | Best Internation Resources",
  description:
    "Expert logistics articles, freight forwarding guides, and supply chain strategies from the team at Best Internation Resources LLC. Stay ahead with industry insights.",
  keywords:
    "Logistics Blog, Supply Chain Insights, Freight News, Import Export Guide, B2B Logistics Articles, Freight Broker Tips",
  alternates: {
    canonical: "https://bestinternationresources.com/blog",
  },
  openGraph: {
    title: "Logistics Blog & Supply Chain Insights | Best Internation Resources",
    description:
      "Expert logistics articles, freight forwarding guides, and supply chain strategies from Best Internation Resources LLC.",
    url: "https://bestinternationresources.com/blog",
    type: "website",
    images: [{ url: "https://bestinternationresources.com/logo.png", width: 1200, height: 630 }],
  },
};

export const dynamic = "force-dynamic";

function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateShort(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Blog List JSON-LD
function BlogListSchema({ posts }: { posts: any[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Best Internation Resources Logistics Blog",
    description: "Expert logistics articles, supply chain guides, and freight forwarding insights.",
    url: "https://bestinternationresources.com/blog",
    publisher: {
      "@type": "Organization",
      name: "Best Internation Resources LLC",
      logo: { "@type": "ImageObject", url: "https://bestinternationresources.com/logo.png" },
    },
    blogPost: posts.slice(0, 5).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      url: `https://bestinternationresources.com/blog/${p.slug}`,
      datePublished: new Date(p.createdAt).toISOString(),
      author: { "@type": "Organization", name: "Best Internation Resources LLC" },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  const featuredPost = posts[0] || null;
  const restPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Page Header ── */}
      <section className="bg-[#0D1B2A] pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-[#FF6A00] font-semibold text-sm uppercase tracking-widest mb-4">
            <BookOpen size={16} /> Our Insights
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mt-2 mb-4 leading-tight">
            Logistics Blog &<br className="hidden sm:block" /> Supply Chain Insights
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Expert freight forwarding guides, customs compliance articles, and supply chain strategies
            from our industry team.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><BookOpen size={14} /> {posts.length} Articles</span>
            <span>·</span>
            <span>Updated regularly</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        {posts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-gray-100">
            <BookOpen size={40} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg font-medium">New insights coming soon. Check back shortly!</p>
          </div>
        ) : (
          <>
            {/* ── Featured Post (Latest) ── */}
            {featuredPost && (
              <div className="mb-12">
                <p className="text-xs font-bold text-[#FF6A00] uppercase tracking-widest mb-4">Featured Article</p>
                <Link href={`/blog/${featuredPost.slug}`} className="group block">
                  <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden md:flex">
                    {/* Left color accent */}
                    <div className="w-full md:w-2 flex-shrink-0 bg-gradient-to-b from-[#FF6A00] to-orange-400 h-2 md:h-auto md:rounded-l-2xl" />

                    <div className="p-8 md:p-10 flex flex-col justify-center flex-1">
                      <span className="inline-block bg-[#FF6A00]/10 text-[#FF6A00] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 w-fit">
                        Logistics Insights
                      </span>
                      <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-[#0D1B2A] mb-4 leading-snug group-hover:text-[#FF6A00] transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-600 mb-6 text-base leading-relaxed line-clamp-3">
                        {featuredPost.excerpt || featuredPost.content.substring(0, 200) + "…"}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-400 font-medium mb-6">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-[#FF6A00]" />
                          {formatDate(featuredPost.createdAt)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <User size={14} className="text-[#FF6A00]" />
                          {featuredPost.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} className="text-[#FF6A00]" />
                          {readingTime(featuredPost.content)} min read
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-2 text-[#FF6A00] font-bold text-sm group-hover:gap-3 transition-all">
                        Read Full Article <ArrowRight size={16} />
                      </span>
                    </div>
                  </article>
                </Link>
              </div>
            )}

            {/* ── Rest of Posts Grid ── */}
            {restPosts.length > 0 && (
              <>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">More Articles</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {restPosts.map((post) => {
                    const mins = readingTime(post.content);
                    return (
                      <article
                        key={post.id}
                        className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group"
                      >
                        {/* Top bar */}
                        <div className="h-1 bg-gradient-to-r from-[#FF6A00] to-orange-300 flex-shrink-0" />

                        <div className="p-6 flex flex-col flex-1">
                          {/* Category + Date row */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="inline-block bg-[#FF6A00]/10 text-[#FF6A00] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                              Logistics
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Calendar size={11} /> {formatDateShort(post.createdAt)}
                            </span>
                          </div>

                          {/* Title */}
                          <h2 className="text-base md:text-lg font-heading font-bold text-[#0D1B2A] mb-3 leading-snug group-hover:text-[#FF6A00] transition-colors line-clamp-3 flex-1">
                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                          </h2>

                          {/* Excerpt */}
                          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-5">
                            {post.excerpt || post.content.substring(0, 100) + "…"}
                          </p>

                          {/* Footer */}
                          <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                            <span className="flex items-center gap-1.5 text-xs text-gray-400">
                              <Clock size={12} /> {mins} min read
                            </span>
                            <Link
                              href={`/blog/${post.slug}`}
                              className="inline-flex items-center gap-1 text-xs font-bold text-[#FF6A00] hover:text-orange-600 transition-colors"
                            >
                              Read more <ArrowRight size={13} />
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}

        {/* ── Bottom CTA ── */}
        <div className="mt-16 bg-gradient-to-br from-[#0D1B2A] to-[#1a2e45] rounded-2xl p-10 md:p-14 text-center">
          <span className="text-[#FF6A00] text-sm font-bold uppercase tracking-widest">Work With Us</span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mt-3 mb-4">
            Ready to optimize your supply chain?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto text-base leading-relaxed">
            Our logistics experts help B2B companies cut freight costs, reduce customs delays, and build resilient global supply chains.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="bg-[#FF6A00] text-white px-8 py-3.5 rounded-lg font-bold hover:bg-orange-600 transition-colors shadow-lg hover:-translate-y-0.5"
            >
              Request a Free Quote
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-lg font-bold hover:bg-white/20 transition-colors"
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      </div>

      <BlogListSchema posts={posts} />
    </div>
  );
}
