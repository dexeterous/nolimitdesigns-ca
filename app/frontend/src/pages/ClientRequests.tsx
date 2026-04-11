import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { client } from "@/lib/api";
import { toast } from "sonner";

type ViewMode = "list" | "kanban";

interface DesignRequest {
  id: number;
  title: string;
  brand_name: string;
  category: string;
  priority: string;
  status: string;
  designer_name: string;
  due_date: string;
  revision_count: number;
  updated_at: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  Requests: "bg-[#f5f5f5] text-[#666]",
  Queue: "bg-[#f5f5f5] text-[#666]",
  "In Progress": "bg-[#7c3aed]/10 text-[#7c3aed]",
  "In Review": "bg-[#0ea5e9]/10 text-[#0ea5e9]",
  Review: "bg-[#0ea5e9]/10 text-[#0ea5e9]",
  "Client Review": "bg-[#0ea5e9]/10 text-[#0ea5e9]",
  Completed: "bg-[#22c55e]/10 text-[#22c55e]",
};

const priorityColors: Record<string, string> = {
  Low: "text-[#22c55e]",
  Medium: "text-[#f59e0b]",
  High: "text-[#ff4f01]",
  Urgent: "text-[#ef4444]",
};

const kanbanColumns = [
  { key: "Requests", label: "Requests", icon: "ri-file-list-3-line", color: "#9ca3af", dbStatus: "Queue" },
  { key: "In Progress", label: "In Progress", icon: "ri-loader-4-line", color: "#7c3aed", dbStatus: "In Progress" },
  { key: "In Review", label: "In Review", icon: "ri-eye-line", color: "#0ea5e9", dbStatus: "Client Review" },
  { key: "Completed", label: "Completed", icon: "ri-check-double-line", color: "#22c55e", dbStatus: "Completed" },
];

const statusToColumn = (status: string): string => {
  switch (status) {
    case "Queue":
    case "Requests":
      return "Requests";
    case "In Progress":
      return "In Progress";
    case "Review":
    case "In Review":
    case "Client Review":
    case "Internal Review":
      return "In Review";
    case "Completed":
      return "Completed";
    default:
      return "Requests";
  }
};

