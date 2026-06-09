"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Settings, Users, BarChart3, Home } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/dashboard/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/dashboard/login");
    router.refresh();
  };

  const navItems = [
    { name: "Leads", path: "/dashboard", icon: Users },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex flex-col bg-white p-3 rounded-xl items-center hover:shadow-md transition-shadow">
            <img src="/logo.jpeg" alt="Logo" className="h-10 w-auto object-contain mb-1" />
            <span className="text-[10px] font-bold text-navy uppercase tracking-wider">Admin Dashboard</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-4 mb-3">Navigation</p>
          {navItems.map((item) => (
            <Link 
              key={item.name}
              href={item.path} 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                pathname === item.path 
                  ? "bg-orange text-white shadow-lg shadow-orange/20" 
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}

          <div className="my-4 h-px bg-white/10"></div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-4 mb-3">Quick Links</p>
          <Link 
            href="/" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-200"
          >
            <Home size={20} />
            <span className="font-medium">View Website</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all duration-200"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-8 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <h1 className="text-lg font-bold text-navy">
              {pathname === "/dashboard" ? "Lead Management" : pathname === "/dashboard/settings" ? "Settings" : "Dashboard"}
            </h1>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm text-gray-500">Admin</span>
            <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center text-white text-xs font-bold">
              A
            </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
