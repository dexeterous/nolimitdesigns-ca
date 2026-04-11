import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { client } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

interface AdminStats {
  total_active: number;
  queued: number;
  completed_today: number;
  total_all: number;
  designer_workload: { name: string; active: number }[];
}

interface DesignRequest {
  id: number;
  user_id: string;
  title: string;
  category: string;
  brand_name: string;
  priority: string;
  status: string;
  designer_name: string;
  updated_at: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  Queue: "bg-[#f5f5f5] text-[#666]",
  "In Progress": "bg-[#7c3aed]/10 text-[#7c3aed]",
  "Internal Review": "bg-[#f59e0b]/10 text-[#f59e0b]",
  "Client Review": "bg-[#0ea5e9]/10 text-[#0ea5e9]",
  Review: "bg-[#0ea5e9]/10 text-[#0ea5e9]",
  Completed: "bg-[#22c55e]/10 text-[#22c55e]",
};

const statusChartColors: Record<string, string> = {
  Queue: "#9ca3af",
  "In Progress": "#7c3aed",
  Review: "#0ea5e9",
  "Client Review": "#0ea5e9",
  "Internal Review": "#f59e0b",
  Completed: "#22c55e",
};

const priorityChartColors: Record<string, string> = {
  Low: "#22c55e",
  Medium: "#f59e0b",
  High: "#ff4f01",
  Urgent: "#ef4444",
};

