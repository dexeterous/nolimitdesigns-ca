import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

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
];

const adminNav: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "ri-dashboard-line" },
  { label: "All Requests", href: "/admin/requests", icon: "ri-file-list-3-line" },
];

const clientBottomNav: NavItem[] = [
  { label: "Help Center", href: "#", icon: "ri-question-line" },
  { label: "Live Chat", href: "#", icon: "ri-chat-3-line" },
];

export function DashboardLayout({ children, type }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navItems = type === "client" ? clientNav : adminNav;
  const { user, loading, isAuthenticated, login, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff4f01] mx-auto mb-4"></div>
          <p className="text-[rgb(119,119,125)]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="text-center bg-white rounded-2xl p-10 border border-[#e5e5e5] max-w-md">
          <i className="ri-lock-line text-5xl text-[#ff4f01] mb-4 inline-block" />
          <h2 className="font-bricolage font-semibold text-2xl text-[#101010] mb-2">Sign In Required</h2>
          <p className="text-[rgb(119,119,125)] mb-6">Please sign in to access your dashboard.</p>
          <button
            onClick={() => login()}
            className="btn btn-primary !mb-0 !py-3 !px-8"
          >
            <i className="ri-login-box-line mr-2" /> Sign In
          </button>
          <p className="mt-4">
            <a href="/" className="text-sm text-[#ff4f01] hover:underline">← Back to Home</a>
          </p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : user?.email ? user.email.charAt(0).toUpperCase() : "U";

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

          {/* Switch view link */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <Link
              to={type === "client" ? "/admin/dashboard" : "/client/dashboard"}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              <i className={`${type === "client" ? "ri-shield-line" : "ri-user-line"} text-lg`} />
              {type === "client" ? "Admin View" : "Client View"}
            </Link>
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
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400/80 hover:text-red-400 hover:bg-red-400/5 transition-all cursor-pointer"
          >
            <i className="ri-logout-box-line text-lg" />
            Logout
          </button>
        </div>

        {/* User */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#ff4f01] flex items-center justify-center text-white text-sm font-bold">
              {userInitial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white font-medium truncate">{user?.name || "User"}</p>
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
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}