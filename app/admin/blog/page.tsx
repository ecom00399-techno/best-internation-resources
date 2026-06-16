"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Save } from "lucide-react";

export default function BlogManager() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      if (data.posts) {
        setPosts(data.posts);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = currentPost.id ? "PUT" : "POST";
    
    try {
      const res = await fetch("/api/posts", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentPost)
      });
      
      if (res.ok) {
        setIsEditing(false);
        setCurrentPost(null);
        fetchPosts();
      } else {
        alert("Failed to save post");
      }
    } catch (err) {
      alert("Error saving post");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    try {
      const res = await fetch(`/api/posts?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchPosts();
      }
    } catch (err) {
      alert("Error deleting post");
    }
  };

  if (loading) return <div className="p-8">Loading posts...</div>;

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#0D1B2A]">{currentPost?.id ? "Edit Post" : "New Post"}</h2>
          <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={currentPost?.title || ""}
                onChange={e => setCurrentPost({...currentPost, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={currentPost?.slug || ""}
                onChange={e => setCurrentPost({...currentPost, slug: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              rows={2}
              value={currentPost?.excerpt || ""}
              onChange={e => setCurrentPost({...currentPost, excerpt: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content (Markdown supported)</label>
            <textarea
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
              rows={10}
              value={currentPost?.content || ""}
              onChange={e => setCurrentPost({...currentPost, content: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 border-t pt-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                value={currentPost?.seoTitle || ""}
                onChange={e => setCurrentPost({...currentPost, seoTitle: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                value={currentPost?.seoDesc || ""}
                onChange={e => setCurrentPost({...currentPost, seoDesc: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SEO Keywords</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                value={currentPost?.seoKeywords || ""}
                onChange={e => setCurrentPost({...currentPost, seoKeywords: e.target.value})}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 border-t pt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={currentPost?.published || false}
                onChange={e => setCurrentPost({...currentPost, published: e.target.checked})}
                className="w-4 h-4 text-[#FF6A00]"
              />
              <span className="text-sm font-medium">Published</span>
            </label>
            
            <button type="submit" className="ml-auto flex items-center gap-2 bg-[#FF6A00] text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600">
              <Save size={18} /> Save Post
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#0D1B2A]">Blog Posts</h2>
        <button 
          onClick={() => {
            setCurrentPost({ title: "", slug: "", content: "", published: false });
            setIsEditing(true);
          }}
          className="flex items-center gap-2 bg-[#0D1B2A] text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800"
        >
          <Plus size={16} /> New Post
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500">
              <th className="p-4 font-semibold">Title</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">No blog posts found. Create one!</td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-[#0D1B2A]">{post.title}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${post.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 flex gap-3">
                    <button onClick={() => { setCurrentPost(post); setIsEditing(true); }} className="text-blue-600 hover:text-blue-800">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