export default function AdminDashboard() {
  const { isAdmin, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentRequests, setRecentRequests] = useState<DesignRequest[]>([]);
  const [allRequests, setAllRequests] = useState<DesignRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) loadData();
  }, [isAdmin]);

  if (!authLoading && !isAdmin) {
    return <Navigate to="/client/dashboard" replace />;
  }

  const loadData = async () => {
    try {
      const [statsRes, requestsRes, allReqRes] = await Promise.all([
        client.apiCall.invoke({ url: "/api/v1/admin/stats", method: "GET" }),
        client.apiCall.invoke({ url: "/api/v1/admin/requests", method: "GET", data: { limit: 5, sort: "-created_at" } }),
        client.apiCall.invoke({ url: "/api/v1/admin/requests", method: "GET", data: { limit: 100, sort: "-created_at" } }),
      ]);
      setStats(statsRes?.data || null);
      setRecentRequests(requestsRes?.data?.items || []);
      setAllRequests(allReqRes?.data?.items || []);
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateStr: string) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHrs < 1) return "Just now";
    if (diffHrs < 24) return `${diffHrs}h ago`;
    const diffDays = Math.floor(diffHrs / 24);
    return `${diffDays}d ago`;
  };

  const statusDistribution = allRequests.reduce<Record<string, number>>((acc, req) => {
    acc[req.status] = (acc[req.status] || 0) + 1;
    return acc;
  }, {});
  const totalForChart = allRequests.length || 1;

  const categoryDistribution = allRequests.reduce<Record<string, number>>((acc, req) => {
    acc[req.category] = (acc[req.category] || 0) + 1;
    return acc;
  }, {});
  const topCategories = Object.entries(categoryDistribution)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);
  const maxCategoryCount = Math.max(...topCategories.map(([, c]) => c), 1);

  const priorityDistribution = allRequests.reduce<Record<string, number>>((acc, req) => {
    acc[req.priority] = (acc[req.priority] || 0) + 1;
    return acc;
  }, {});

  const statCards = [
    { label: "Total Active Requests", value: String(stats?.total_active || 0), icon: "ri-file-list-3-line", color: "bg-[#ff4f01]" },
    { label: "Requests in Queue", value: String(stats?.queued || 0), icon: "ri-time-line", color: "bg-[#f59e0b]" },
    { label: "Total Requests", value: String(stats?.total_all || 0), icon: "ri-team-line", color: "bg-[#22c55e]" },
    { label: "Completed Today", value: String(stats?.completed_today || 0), icon: "ri-check-double-line", color: "bg-[#0ea5e9]" },
  ];

  const designerWorkload = stats?.designer_workload || [];
  const maxActive = Math.max(...designerWorkload.map((d) => d.active), 1);

  return (
    <DashboardLayout type="admin">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-bricolage text-[#101010]">Admin Dashboard</h1>
        <p className="text-sm text-[rgb(119,119,125)]">Overview of all design operations.</p>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#ff4f01] mx-auto mb-4"></div>
          <p className="text-sm text-[rgb(119,119,125)]">Loading dashboard...</p>
        </div>
      ) : (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-[#e5e5e5] hover:border-[#ff4f01]/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <i className={`${stat.icon} text-white text-lg`} />
                  </div>
                </div>
                <p className="text-3xl font-bold font-bricolage text-[#101010]">{stat.value}</p>
                <p className="text-sm text-[rgb(119,119,125)] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Analytics Row */}
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Status Distribution */}
            <div className="bg-white rounded-xl border border-[#e5e5e5] p-5">
              <h2 className="text-lg font-semibold font-bricolage text-[#101010] mb-4">Status Distribution</h2>
              <div className="space-y-3">
                {Object.entries(statusDistribution).map(([status, count]) => (
                  <div key={status}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-[#101010]">{status}</span>
                      <span className="text-sm font-medium text-[#101010]">{count}</span>
                    </div>
                    <div className="w-full bg-[#f5f5f5] rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full transition-all duration-500"
                        style={{
                          width: `${(count / totalForChart) * 100}%`,
                          backgroundColor: statusChartColors[status] || "#9ca3af",
                        }}
                      />
                    </div>
                  </div>
                ))}
                {Object.keys(statusDistribution).length === 0 && (
                  <p className="text-sm text-[rgb(119,119,125)] text-center py-4">No data yet</p>
                )}
              </div>
            </div>

            {/* Top Categories */}
            <div className="bg-white rounded-xl border border-[#e5e5e5] p-5">
              <h2 className="text-lg font-semibold font-bricolage text-[#101010] mb-4">Top Categories</h2>
              <div className="space-y-3">
                {topCategories.map(([cat, count], i) => (
                  <div key={cat} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#ff4f01] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-[#101010] truncate">{cat}</span>
                        <span className="text-xs text-[rgb(119,119,125)] ml-2">{count}</span>
                      </div>
                      <div className="w-full bg-[#f5f5f5] rounded-full h-1.5">
                        <div
                          className="bg-gradient-to-r from-[#ff4f01] to-[#ff8c42] h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${(count / maxCategoryCount) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {topCategories.length === 0 && (
                  <p className="text-sm text-[rgb(119,119,125)] text-center py-4">No data yet</p>
                )}
              </div>
            </div>

            {/* Priority Breakdown */}
            <div className="bg-white rounded-xl border border-[#e5e5e5] p-5">
              <h2 className="text-lg font-semibold font-bricolage text-[#101010] mb-4">Priority Breakdown</h2>
              <div className="grid grid-cols-2 gap-3">
                {["Low", "Medium", "High", "Urgent"].map((priority) => {
                  const count = priorityDistribution[priority] || 0;
                  const pct = totalForChart > 0 ? Math.round((count / totalForChart) * 100) : 0;
                  return (
                    <div
                      key={priority}
                      className="rounded-xl p-4 text-center"
                      style={{ backgroundColor: `${priorityChartColors[priority]}10` }}
                    >
                      <p
                        className="text-2xl font-bold font-bricolage"
                        style={{ color: priorityChartColors[priority] }}
                      >
                        {count}
                      </p>
                      <p className="text-xs text-[rgb(119,119,125)] mt-1">{priority}</p>
                      <p className="text-[10px] text-[rgb(119,119,125)]">{pct}%</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Designer Workload */}
            <div className="bg-white rounded-xl border border-[#e5e5e5] p-5">
              <h2 className="text-lg font-semibold font-bricolage text-[#101010] mb-4">Designer Workload</h2>
              {designerWorkload.length === 0 ? (
                <p className="text-sm text-[rgb(119,119,125)] text-center py-8">No active assignments yet.</p>
              ) : (
                <div className="space-y-4">
                  {designerWorkload.map((d, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#ff4f01]/20 flex items-center justify-center text-sm font-bold text-[#ff4f01] shrink-0">
                        {d.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-[#101010]">{d.name}</span>
                          <span className="text-xs text-[rgb(119,119,125)]">{d.active} active</span>
                        </div>
                        <div className="w-full bg-[#f5f5f5] rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#ff4f01] to-[#ff8c42] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(d.active / maxActive) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-[#e5e5e5] p-5">
              <h2 className="text-lg font-semibold font-bricolage text-[#101010] mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/admin/requests"
                  className="flex items-center gap-3 p-4 rounded-xl border border-[#e5e5e5] hover:border-[#ff4f01]/30 hover:bg-[#fafafa] transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#ff4f01]/10 flex items-center justify-center">
                    <i className="ri-file-list-3-line text-[#ff4f01] text-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#101010]">Manage All Requests</p>
                    <p className="text-xs text-[rgb(119,119,125)]">View, assign, and update request statuses</p>
                  </div>
                </Link>
                <Link
                  to="/client/submit-request"
                  className="flex items-center gap-3 p-4 rounded-xl border border-[#e5e5e5] hover:border-[#ff4f01]/30 hover:bg-[#fafafa] transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#22c55e]/10 flex items-center justify-center">
                    <i className="ri-add-circle-line text-[#22c55e] text-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#101010]">Create New Request</p>
                    <p className="text-xs text-[rgb(119,119,125)]">Submit a design request on behalf of a client</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="bg-white rounded-xl border border-[#e5e5e5]">
            <div className="flex items-center justify-between p-5 border-b border-[#e5e5e5]">
              <h2 className="text-lg font-semibold font-bricolage text-[#101010]">Recent Requests</h2>
              <Link to="/admin/requests" className="text-sm text-[#ff4f01] font-medium hover:underline">
                View All
              </Link>
            </div>
            {recentRequests.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-sm text-[rgb(119,119,125)]">No requests yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                      <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Request</th>
                      <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Category</th>
                      <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Designer</th>
                      <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Status</th>
                      <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRequests.map((item) => (
                      <tr key={item.id} className="border-b border-[#f0f0f0] last:border-b-0 hover:bg-[#fafafa] transition-colors">
                        <td className="px-5 py-3.5">
                          <p className="text-sm font-medium text-[#101010]">{item.title}</p>
                          <p className="text-xs text-[rgb(119,119,125)]">REQ-{String(item.id).padStart(3, "0")}</p>
                        </td>
                        <td className="px-5 py-3.5 text-sm text-[rgb(119,119,125)]">{item.category}</td>
                        <td className="px-5 py-3.5 text-sm text-[rgb(119,119,125)]">{item.designer_name || "Unassigned"}</td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[item.status] || "bg-[#f5f5f5] text-[#666]"}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-xs text-[rgb(119,119,125)]">{formatTime(item.updated_at || item.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </DashboardLayout>
  );
}