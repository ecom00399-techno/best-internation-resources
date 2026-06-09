"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Package, Mail, LogOut, Search, Filter, Download } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("leads");
  const [data, setData] = useState({ leads: [], quotes: [], contacts: [] });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      try {
        const [leadsRes, quotesRes, contactsRes] = await Promise.all([
          fetch("/api/leads"),
          fetch("/api/quotes"),
          fetch("/api/contact")
        ]);

        if (leadsRes.status === 401) {
          router.push("/admin/login");
          return;
        }

        const leads = await leadsRes.json();
        const quotes = await quotesRes.json();
        const contacts = await contactsRes.json();

        setData({
          leads: leads.leads || [],
          quotes: quotes.quotes || [],
          contacts: contacts.contacts || []
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        router.push("/admin/login");
      }
    };

    checkAuthAndFetch();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const updateStatus = async (type: string, id: string, newStatus: string) => {
    try {
      const endpoint = type === 'leads' ? `/api/leads/${id}` : 
                       type === 'quotes' ? `/api/quotes/${id}` : `/api/contact/${id}`;
      
      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        // Optimistic UI update
        setData(prev => ({
          ...prev,
          [type]: prev[type as keyof typeof data].map((item: any) => 
            item.id === id ? { ...item, status: newStatus } : item
          )
        }));
      }
    } catch (error) {
      console.error("Failed to update status");
    }
  };

  const exportCSV = (type: string) => {
    const dataset = data[type as keyof typeof data];
    if (!dataset.length) return;

    const headers = Object.keys(dataset[0]).filter(k => k !== 'id' && k !== 'updatedAt');
    const csvContent = [
      headers.join(","),
      ...dataset.map((row: any) => headers.map(h => `"${row[h] || ''}"`).join(","))
    ].join("\\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `BIR_${type}_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange border-t-transparent"></div>
      </div>
    );
  }

  const renderTable = (type: string) => {
    const dataset = data[type as keyof typeof data].filter((item: any) => 
      (item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
       item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.company?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (dataset.length === 0) {
      return <div className="p-8 text-center text-gray-500">No {type} found.</div>;
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500 uppercase tracking-wider">
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Contact Info</th>
              {type !== 'contacts' && <th className="p-4 font-medium">Industry / Service</th>}
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dataset.map((item: any) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <div className="font-medium text-navy">{item.name}</div>
                  {item.company && <div className="text-xs text-gray-500 mt-1">{item.company}</div>}
                </td>
                <td className="p-4">
                  <div className="text-sm text-gray-700">{item.email}</div>
                  {item.phone && <div className="text-xs text-gray-500 mt-1">{item.phone}</div>}
                </td>
                {type !== 'contacts' && (
                  <td className="p-4">
                    <div className="text-sm capitalize">{item.industry || '-'}</div>
                    <div className="text-xs text-gray-500 mt-1 capitalize">{item.service || '-'}</div>
                  </td>
                )}
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
                    item.status === 'new' ? 'bg-blue-100 text-blue-700' :
                    item.status === 'contacted' ? 'bg-orange/20 text-orange' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <select 
                    value={item.status}
                    onChange={(e) => updateStatus(type, item.id, e.target.value)}
                    className="text-sm border border-gray-200 rounded px-2 py-1 outline-none focus:border-orange bg-white"
                  >
                    <option value="new">Mark New</option>
                    <option value="contacted">Mark Contacted</option>
                    <option value="closed">Mark Closed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const getStats = () => {
    return {
      totalLeads: data.leads.length,
      totalQuotes: data.quotes.length,
      newRequests: data.leads.filter((l: any) => l.status === 'new').length + 
                   data.quotes.filter((q: any) => q.status === 'new').length +
                   data.contacts.filter((c: any) => c.status === 'new').length
    };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-navy text-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <span className="font-heading font-bold text-xl tracking-wide">BIR <span className="text-orange">Admin</span></span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-lg"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Leads</p>
              <h3 className="text-3xl font-heading font-bold text-navy">{stats.totalLeads}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><Users size={24} /></div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Quote Requests</p>
              <h3 className="text-3xl font-heading font-bold text-navy">{stats.totalQuotes}</h3>
            </div>
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center"><Package size={24} /></div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">New Action Required</p>
              <h3 className="text-3xl font-heading font-bold text-orange">{stats.newRequests}</h3>
            </div>
            <div className="w-12 h-12 bg-orange/10 text-orange rounded-lg flex items-center justify-center"><Mail size={24} /></div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Tabs & Controls */}
          <div className="border-b border-gray-200 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50">
            <div className="flex gap-2 bg-gray-200/50 p-1 rounded-lg">
              <button 
                onClick={() => setActiveTab('leads')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'leads' ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-navy'}`}
              >
                Leads
              </button>
              <button 
                onClick={() => setActiveTab('quotes')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'quotes' ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-navy'}`}
              >
                Quotes
              </button>
              <button 
                onClick={() => setActiveTab('contacts')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'contacts' ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-navy'}`}
              >
                General Contact
              </button>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search name, email..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-all"
                />
              </div>
              <button 
                onClick={() => exportCSV(activeTab)}
                className="flex items-center gap-2 bg-navy hover:bg-navy-light text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Download size={16} /> <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>

          {/* Table Data */}
          {renderTable(activeTab)}
        </div>
      </main>
    </div>
  );
}
