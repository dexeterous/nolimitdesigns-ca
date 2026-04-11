import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";

interface AdminRequest {
  id: string;
  title: string;
  client: string;
  brand: string;
  category: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  designer: string;
  status: "Queue" | "In Progress" | "Internal Review" | "Client Review" | "Completed";
  created: string;
}

const requests: AdminRequest[] = [
  { id: "REQ-001", title: "Social Media Campaign Graphics", client: "TechCo", brand: "TechCo", category: "Social Media", priority: "High", designer: "Sarah M.", status: "In Progress", created: "Apr 10, 2025" },
  { id: "REQ-002", title: "Email Newsletter Header", client: "FoodBrand Inc.", brand: "FoodBrand", category: "Email", priority: "Medium", designer: "Alex K.", status: "Client Review", created: "Apr 9, 2025" },
  { id: "REQ-003", title: "Landing Page Redesign", client: "TechCo", brand: "TechCo", category: "Web Design", priority: "High", designer: "Unassigned", status: "Queue", created: "Apr 10, 2025" },
  { id: "REQ-004", title: "Product Packaging Label", client: "EcoGoods Ltd.", brand: "EcoGoods", category: "Packaging", priority: "Low", designer: "Maria L.", status: "Completed", created: "Apr 8, 2025" },
  { id: "REQ-005", title: "Brand Guidelines Update", client: "TechCo", brand: "TechCo", category: "Branding", priority: "Medium", designer: "Sarah M.", status: "In Progress", created: "Apr 9, 2025" },
  { id: "REQ-006", title: "Instagram Story Templates", client: "FoodBrand Inc.", brand: "FoodBrand", category: "Social Media", priority: "Low", designer: "Unassigned", status: "Queue", created: "Apr 10, 2025" },
  { id: "REQ-007", title: "Pitch Deck Design", client: "TechCo", brand: "TechCo", category: "Presentation", priority: "Urgent", designer: "Alex K.", status: "In Progress", created: "Apr 10, 2025" },
  { id: "REQ-008", title: "Business Card Redesign", client: "EcoGoods Ltd.", brand: "EcoGoods", category: "Print", priority: "Low", designer: "Maria L.", status: "Completed", created: "Apr 7, 2025" },
  { id: "REQ-009", title: "Logo Design", client: "StartupX", brand: "StartupX", category: "Branding", priority: "High", designer: "Sarah M.", status: "Internal Review", created: "Apr 10, 2025" },
  { id: "REQ-010", title: "Product Demo Video", client: "TechCo", brand: "TechCo", category: "Video", priority: "Medium", designer: "James R.", status: "In Progress", created: "Apr 9, 2025" },
];

const designers = ["All Designers", "Sarah M.", "Alex K.", "Maria L.", "James R.", "Unassigned"];
const statuses = ["All Statuses", "Queue", "In Progress", "Internal Review", "Client Review", "Completed"];

const statusColors: Record<string, string> = {
  Queue: "bg-[#f5f5f5] text-[#666]",
  "In Progress": "bg-[#7c3aed]/10 text-[#7c3aed]",
  "Internal Review": "bg-[#f59e0b]/10 text-[#f59e0b]",
  "Client Review": "bg-[#0ea5e9]/10 text-[#0ea5e9]",
  Completed: "bg-[#22c55e]/10 text-[#22c55e]",
};

const priorityColors: Record<string, string> = {
  Low: "text-[#22c55e]",
  Medium: "text-[#f59e0b]",
  High: "text-[#ff4f01]",
  Urgent: "text-[#ef4444]",
};

export default function AdminRequests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [designerFilter, setDesignerFilter] = useState("All Designers");

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All Statuses" || req.status === statusFilter;
    const matchesDesigner = designerFilter === "All Designers" || req.designer === designerFilter;
    return matchesSearch && matchesStatus && matchesDesigner;
  });

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
              placeholder="Search by title or client..."
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
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            value={designerFilter}
            onChange={(e) => setDesignerFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] focus:outline-none focus:border-[#ff4f01] cursor-pointer"
          >
            {designers.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#e5e5e5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Request</th>
                <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Client</th>
                <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Category</th>
                <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Priority</th>
                <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Designer</th>
                <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Created</th>
                <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr key={req.id} className="border-b border-[#f0f0f0] last:border-b-0 hover:bg-[#fafafa] transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-medium text-[#101010]">{req.title}</p>
                    <p className="text-xs text-[rgb(119,119,125)]">{req.id}</p>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-[#101010]">{req.client}</td>
                  <td className="px-5 py-3.5 text-sm text-[rgb(119,119,125)]">{req.category}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-sm font-medium ${priorityColors[req.priority]}`}>
                      {req.priority}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <select
                      defaultValue={req.designer}
                      className="text-sm border border-[#e5e5e5] rounded-lg px-2 py-1 bg-white focus:outline-none focus:border-[#ff4f01] cursor-pointer"
                    >
                      {designers.filter((d) => d !== "All Designers").map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3.5">
                    <select
                      defaultValue={req.status}
                      className={`text-xs font-medium rounded-full px-2.5 py-1 border-0 focus:outline-none cursor-pointer ${statusColors[req.status]}`}
                    >
                      {statuses.filter((s) => s !== "All Statuses").map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-[rgb(119,119,125)]">{req.created}</td>
                  <td className="px-5 py-3.5">
                    <button className="w-8 h-8 rounded-lg hover:bg-[#f5f5f5] flex items-center justify-center transition-colors cursor-pointer">
                      <i className="ri-more-2-fill text-[rgb(119,119,125)]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}