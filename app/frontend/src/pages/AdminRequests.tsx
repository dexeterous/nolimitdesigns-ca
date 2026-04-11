import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { client } from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface AdminRequest {
  id: number;
  user_id: string;
  title: string;
  brand_name: string;
  category: string;
  priority: string;
  designer_name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const designers = ["Unassigned", "Sarah M.", "Alex K.", "Maria L.", "James R."];
const statuses = ["Queue", "In Progress", "Internal Review", "Client Review", "Completed"];

const statusColors: Record<string, string> = {
  Queue: "bg-[#f5f5f5] text-[#666]",
  "In Progress": "bg-[#7c3aed]/10 text-[#7c3aed]",
  "Internal Review": "bg-[#f59e0b]/10 text-[#f59e0b]",
  "Client Review": "bg-[#0ea5e9]/10 text-[#0ea5e9]",
  Review: "bg-[#0ea5e9]/10 text-[#0ea5e9]",
  Completed: "bg-[#22c55e]/10 text-[#22c55e]",
};

const priorityColors: Record<string, string> = {
  Low: "text-[#22c55e]",
  Medium: "text-[#f59e0b]",
  High: "text-[#ff4f01]",
  Urgent: "text-[#ef4444]",
};

export default function AdminRequests() {
  const { isAdmin, loading: authLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [designerFilter, setDesignerFilter] = useState("All Designers");
  const [requests, setRequests] = useState<AdminRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) loadRequests();
  }, [isAdmin]);

  if (!authLoading && !isAdmin) {
    return <Navigate to="/client/dashboard" replace />;
  }

  const loadRequests = async () => {
    try {
      const response = await client.apiCall.invoke({
        url: "/api/v1/admin/requests",
        method: "GET",
        data: { limit: 100, sort: "-created_at" },
      });
      setRequests(response?.data?.items || []);
    } catch (err) {
      console.error("Failed to load admin requests:", err);
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await client.apiCall.invoke({
        url: `/api/v1/admin/requests/${id}`,
        method: "PUT",
        data: { status: newStatus },
      });
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
      toast.success("Status updated");
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.error("Failed to update status");
    }
  };

  const handleDesignerChange = async (id: number, newDesigner: string) => {
    try {
      await client.apiCall.invoke({
        url: `/api/v1/admin/requests/${id}`,
        method: "PUT",
        data: { designer_name: newDesigner },
      });
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, designer_name: newDesigner } : r))
      );
      toast.success("Designer assigned");
    } catch (err) {
      console.error("Failed to assign designer:", err);
      toast.error("Failed to assign designer");
    }
  };

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (req.brand_name || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All Statuses" || req.status === statusFilter;
    const matchesDesigner = designerFilter === "All Designers" || (req.designer_name || "Unassigned") === designerFilter;
    return matchesSearch && matchesStatus && matchesDesigner;
  });

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <DashboardLayout type="admin">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-bricolage text-[#101010]">All Requests</h1>
        <p className="text-sm text-[rgb(119,119,125)]">Manage and assign all client design requests.</p>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-[#e5e5e5] p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative flex-1 w-full sm:max-w-xs">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(119,119,125)]" />
            <input
              type="text"
              placeholder="Search by title or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] placeholder:text-[rgb(119,119,125)]/50 focus:outline-none focus:border-[#ff4f01] transition-colors"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] focus:outline-none focus:border-[#ff4f01] cursor-pointer"
          >
            <option value="All Statuses">All Statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            value={designerFilter}
            onChange={(e) => setDesignerFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] focus:outline-none focus:border-[#ff4f01] cursor-pointer"
          >
            <option value="All Designers">All Designers</option>
            {designers.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-[#e5e5e5] p-10 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff4f01] mx-auto mb-3"></div>
          <p className="text-sm text-[rgb(119,119,125)]">Loading requests...</p>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#e5e5e5] p-10 text-center">
          <i className="ri-file-list-3-line text-4xl text-[rgb(119,119,125)] mb-3 inline-block" />
          <p className="text-sm text-[rgb(119,119,125)]">No requests found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#e5e5e5] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Request</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Brand</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Category</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Priority</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Designer</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="border-b border-[#f0f0f0] last:border-b-0 hover:bg-[#fafafa] transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-medium text-[#101010]">{req.title}</p>
                      <p className="text-xs text-[rgb(119,119,125)]">REQ-{String(req.id).padStart(3, "0")}</p>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-[#101010]">{req.brand_name || "—"}</td>
                    <td className="px-5 py-3.5 text-sm text-[rgb(119,119,125)]">{req.category}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-sm font-medium ${priorityColors[req.priority] || ""}`}>
                        {req.priority}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <select
                        value={req.designer_name || "Unassigned"}
                        onChange={(e) => handleDesignerChange(req.id, e.target.value)}
                        className="text-sm border border-[#e5e5e5] rounded-lg px-2 py-1 bg-white focus:outline-none focus:border-[#ff4f01] cursor-pointer"
                      >
                        {designers.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-3.5">
                      <select
                        value={req.status}
                        onChange={(e) => handleStatusChange(req.id, e.target.value)}
                        className={`text-xs font-medium rounded-full px-2.5 py-1 border-0 focus:outline-none cursor-pointer ${statusColors[req.status] || "bg-[#f5f5f5] text-[#666]"}`}
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-[rgb(119,119,125)]">{formatDate(req.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}