import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  type: "client" | "admin";
}

const clientNav: NavItem[] = [
  { label: "Dashboard", href: "/client/dashboard", icon: "ri-dashboard-line" },
  { label: "Requests", href: "/client/requests", icon: "ri-file-list-3-line" },
  { label: "Submit Request", href: "/client/submit-request", icon: "ri-add-circle-line" },
  { label: "Files", href: "/client/files", icon: "ri-folder-line" },
  { label: "Brands", href: "/client/brands", icon: "ri-palette-line" },
  { label: "Team", href: "/client/team", icon: "ri-group-line" },
  { label: "Activity", href: "/client/activity", icon: "ri-time-line" },
  { label: "Settings", href: "/client/settings", icon: "ri-settings-3-line" },
];

const adminNav: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "ri-dashboard-line" },
  { label: "Requests", href: "/admin/requests", icon: "ri-file-list-3-line" },
  { label: "Clients", href: "/admin/clients", icon: "ri-user-line" },
  { label: "Designers", href: "/admin/designers", icon: "ri-brush-line" },
  { label: "Files", href: "/admin/files", icon: "ri-folder-line" },
  { label: "Workload", href: "/admin/workload", icon: "ri-bar-chart-line" },
  { label: "Reports", href: "/admin/reports", icon: "ri-line-chart-line" },
  { label: "Settings", href: "/admin/settings", icon: "ri-settings-3-line" },
];

const clientBottomNav: NavItem[] = [
  { label: "Help Center", href: "#", icon: "ri-question-line" },
  { label: "Live Chat", href: "#", icon: "ri-chat-3-line" },
];

export function DashboardLayout({ children, type }: DashboardLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navItems = type === "client" ? clientNav : adminNav;

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[260px] bg-[#0a0a0a] flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <Link to="/">
              <img src="/nolimit-logo.png" alt="NoLimit" className="h-8 w-auto brightness-0 invert" />
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white/60 hover:text-white cursor-pointer"
            >
              <i className="ri-close-line text-xl" />
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs font-medium text-[#ff4f01] bg-[#ff4f01]/10 px-2 py-0.5 rounded-full">
              {type === "client" ? "Client" : "Admin"}
            </span>
            <span className="text-xs text-white/40">Nolimit360</span>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#ff4f01] text-white"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <i className={`${item.icon} text-lg`} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Nav */}
        <div className="p-3 border-t border-white/10">
          {type === "client" &&
            clientBottomNav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                <i className={`${item.icon} text-lg`} />
                {item.label}
              </a>
            ))}
          <Link
            to="/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400/80 hover:text-red-400 hover:bg-red-400/5 transition-all"
          >
            <i className="ri-logout-box-line text-lg" />
            Logout
          </Link>
        </div>

        {/* User */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#ff4f01] flex items-center justify-center text-white text-sm font-bold">
              J
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white font-medium truncate">John Smith</p>
              <p className="text-xs text-white/40 truncate">john@company.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-[#e5e5e5] flex items-center px-6 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden mr-4 text-[#101010] cursor-pointer"
          >
            <i className="ri-menu-line text-xl" />
          </button>
          <div className="flex-1 flex items-center gap-4">
            <div className="relative max-w-md flex-1">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(119,119,125)]" />
              <input
                type="text"
                placeholder="Search requests..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] placeholder:text-[rgb(119,119,125)]/50 focus:outline-none focus:border-[#ff4f01] transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-lg bg-[#f5f5f5] flex items-center justify-center hover:bg-[#e5e5e5] transition-colors cursor-pointer">
              <i className="ri-notification-3-line text-[#101010]" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#ff4f01] rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                3
              </span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}