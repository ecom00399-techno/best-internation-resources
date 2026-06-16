import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Insights | Best Internation Resources LLC",
  description: "Read the latest insights, news, and strategies on global logistics, supply chain management, and freight brokerage from industry experts.",
  keywords: "Logistics Blog, Supply Chain Insights, Freight News",
};

export const dynamic = "force-dynamic";


const prisma = new PrismaClient();

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#FF6A00] font-semibold text-sm uppercase tracking-widest">Our Insights</span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#0D1B2A] mt-3">Logistics Blog</h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">Stay updated with the latest trends, strategies, and news in global supply chain management.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-lg">New insights are coming soon. Check back later!</p>
            </div>
          ) : (
            posts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-medium">
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(post.createdAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
                  </div>
                  <h2 className="text-xl font-heading font-bold text-[#0D1B2A] mb-3 leading-snug hover:text-[#FF6A00] transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-1">
                    {post.excerpt || post.content.substring(0, 120) + "..."}
                  </p>
                  <Link href={`/blog/${post.slug}`} className="inline-block mt-auto font-semibold text-[#FF6A00] hover:text-orange-600 border-b-2 border-transparent hover:border-[#FF6A00] w-fit pb-1 transition-all">
                    Read Article &rarr;
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
