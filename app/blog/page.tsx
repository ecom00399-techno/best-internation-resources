import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logistics Blog & Supply Chain Insights | Best Internation Resources",
  description:
    "Expert logistics articles, freight forwarding guides, and supply chain strategies from the team at Best Internation Resources LLC. Stay ahead with industry insights.",
  keywords:
    "Logistics Blog, Supply Chain Insights, Freight News, Import Export Guide, B2B Logistics Articles",
  alternates: {
    canonical: "https://bestinternationresources.com/blog",
  },
  openGraph: {
    title: "Logistics Blog & Supply Chain Insights | Best Internation Resources",
    description:
      "Expert logistics articles, freight forwarding guides, and supply chain strategies from Best Internation Resources LLC.",
    url: "https://bestinternationresources.com/blog",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#FF6A00] font-semibold text-sm uppercase tracking-widest">
            Our Insights
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#0D1B2A] mt-3">
            Logistics Blog & Supply Chain Insights
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Expert freight forwarding guides, customs compliance articles, and supply chain strategies from our industry team.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-lg">
                New insights are coming soon. Check back later!
              </p>
            </div>
          ) : (
            posts.map((post) => {
              const mins = readingTime(post.content);
              return (
                <article
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  {/* Top color bar */}
                  <div className="h-1.5 bg-gradient-to-r from-[#FF6A00] to-orange-400" />

                  <div className="p-6 flex-1 flex flex-col">
                    {/* Category tag */}
                    <span className="inline-block bg-[#FF6A00]/10 text-[#FF6A00] text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4 w-fit">
                      Logistics Insights
                    </span>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-4 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short", day: "numeric", year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User size={13} /> {post.author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={13} /> {mins} min read
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-heading font-bold text-[#0D1B2A] mb-3 leading-snug group-hover:text-[#FF6A00] transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-1">
                      {post.excerpt || post.content.substring(0, 130) + "…"}
                    </p>

                    {/* Read more */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 font-semibold text-sm text-[#FF6A00] hover:text-orange-600 transition-colors mt-auto"
                    >
                      Read Article <ArrowRight size={15} />
                    </Link>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center bg-[#0D1B2A] rounded-2xl p-12">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
            Ready to optimize your supply chain?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Our logistics experts are ready to help you build a faster, more
            resilient global freight operation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="bg-[#FF6A00] text-white px-8 py-3.5 rounded-lg font-bold hover:bg-orange-600 transition-colors shadow-lg"
            >
              Request a Quote
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-lg font-bold hover:bg-white/20 transition-colors"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
