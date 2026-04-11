import { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";

type ViewMode = "list" | "kanban";

interface Request {
  id: string;
  title: string;
  brand: string;
  category: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "Queue" | "In Progress" | "Review" | "Completed";
  designer: string;
  designerAvatar: string;
  updated: string;
  dueDate: string;
}

const requests: Request[] = [
  { id: "REQ-001", title: "Social Media Campaign Graphics", brand: "TechCo", category: "Social Media", priority: "High", status: "In Progress", designer: "Sarah M.", designerAvatar: "S", updated: "2 hours ago", dueDate: "Apr 12" },
  { id: "REQ-002", title: "Email Newsletter Header", brand: "FoodBrand", category: "Email", priority: "Medium", status: "Review", designer: "Alex K.", designerAvatar: "A", updated: "4 hours ago", dueDate: "Apr 13" },
  { id: "REQ-003", title: "Landing Page Redesign", brand: "TechCo", category: "Web Design", priority: "High", status: "Queue", designer: "Unassigned", designerAvatar: "?", updated: "1 day ago", dueDate: "Apr 15" },
  { id: "REQ-004", title: "Product Packaging Label", brand: "EcoGoods", category: "Packaging", priority: "Low", status: "Completed", designer: "Maria L.", designerAvatar: "M", updated: "1 day ago", dueDate: "Apr 10" },
  { id: "REQ-005", title: "Brand Guidelines Update", brand: "TechCo", category: "Branding", priority: "Medium", status: "In Progress", designer: "Sarah M.", designerAvatar: "S", updated: "2 days ago", dueDate: "Apr 14" },
  { id: "REQ-006", title: "Instagram Story Templates", brand: "FoodBrand", category: "Social Media", priority: "Low", status: "Queue", designer: "Unassigned", designerAvatar: "?", updated: "3 days ago", dueDate: "Apr 16" },
  { id: "REQ-007", title: "Pitch Deck Design", brand: "TechCo", category: "Presentation", priority: "Urgent", status: "In Progress", designer: "Alex K.", designerAvatar: "A", updated: "5 hours ago", dueDate: "Apr 11" },
  { id: "REQ-008", title: "Business Card Redesign", brand: "EcoGoods", category: "Print", priority: "Low", status: "Completed", designer: "Maria L.", designerAvatar: "M", updated: "3 days ago", dueDate: "Apr 9" },
];

const statusColors: Record<string, string> = {
  Queue: "bg-[#f5f5f5] text-[#666]",
  "In Progress": "bg-[#7c3aed]/10 text-[#7c3aed]",
  Review: "bg-[#0ea5e9]/10 text-[#0ea5e9]",
  Completed: "bg-[#22c55e]/10 text-[#22c55e]",
};

const priorityColors: Record<string, string> = {
  Low: "text-[#22c55e]",
  Medium: "text-[#f59e0b]",
  High: "text-[#ff4f01]",
  Urgent: "text-[#ef4444]",
};

const kanbanColumns: Request["status"][] = ["Queue", "In Progress", "Review", "Completed"];

export default function ClientRequests() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredRequests = requests.filter((req) => {
    const matchesSearch = req.title.toLowerCase().includes(searchQuery.toLowerCase()) || req.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout type="client">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold font-bricolage text-[#101010]">Requests</h1>
          <p className="text-sm text-[rgb(119,119,125)]">Manage and track all your design requests.</p>
        </div>
        <Link to="/client/submit-request" className="btn btn-primary !mb-0 !py-2.5 !px-5 text-sm">
          <i className="ri-add-line mr-1" /> New Request
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-[#e5e5e5] p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full sm:max-w-xs">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(119,119,125)]" />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] placeholder:text-[rgb(119,119,125)]/50 focus:outline-none focus:border-[#ff4f01] transition-colors"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] focus:outline-none focus:border-[#ff4f01] cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Queue">Queue</option>
            <option value="In Progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Completed">Completed</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center bg-[#f5f5f5] rounded-lg p-0.5 ml-auto">
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
                viewMode === "list" ? "bg-white text-[#101010] shadow-sm" : "text-[rgb(119,119,125)] hover:text-[#101010]"
              }`}
            >
              <i className="ri-list-unordered mr-1" /> List
            </button>
            <button
              onClick={() => setViewMode("kanban")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
                viewMode === "kanban" ? "bg-white text-[#101010] shadow-sm" : "text-[rgb(119,119,125)] hover:text-[#101010]"
              }`}
            >
              <i className="ri-layout-column-line mr-1" /> Kanban
            </button>
          </div>
        </div>
      </div>

      {/* List View */}
      {viewMode === "list" && (
        <div className="bg-white rounded-xl border border-[#e5e5e5] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Request</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Brand</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Category</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Priority</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Designer</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Updated</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="border-b border-[#f0f0f0] last:border-b-0 hover:bg-[#fafafa] transition-colors cursor-pointer">
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-medium text-[#101010]">{req.title}</p>
                      <p className="text-xs text-[rgb(119,119,125)]">{req.id}</p>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-[#101010]">{req.brand}</td>
                    <td className="px-5 py-3.5 text-sm text-[rgb(119,119,125)]">{req.category}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-sm font-medium ${priorityColors[req.priority]}`}>
                        <i className="ri-flag-line mr-1" />{req.priority}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[req.status]}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#ff4f01]/20 flex items-center justify-center text-[10px] font-bold text-[#ff4f01]">
                          {req.designerAvatar}
                        </div>
                        <span className="text-sm text-[rgb(119,119,125)]">{req.designer}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-[rgb(119,119,125)]">{req.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Kanban View */}
      {viewMode === "kanban" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kanbanColumns.map((column) => {
            const columnRequests = filteredRequests.filter((r) => r.status === column);
            return (
              <div key={column} className="bg-[#f9f9f9] rounded-xl p-3">
                <div className="flex items-center justify-between mb-3 px-1">
                  <h3 className="text-sm font-semibold text-[#101010]">{column}</h3>
                  <span className="text-xs bg-white rounded-full px-2 py-0.5 text-[rgb(119,119,125)] font-medium">
                    {columnRequests.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {columnRequests.map((req) => (
                    <div
                      key={req.id}
                      className="bg-white rounded-lg p-3.5 border border-[#e5e5e5] hover:border-[#ff4f01]/30 hover:shadow-sm transition-all cursor-pointer"
                    >
                      <p className="text-sm font-medium text-[#101010] mb-2">{req.title}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-[#f5f5f5] px-2 py-0.5 rounded text-[rgb(119,119,125)]">{req.brand}</span>
                        <span className={`text-xs font-medium ${priorityColors[req.priority]}`}>{req.priority}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-[#ff4f01]/20 flex items-center justify-center text-[9px] font-bold text-[#ff4f01]">
                            {req.designerAvatar}
                          </div>
                          <span className="text-xs text-[rgb(119,119,125)]">{req.designer}</span>
                        </div>
                        <span className="text-xs text-[rgb(119,119,125)]">{req.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}