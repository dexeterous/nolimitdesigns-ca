import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { client } from "@/lib/api";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  type: "client" | "admin";
}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
  request_id?: number;
}

const clientNav: NavItem[] = [
  { label: "Dashboard", href: "/client/dashboard", icon: "ri-dashboard-line" },
  { label: "Requests", href: "/client/requests", icon: "ri-file-list-3-line" },
  { label: "Submit Request", href: "/client/submit-request", icon: "ri-add-circle-line" },
  { label: "Brands", href: "/client/brands", icon: "ri-palette-line" },
  { label: "Files", href: "/client/files", icon: "ri-folder-3-line" },
  { label: "Team", href: "/client/team", icon: "ri-team-line" },
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
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const { user, loading, isAuthenticated, isAdmin, login, logout } = useAuth();

  const navItems = useMemo(() => {
    if (type === "admin") return adminNav;
    // For client type, show admin nav items only if user is admin
    if (isAdmin) {
      return [...clientNav, { label: "Admin Panel", href: "/admin/dashboard", icon: "ri-shield-star-line" }];
    }
    return clientNav;
  }, [type, isAdmin]);

  useEffect(() => {
    if (isAuthenticated) {
      loadNotifications();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await client.entities.notifications.query({
        sort: "-created_at",
        limit: 20,
      });
      setNotifications(response?.data?.items || []);
    } catch {
      // silently fail
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await client.entities.notifications.update({
        id: String(id),
        data: { is_read: true },
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch {
      // silently fail
    }
  };

  const markAllRead = async () => {
    const unread = notifications.filter((n) => !n.is_read);
    for (const n of unread) {
      try {
        await client.entities.notifications.update({
          id: String(n.id),
          data: { is_read: true },
        });
      } catch {
        // continue
      }
    }
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const formatNotifTime = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs}h ago`;
    const diffDays = Math.floor(diffHrs / 24);
    return `${diffDays}d ago`;
  };

  const notifIcon = (type: string) => {
    switch (type) {
      case "status_change": return "ri-refresh-line text-[#7c3aed]";
      case "comment": return "ri-chat-3-line text-[#0ea5e9]";
      case "file": return "ri-file-download-line text-[#22c55e]";
      case "assignment": return "ri-user-star-line text-[#ff4f01]";
      default: return "ri-notification-3-line text-[#666]";
    }
  };

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
              const isActive = location.pathname === item.href || 
                (item.href !== "/client/dashboard" && item.href !== "/admin/dashboard" && location.pathname.startsWith(item.href));
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

        {/* Your Team Section */}
        {type === "client" && (
          <div className="px-3 py-3 border-t border-white/10">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/30 px-3 mb-2">Your Team</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/5">
                <div className="w-7 h-7 rounded-full bg-[#7c3aed]/30 flex items-center justify-center">
                  <i className="ri-brush-line text-[#a78bfa] text-xs" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-white/40">Designer</p>
                  <p className="text-xs text-white/80 font-medium truncate">Dedicated Designer</p>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/5">
                <div className="w-7 h-7 rounded-full bg-[#ff4f01]/30 flex items-center justify-center">
                  <i className="ri-user-star-line text-[#ff8a50] text-xs" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-white/40">Project Manager</p>
                  <p className="text-xs text-white/80 font-medium truncate">Dedicated PM</p>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
              </div>
            </div>
          </div>
        )}

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
            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative w-9 h-9 rounded-lg bg-[#f5f5f5] flex items-center justify-center hover:bg-[#e5e5e5] transition-colors cursor-pointer"
              >
                <i className="ri-notification-3-line text-[#101010]" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ff4f01] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-xl border border-[#e5e5e5] shadow-xl z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[#e5e5e5]">
                    <h3 className="text-sm font-semibold text-[#101010]">Notifications</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-xs text-[#ff4f01] hover:underline cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center">
                        <i className="ri-notification-off-line text-2xl text-[rgb(119,119,125)] mb-2 inline-block" />
                        <p className="text-sm text-[rgb(119,119,125)]">No notifications yet</p>
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markAsRead(n.id);
                            if (n.request_id) {
                              navigate(`/client/requests/${n.request_id}`);
                              setShowNotifications(false);
                            }
                          }}
                          className={`flex items-start gap-3 px-4 py-3 border-b border-[#f0f0f0] last:border-b-0 hover:bg-[#fafafa] cursor-pointer transition-colors ${
                            !n.is_read ? "bg-[#ff4f01]/5" : ""
                          }`}
                        >
                          <div className="w-8 h-8 rounded-full bg-[#f5f5f5] flex items-center justify-center shrink-0 mt-0.5">
                            <i className={`${notifIcon(n.type)} text-sm`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${!n.is_read ? "font-semibold text-[#101010]" : "text-[#101010]"}`}>
                              {n.title}
                            </p>
                            <p className="text-xs text-[rgb(119,119,125)] mt-0.5 line-clamp-2">{n.message}</p>
                            <p className="text-[10px] text-[rgb(119,119,125)] mt-1">{formatNotifTime(n.created_at)}</p>
                          </div>
                          {!n.is_read && (
                            <div className="w-2 h-2 rounded-full bg-[#ff4f01] shrink-0 mt-2" />
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}