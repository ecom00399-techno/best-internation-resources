"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Mail, Package, Download, Plus, Trash2, Star } from "lucide-react";

type Lead = { id: string; name: string; email: string; phone?: string; company?: string; industry?: string; service?: string; status: string; createdAt: string };
type Quote = { id: string; name: string; email: string; phone?: string; company?: string; industry?: string; service?: string; status: string; createdAt: string };
type Contact = { id: string; name: string; email: string; phone?: string; message?: string; status: string; createdAt: string };
type Review = { id: string; author: string; role?: string; company?: string; content: string; rating: number; createdAt: string };

export default function AdminDashboard() {
  const router = useRouter();

  // ✅ ALL hooks declared at the top — no conditional returns before these
  const [activeTab, setActiveTab] = useState("leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newReview, setNewReview] = useState({ author: "", role: "", company: "", content: "", rating: 5 });
  const [addingReview, setAddingReview] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lRes, qRes, cRes, rRes] = await Promise.all([
          fetch("/api/leads"),
          fetch("/api/quotes"),
          fetch("/api/contact"),
          fetch("/api/reviews"),
        ]);

        if (lRes.status === 401) {
          router.push("/admin/login");
          return;
        }

        if (lRes.status === 500 || qRes.status === 500) {
          setDbError(true);
          setLoading(false);
          return;
        }

        const lData = await lRes.json().catch(() => ({}));
        const qData = await qRes.json().catch(() => ({}));
        const cData = await cRes.json().catch(() => ({}));
        const rData = await rRes.json().catch(() => ({}));

        setLeads(lData.leads || []);
        setQuotes(qData.quotes || []);
        setContacts(cData.contacts || []);
        setReviews(rData.reviews || []);
        setLoading(false);
      } catch (err) {
        console.error("Admin fetch error:", err);
        setDbError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const updateStatus = async (type: "leads" | "quotes" | "contacts", id: string, status: string) => {
    const endpoints: Record<string, string> = {
      leads: `/api/leads/${id}`,
      quotes: `/api/quotes/${id}`,
      contacts: `/api/contact/${id}`,
    };
    try {
      const res = await fetch(endpoints[type], {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const update = (prev: any[]) => prev.map((i) => (i.id === id ? { ...i, status } : i));
        if (type === "leads") setLeads((p) => update(p));
        if (type === "quotes") setQuotes((p) => update(p));
        if (type === "contacts") setContacts((p) => update(p));
      }
    } catch (e) {}
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingReview(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });
      if (res.ok) {
        const added = await res.json();
        setReviews((prev) => [added, ...prev]);
        setNewReview({ author: "", role: "", company: "", content: "", rating: 5 });
      }
    } catch (e) {}
    setAddingReview(false);
  };

  const handleDeleteReview = async (id: string) => {
    try {
      await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {}
  };

  const exportCSV = (dataset: any[], name: string) => {
    if (!dataset.length) return;
    const headers = Object.keys(dataset[0]).filter((k) => k !== "id");
    const csv = [headers.join(","), ...dataset.map((r) => headers.map((h) => `"${r[h] || ""}"`).join(","))].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `BIR_${name}_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const filter = (arr: any[]) =>
    arr.filter(
      (i) =>
        i.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.company?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalNew =
    leads.filter((l) => l.status === "new").length +
    quotes.filter((q) => q.status === "new").length +
    contacts.filter((c) => c.status === "new").length;

  // ✅ Conditional returns AFTER all hooks
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#FF6A00] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#0D1B2A] font-semibold">Loading Dashboard...</p>
          <p className="text-gray-400 text-sm mt-1">Connecting to database</p>
        </div>
      </div>
    );
  }

  const StatusBadge = ({ status }: { status: string }) => (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
      status === "new" ? "bg-blue-100 text-blue-700" :
      status === "contacted" ? "bg-orange-100 text-orange-700" :
      "bg-green-100 text-green-700"
    }`}>{status}</span>
  );

  const renderTable = (arr: any[], type: "leads" | "quotes" | "contacts") => {
    const filtered = filter(arr);
    if (filtered.length === 0) {
      return (
        <div className="p-16 text-center">
          <p className="text-gray-400 text-lg">No {type} found</p>
          {dbError && <p className="text-red-500 text-sm mt-2">Database not connected — set DATABASE_URL in Vercel</p>}
        </div>
      );
    }
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-xs tracking-wider">
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Name / Company</th>
              <th className="px-4 py-3 text-left font-medium">Contact</th>
              {type !== "contacts" && <th className="px-4 py-3 text-left font-medium">Industry</th>}
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                  {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-[#0D1B2A]">{item.name}</div>
                  {item.company && <div className="text-gray-400 text-xs">{item.company}</div>}
                </td>
                <td className="px-4 py-3">
                  <div className="text-gray-700">{item.email}</div>
                  {item.phone && <div className="text-gray-400 text-xs">{item.phone}</div>}
                </td>
                {type !== "contacts" && (
                  <td className="px-4 py-3 text-gray-600 capitalize">{item.industry || "—"}</td>
                )}
                <td className="px-4 py-3">
                  <StatusBadge status={item.status || "new"} />
                </td>
                <td className="px-4 py-3 text-right">
                  <select
                    value={item.status || "new"}
                    onChange={(e) => updateStatus(type, item.id, e.target.value)}
                    className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:border-[#FF6A00] cursor-pointer"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50 min-h-screen">
      {/* DB Error Banner */}
      {dbError && (
        <div className="bg-red-600 text-white text-sm px-6 py-3 flex flex-wrap items-center gap-2">
          <span className="font-bold">⚠️ Database Not Connected.</span>
          <span>Set the correct DATABASE_URL (pooler URL) in Vercel Environment Variables, then redeploy.</span>
          <a href="https://vercel.com" target="_blank" rel="noreferrer" className="ml-auto underline whitespace-nowrap">Fix in Vercel →</a>
        </div>
      )}

      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0D1B2A]">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">Best Internation Resources LLC</p>
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-sm text-gray-500">Support@bestinternationresources.com</span>
          <button onClick={handleLogout} className="text-sm bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors font-medium">
            Logout
          </button>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Leads", value: leads.length, icon: Users, color: "text-blue-600 bg-blue-50" },
            { label: "Quote Requests", value: quotes.length, icon: Package, color: "text-purple-600 bg-purple-50" },
            { label: "Contact Messages", value: contacts.length, icon: Mail, color: "text-green-600 bg-green-50" },
            { label: "New / Unread", value: totalNew, icon: Star, color: "text-orange-600 bg-orange-50" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${s.color}`}>
                <s.icon size={20} />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-medium">{s.label}</p>
                <p className="text-2xl font-bold text-[#0D1B2A]">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100 flex overflow-x-auto">
            {[
              { key: "leads", label: `Leads (${leads.length})` },
              { key: "quotes", label: `Quotes (${quotes.length})` },
              { key: "contacts", label: `Messages (${contacts.length})` },
              { key: "reviews", label: `Reviews (${reviews.length})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-4 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.key
                    ? "text-[#FF6A00] border-[#FF6A00]"
                    : "text-gray-500 border-transparent hover:text-[#0D1B2A]"
                }`}
              >
                {tab.label}
              </button>
            ))}

            <div className="flex items-center gap-2 ml-auto px-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 w-40 focus:outline-none focus:border-[#FF6A00]"
              />
              <button
                onClick={() => {
                  const map: Record<string, any[]> = { leads, quotes, contacts, reviews };
                  exportCSV(map[activeTab] || [], activeTab);
                }}
                className="flex items-center gap-1 text-sm bg-[#0D1B2A] text-white px-3 py-1.5 rounded-lg hover:bg-[#1a2f45] transition-colors"
              >
                <Download size={14} /> Export
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "leads" && renderTable(leads, "leads")}
          {activeTab === "quotes" && renderTable(quotes, "quotes")}
          {activeTab === "contacts" && renderTable(contacts, "contacts")}

          {activeTab === "reviews" && (
            <div className="p-6 grid md:grid-cols-2 gap-6">
              {/* Add Review Form */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="font-bold text-[#0D1B2A] mb-4">Add New Review</h3>
                <form onSubmit={handleAddReview} className="space-y-3">
                  <input required type="text" placeholder="Author Name" value={newReview.author}
                    onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF6A00]" />
                  <input type="text" placeholder="Role (e.g. Director of Logistics)" value={newReview.role}
                    onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF6A00]" />
                  <input type="text" placeholder="Company Name" value={newReview.company}
                    onChange={(e) => setNewReview({ ...newReview, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF6A00]" />
                  <textarea required placeholder="Review content..." value={newReview.content}
                    onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF6A00] resize-none" />
                  <select value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF6A00]">
                    <option value={5}>★★★★★ 5 Stars</option>
                    <option value={4}>★★★★☆ 4 Stars</option>
                    <option value={3}>★★★☆☆ 3 Stars</option>
                  </select>
                  <button type="submit" disabled={addingReview}
                    className="w-full bg-[#FF6A00] text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                    <Plus size={16} /> {addingReview ? "Adding..." : "Add Review"}
                  </button>
                </form>
              </div>

              {/* Reviews List */}
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {reviews.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No reviews yet. Add your first review.</p>
                ) : reviews.map((r) => (
                  <div key={r.id} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-[#0D1B2A] text-sm">{r.author}</p>
                        <p className="text-gray-400 text-xs">{r.role} · {r.company}</p>
                        <div className="flex mt-1">
                          {[...Array(r.rating)].map((_, i) => <Star key={i} size={12} className="text-[#FF6A00] fill-[#FF6A00]" />)}
                        </div>
                      </div>
                      <button onClick={() => handleDeleteReview(r.id)} className="text-red-400 hover:text-red-600 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-gray-600 text-xs mt-2 leading-relaxed">{r.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
