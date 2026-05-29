import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { client } from "@/lib/api";

interface DesignRequest {
  id: number;
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

export default function ClientDashboard() {
  const [requests, setRequests] = useState<DesignRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const response = await client.entities.design_requests.query({
        sort: "-created_at",
        limit: 10,
      });
      setRequests(response?.data?.items || []);
    } catch (err) {
      console.error("Failed to load requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const activeCount = requests.filter((r) => r.status !== "Completed").length;
  const inProgressCount = requests.filter((r) => r.status === "In Progress").length;
  const completedCount = requests.filter((r) => r.status === "Completed").length;
  const reviewCount = requests.filter((r) => r.status === "Review" || r.status === "Client Review").length;

  const stats = [
    { label: "Active Requests", value: String(activeCount), icon: "ri-file-list-3-line", color: "bg-[#ff4f01]" },
    { label: "In Progress", value: String(inProgressCount), icon: "ri-loader-4-line", color: "bg-[#7c3aed]" },
    { label: "Completed", value: String(completedCount), icon: "ri-check-double-line", color: "bg-[#22c55e]" },
    { label: "Pending Review", value: String(reviewCount), icon: "ri-chat-3-line", color: "bg-[#0ea5e9]" },
  ];

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

  return (
    <DashboardLayout type="client">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-bricolage text-[#101010]">Dashboard</h1>
        <p className="text-sm text-[rgb(119,119,125)]">Here's your design activity overview.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
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

      {/* Recent Requests */}
      <div className="bg-white rounded-xl border border-[#e5e5e5]">
        <div className="flex items-center justify-between p-5 border-b border-[#e5e5e5]">
          <h2 className="text-lg font-semibold font-bricolage text-[#101010]">Recent Requests</h2>
          <Link to="/client/requests" className="text-sm text-[#ff4f01] font-medium hover:underline">
            View All
          </Link>
        </div>
        {loading ? (
          <div className="p-10 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff4f01] mx-auto mb-3"></div>
            <p className="text-sm text-[rgb(119,119,125)]">Loading requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="p-10 text-center">
            <i className="ri-file-list-3-line text-4xl text-[rgb(119,119,125)] mb-3 inline-block" />
            <p className="text-sm text-[rgb(119,119,125)] mb-4">No project requests yet.</p>
            <Link to="/client/submit-request" className="btn btn-primary !mb-0 !py-2 !px-5 text-sm">
              <i className="ri-add-line mr-1" /> Submit Your First Request
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e5e5e5]">
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Request</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Brand</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Developer</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Updated</th>
                </tr>
              </thead>
              <tbody>
                {requests.slice(0, 5).map((req) => (
                  <tr key={req.id} className="border-b border-[#f0f0f0] last:border-b-0 hover:bg-[#fafafa] transition-colors">
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="text-sm font-medium text-[#101010]">{req.title}</p>
                        <p className="text-xs text-[rgb(119,119,125)]">REQ-{String(req.id).padStart(3, "0")}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-[#101010]">{req.brand_name || "—"}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[req.status] || "bg-[#f5f5f5] text-[#666]"}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-[rgb(119,119,125)]">{req.designer_name || "Unassigned"}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-[rgb(119,119,125)]">{formatTime(req.updated_at || req.created_at)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