export default function ClientRequests() {
  const [viewMode, setViewMode] = useState<ViewMode>("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [requests, setRequests] = useState<DesignRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // Drag-and-drop state
  const [draggedCard, setDraggedCard] = useState<DesignRequest | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef<Record<string, number>>({});

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const response = await client.entities.design_requests.query({
        sort: "-created_at",
        limit: 100,
      });
      setRequests(response?.data?.items || []);
    } catch (err) {
      console.error("Failed to load requests:", err);
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this request?")) return;
    try {
      await client.entities.design_requests.delete({ id: String(id) });
      setRequests((prev) => prev.filter((r) => r.id !== id));
      toast.success("Request deleted");
    } catch (err) {
      console.error("Failed to delete:", err);
      toast.error("Failed to delete request");
    }
  };

  // --- Drag-and-Drop Handlers ---
  const handleDragStart = useCallback((e: React.DragEvent, req: DesignRequest) => {
    setDraggedCard(req);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(req.id));
    // Add a slight delay for the drag image
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = "0.5";
  }, []);

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = "1";
    setDraggedCard(null);
    setDragOverColumn(null);
    setIsDragging(false);
    dragCounter.current = {};
  }, []);

  const handleColumnDragEnter = useCallback((e: React.DragEvent, columnKey: string) => {
    e.preventDefault();
    if (!dragCounter.current[columnKey]) dragCounter.current[columnKey] = 0;
    dragCounter.current[columnKey]++;
    setDragOverColumn(columnKey);
  }, []);

  const handleColumnDragLeave = useCallback((e: React.DragEvent, columnKey: string) => {
    e.preventDefault();
    if (!dragCounter.current[columnKey]) dragCounter.current[columnKey] = 0;
    dragCounter.current[columnKey]--;
    if (dragCounter.current[columnKey] <= 0) {
      dragCounter.current[columnKey] = 0;
      setDragOverColumn((prev) => (prev === columnKey ? null : prev));
    }
  }, []);

  const handleColumnDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent, columnKey: string) => {
      e.preventDefault();
      setDragOverColumn(null);
      setIsDragging(false);
      dragCounter.current = {};

      if (!draggedCard) return;

      const currentColumn = statusToColumn(draggedCard.status);
      if (currentColumn === columnKey) {
        setDraggedCard(null);
        return;
      }

      // Find the target DB status for this column
      const targetColumn = kanbanColumns.find((c) => c.key === columnKey);
      if (!targetColumn) return;

      const newDbStatus = targetColumn.dbStatus;
      const oldStatus = draggedCard.status;

      // Optimistic update
      setRequests((prev) =>
        prev.map((r) =>
          r.id === draggedCard.id ? { ...r, status: newDbStatus } : r
        )
      );

      try {
        // Update the request status
        await client.entities.design_requests.update({
          id: String(draggedCard.id),
          data: { status: newDbStatus },
        });

        // Create status history entry
        try {
          await client.entities.status_history.create({
            data: {
              request_id: draggedCard.id,
              from_status: oldStatus,
              to_status: newDbStatus,
              changed_by: "Client",
              note: `Moved from ${currentColumn} to ${columnKey} via Kanban board`,
            },
          });
        } catch {
          // Non-critical, continue
        }

        // Trigger email notification via backend
        try {
          await client.apiCall.invoke({
            url: "/api/v1/notifications/notify-status-change",
            method: "POST",
            data: {
              request_id: draggedCard.id,
              old_status: oldStatus,
              new_status: newDbStatus,
              changed_by: "Client",
            },
          });
        } catch {
          // Non-critical, continue
        }

        toast.success(`Moved to ${columnKey}`);
      } catch (err) {
        console.error("Failed to update status:", err);
        // Revert optimistic update
        setRequests((prev) =>
          prev.map((r) =>
            r.id === draggedCard.id ? { ...r, status: oldStatus } : r
          )
        );
        toast.error("Failed to update status");
      }

      setDraggedCard(null);
    },
    [draggedCard]
  );

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (req.brand_name || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || statusToColumn(req.status) === statusFilter || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] focus:outline-none focus:border-[#ff4f01] cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Requests">Requests</option>
            <option value="In Progress">In Progress</option>
            <option value="In Review">In Review</option>
            <option value="Completed">Completed</option>
          </select>
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

      {loading ? (
        <div className="bg-white rounded-xl border border-[#e5e5e5] p-10 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff4f01] mx-auto mb-3"></div>
          <p className="text-sm text-[rgb(119,119,125)]">Loading requests...</p>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#e5e5e5] p-10 text-center">
          <i className="ri-file-list-3-line text-4xl text-[rgb(119,119,125)] mb-3 inline-block" />
          <p className="text-sm text-[rgb(119,119,125)] mb-4">No requests found.</p>
          <Link to="/client/submit-request" className="btn btn-primary !mb-0 !py-2 !px-5 text-sm">
            <i className="ri-add-line mr-1" /> Create Request
          </Link>
        </div>
      ) : (
        <>
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
                      <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Revisions</th>
                      <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Updated</th>
                      <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map((req) => (
                      <tr key={req.id} className="border-b border-[#f0f0f0] last:border-b-0 hover:bg-[#fafafa] transition-colors">
                        <td className="px-5 py-3.5">
                          <Link to={`/client/requests/${req.id}`} className="hover:text-[#ff4f01] transition-colors">
                            <p className="text-sm font-medium text-[#101010] hover:text-[#ff4f01]">{req.title}</p>
                            <p className="text-xs text-[rgb(119,119,125)]">REQ-{String(req.id).padStart(3, "0")}</p>
                          </Link>
                        </td>
                        <td className="px-5 py-3.5 text-sm text-[#101010]">{req.brand_name || "—"}</td>
                        <td className="px-5 py-3.5 text-sm text-[rgb(119,119,125)]">{req.category}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-sm font-medium ${priorityColors[req.priority] || ""}`}>
                            <i className="ri-flag-line mr-1" />{req.priority}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[req.status] || statusColors[statusToColumn(req.status)] || "bg-[#f5f5f5] text-[#666]"}`}>
                            {statusToColumn(req.status)}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-sm text-[rgb(119,119,125)]">{req.designer_name || "Unassigned"}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="inline-flex items-center gap-1 text-xs text-[rgb(119,119,125)]">
                            <i className="ri-loop-left-line" />
                            {req.revision_count || 0}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-xs text-[rgb(119,119,125)]">{formatTime(req.updated_at || req.created_at)}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1">
                            <Link
                              to={`/client/requests/${req.id}`}
                              className="w-8 h-8 rounded-lg hover:bg-[#f5f5f5] flex items-center justify-center transition-colors cursor-pointer"
                              title="View Details"
                            >
                              <i className="ri-eye-line text-[rgb(119,119,125)]" />
                            </Link>
                            <button
                              onClick={() => handleDelete(req.id)}
                              className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer"
                              title="Delete"
                            >
                              <i className="ri-delete-bin-line text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Kanban View with Drag-and-Drop */}
          {viewMode === "kanban" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {kanbanColumns.map((column) => {
                const columnRequests = filteredRequests.filter(
                  (r) => statusToColumn(r.status) === column.key
                );
                const isOver = dragOverColumn === column.key;
                const isValidDrop = draggedCard && statusToColumn(draggedCard.status) !== column.key;

                return (
                  <div
                    key={column.key}
                    className={`rounded-xl p-3 transition-all duration-200 ${
                      isOver && isValidDrop
                        ? "bg-[#ff4f01]/5 ring-2 ring-[#ff4f01]/30 ring-dashed"
                        : isDragging
                        ? "bg-[#f5f5f5]"
                        : "bg-[#f9f9f9]"
                    }`}
                    onDragEnter={(e) => handleColumnDragEnter(e, column.key)}
                    onDragLeave={(e) => handleColumnDragLeave(e, column.key)}
                    onDragOver={handleColumnDragOver}
                    onDrop={(e) => handleDrop(e, column.key)}
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between mb-3 px-1">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-md flex items-center justify-center"
                          style={{ backgroundColor: `${column.color}15` }}
                        >
                          <i className={`${column.icon} text-xs`} style={{ color: column.color }} />
                        </div>
                        <h3 className="text-sm font-semibold text-[#101010]">{column.label}</h3>
                      </div>
                      <span
                        className="text-xs rounded-full px-2 py-0.5 font-medium"
                        style={{ backgroundColor: `${column.color}15`, color: column.color }}
                      >
                        {columnRequests.length}
                      </span>
                    </div>

                    {/* Drop zone indicator */}
                    {isOver && isValidDrop && (
                      <div className="mb-2 p-3 rounded-xl border-2 border-dashed border-[#ff4f01]/40 bg-[#ff4f01]/5 text-center">
                        <i className="ri-drag-drop-line text-[#ff4f01] text-lg" />
                        <p className="text-xs text-[#ff4f01] font-medium mt-1">Drop here</p>
                      </div>
                    )}

                    {/* Column Cards */}
                    <div className="space-y-2 min-h-[100px]">
                      {columnRequests.length === 0 && !isOver && (
                        <div className="text-center py-8 text-xs text-[rgb(119,119,125)]">
                          No requests
                        </div>
                      )}
                      {columnRequests.map((req) => (
                        <div
                          key={req.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, req)}
                          onDragEnd={handleDragEnd}
                          className={`bg-white rounded-xl p-4 border border-[#e5e5e5] hover:border-[#ff4f01]/30 hover:shadow-md transition-all group cursor-grab active:cursor-grabbing ${
                            draggedCard?.id === req.id ? "opacity-50 scale-95" : ""
                          }`}
                        >
                          <Link
                            to={`/client/requests/${req.id}`}
                            className="block"
                            onClick={(e) => {
                              // Prevent navigation during drag
                              if (isDragging) e.preventDefault();
                            }}
                          >
                            {/* Card Header */}
                            <div className="flex items-start justify-between mb-2">
                              <p className="text-sm font-medium text-[#101010] group-hover:text-[#ff4f01] transition-colors leading-tight flex-1 mr-2">
                                {req.title}
                              </p>
                              <span className={`text-[10px] font-bold shrink-0 ${priorityColors[req.priority] || ""}`}>
                                {req.priority}
                              </span>
                            </div>

                            {/* Card Meta */}
                            <div className="flex items-center gap-1.5 flex-wrap mb-3">
                              {req.brand_name && (
                                <span className="text-[10px] bg-[#f5f5f5] px-2 py-0.5 rounded-full text-[rgb(119,119,125)] flex items-center gap-1">
                                  <i className="ri-palette-line" />
                                  {req.brand_name}
                                </span>
                              )}
                              <span className="text-[10px] bg-[#f5f5f5] px-2 py-0.5 rounded-full text-[rgb(119,119,125)]">
                                {req.category}
                              </span>
                            </div>

                            {/* Card Footer */}
                            <div className="flex items-center justify-between pt-2 border-t border-[#f0f0f0]">
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-[#ff4f01]/20 flex items-center justify-center">
                                  <span className="text-[8px] font-bold text-[#ff4f01]">
                                    {(req.designer_name || "U").charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <span className="text-[10px] text-[rgb(119,119,125)]">
                                  {req.designer_name || "Unassigned"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                {(req.revision_count || 0) > 0 && (
                                  <span className="text-[10px] text-[rgb(119,119,125)] flex items-center gap-0.5">
                                    <i className="ri-loop-left-line" />
                                    {req.revision_count}
                                  </span>
                                )}
                                <span className="text-[10px] text-[rgb(119,119,125)]">
                                  {formatTime(req.updated_at || req.created_at)}
                                </span>
                              </div>
                            </div>
                          </Link>

                          {/* Drag handle indicator */}
                          <div className="flex justify-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <i className="ri-drag-move-2-line text-[rgb(119,119,125)] text-xs" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  );
}