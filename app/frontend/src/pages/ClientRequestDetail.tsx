import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { client } from "@/lib/api";
import { toast } from "sonner";

interface DesignRequest {
  id: number;
  title: string;
  brand_name: string;
  category: string;
  priority: string;
  status: string;
  description: string;
  designer_name: string;
  due_date: string;
  include_source: boolean;
  revision_count: number;
  dimensions: string;
  reference_links: string;
  created_at: string;
  updated_at: string;
}

interface Comment {
  id: number;
  request_id: number;
  comment: string;
  author_name: string;
  created_at: string;
}

interface DesignFile {
  id: number;
  request_id: number;
  file_name: string;
  object_key: string;
  file_type: string;
  file_size: number;
  version: number;
  is_source: boolean;
  is_final: boolean;
  uploaded_by: string;
  created_at: string;
}

interface StatusHistory {
  id: number;
  request_id: number;
  from_status: string;
  to_status: string;
  changed_by: string;
  note: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  Queue: "bg-[#f5f5f5] text-[#666]",
  Requests: "bg-[#f5f5f5] text-[#666]",
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

const statusTimeline = ["Requests", "In Progress", "In Review", "Completed"];

const mapStatus = (status: string): string => {
  switch (status) {
    case "Queue": return "Requests";
    case "Review":
    case "Client Review":
    case "Internal Review":
      return "In Review";
    default: return status;
  }
};

export default function ClientRequestDetail() {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState<DesignRequest | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [files, setFiles] = useState<DesignFile[]>([]);
  const [statusHistory, setStatusHistory] = useState<StatusHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [activeTab, setActiveTab] = useState<"comments" | "history">("comments");

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const [reqRes, commentsRes, filesRes, historyRes] = await Promise.all([
        client.entities.design_requests.get({ id: id! }),
        client.entities.request_comments.query({
          query: { request_id: Number(id) },
          sort: "-created_at",
          limit: 50,
        }),
        client.entities.design_files.query({
          query: { request_id: Number(id) },
          sort: "-created_at",
          limit: 50,
        }),
        client.entities.status_history.query({
          query: { request_id: Number(id) },
          sort: "-created_at",
          limit: 50,
        }),
      ]);
      setRequest(reqRes?.data || null);
      setComments(commentsRes?.data?.items || []);
      setFiles(filesRes?.data?.items || []);
      setStatusHistory(historyRes?.data?.items || []);
    } catch (err) {
      console.error("Failed to load request:", err);
      toast.error("Failed to load request details");
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmittingComment(true);
    try {
      await client.entities.request_comments.create({
        data: {
          request_id: Number(id),
          comment: newComment,
          author_name: "Client",
        },
      });
      setNewComment("");
      toast.success("Comment added");

      // Trigger email notification for comment
      try {
        await client.apiCall.invoke({
          url: "/api/v1/notifications/notify-comment",
          method: "POST",
          data: {
            request_id: Number(id),
            commenter_name: "Client",
            comment_preview: newComment,
          },
        });
      } catch {
        // Non-critical
      }

      const commentsRes = await client.entities.request_comments.query({
        query: { request_id: Number(id) },
        sort: "-created_at",
        limit: 50,
      });
      setComments(commentsRes?.data?.items || []);
    } catch (err) {
      console.error("Failed to add comment:", err);
      toast.error("Failed to add comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleRequestRevision = async () => {
    if (!request) return;
    const revisionNote = prompt("Describe the revision you need:");
    if (!revisionNote) return;

    try {
      // Add comment
      await client.entities.request_comments.create({
        data: {
          request_id: Number(id),
          comment: `🔄 Revision requested: ${revisionNote}`,
          author_name: "Client",
        },
      });
      // Update revision count
      await client.entities.design_requests.update({
        id: id!,
        data: { revision_count: (request.revision_count || 0) + 1 },
      });
      // Add status history
      await client.entities.status_history.create({
        data: {
          request_id: Number(id),
          from_status: request.status,
          to_status: "In Progress",
          changed_by: "Client",
          note: `Revision requested: ${revisionNote}`,
        },
      });
      toast.success("Revision requested!");
      loadData();
    } catch (err) {
      console.error("Failed to request revision:", err);
      toast.error("Failed to request revision");
    }
  };

  const handleFileUpload = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setUploadingFile(true);

    try {
      for (const file of Array.from(fileList)) {
        const objectKey = `requests/${id}/${Date.now()}-${file.name}`;
        const uploadRes = await client.storage.getUploadUrl({
          bucket_name: "design-assets",
          object_key: objectKey,
        });
        await fetch(uploadRes.data.upload_url, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        });
        await client.entities.design_files.create({
          data: {
            request_id: Number(id),
            file_name: file.name,
            object_key: objectKey,
            file_type: file.type,
            file_size: file.size,
            version: 1,
            is_source: false,
            is_final: false,
            uploaded_by: "client",
          },
        });
      }
      toast.success("File(s) uploaded successfully!");
      const filesRes = await client.entities.design_files.query({
        query: { request_id: Number(id) },
        sort: "-created_at",
        limit: 50,
      });
      setFiles(filesRes?.data?.items || []);
    } catch (err) {
      console.error("Failed to upload file:", err);
      toast.error("Failed to upload file");
    } finally {
      setUploadingFile(false);
    }
  };

  const handleDownload = async (objectKey: string, fileName: string) => {
    try {
      const res = await client.storage.getDownloadUrl({
        bucket_name: "design-assets",
        object_key: objectKey,
      });
      const a = document.createElement("a");
      a.href = res.data.download_url;
      a.download = fileName;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("Failed to download:", err);
      toast.error("Failed to download file");
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const fileIcon = (type: string) => {
    if (type?.startsWith("image/")) return "ri-image-line text-[#7c3aed]";
    if (type?.includes("pdf")) return "ri-file-pdf-line text-[#ef4444]";
    if (type?.includes("video")) return "ri-video-line text-[#f59e0b]";
    return "ri-file-line text-[#0ea5e9]";
  };

  const historyIcon = (toStatus: string) => {
    switch (toStatus) {
      case "In Progress": return "ri-play-circle-line text-[#7c3aed]";
      case "In Review":
      case "Review":
      case "Client Review": return "ri-eye-line text-[#0ea5e9]";
      case "Completed": return "ri-check-double-line text-[#22c55e]";
      default: return "ri-file-list-3-line text-[#9ca3af]";
    }
  };

  if (loading) {
    return (
      <DashboardLayout type="client">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#ff4f01] mx-auto mb-4"></div>
          <p className="text-sm text-[rgb(119,119,125)]">Loading request...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!request) {
    return (
      <DashboardLayout type="client">
        <div className="text-center py-20">
          <i className="ri-file-warning-line text-4xl text-[rgb(119,119,125)] mb-3 inline-block" />
          <p className="text-lg text-[#101010] font-medium mb-2">Request not found</p>
          <Link to="/client/requests" className="text-sm text-[#ff4f01] hover:underline">
            ← Back to Requests
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const mappedStatus = mapStatus(request.status);
  const currentStepIndex = statusTimeline.indexOf(mappedStatus);

  return (
    <DashboardLayout type="client">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[rgb(119,119,125)] mb-6">
        <Link to="/client/requests" className="hover:text-[#ff4f01] transition-colors">Requests</Link>
        <i className="ri-arrow-right-s-line" />
        <span className="text-[#101010] font-medium">REQ-{String(request.id).padStart(3, "0")}</span>
      </div>

      {/* Header */}
      <div className="bg-white rounded-xl border border-[#e5e5e5] p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold font-bricolage text-[#101010]">{request.title}</h1>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[mappedStatus] || "bg-[#f5f5f5] text-[#666]"}`}>
                {mappedStatus}
              </span>
              <span className={`text-sm font-medium ${priorityColors[request.priority] || ""}`}>
                <i className="ri-flag-line mr-1" />{request.priority}
              </span>
              {request.brand_name && (
                <span className="text-xs bg-[#f5f5f5] px-2.5 py-1 rounded-full text-[rgb(119,119,125)]">
                  <i className="ri-palette-line mr-1" />{request.brand_name}
                </span>
              )}
              <span className="text-xs text-[rgb(119,119,125)]">
                <i className="ri-folder-line mr-1" />{request.category}
              </span>
              {(request.revision_count || 0) > 0 && (
                <span className="text-xs bg-[#f59e0b]/10 text-[#f59e0b] px-2.5 py-1 rounded-full font-medium">
                  <i className="ri-loop-left-line mr-1" />{request.revision_count} revision{request.revision_count > 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {mappedStatus !== "Completed" && (
              <button
                onClick={handleRequestRevision}
                className="btn btn-outline !mb-0 !py-2 !px-4 text-sm"
              >
                <i className="ri-loop-left-line mr-1" /> Request Revision
              </button>
            )}
          </div>
        </div>

        {/* Status Timeline */}
        <div className="flex items-center gap-0 mt-6">
          {statusTimeline.map((step, i) => {
            const isCompleted = i <= currentStepIndex;
            const isCurrent = i === currentStepIndex;
            return (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCurrent
                        ? "bg-[#ff4f01] text-white ring-4 ring-[#ff4f01]/20"
                        : isCompleted
                        ? "bg-[#22c55e] text-white"
                        : "bg-[#f5f5f5] text-[rgb(119,119,125)]"
                    }`}
                  >
                    {isCompleted && !isCurrent ? <i className="ri-check-line" /> : i + 1}
                  </div>
                  <span className={`text-xs mt-1.5 ${isCurrent ? "text-[#ff4f01] font-medium" : "text-[rgb(119,119,125)]"}`}>
                    {step}
                  </span>
                </div>
                {i < statusTimeline.length - 1 && (
                  <div className={`h-0.5 flex-1 -mt-5 ${i < currentStepIndex ? "bg-[#22c55e]" : "bg-[#e5e5e5]"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Description, Comments & History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          {request.description && (
            <div className="bg-white rounded-xl border border-[#e5e5e5] p-6">
              <h2 className="text-lg font-semibold font-bricolage text-[#101010] mb-3">Description</h2>
              <p className="text-sm text-[rgb(119,119,125)] leading-7 whitespace-pre-wrap">{request.description}</p>
              {request.dimensions && (
                <div className="mt-3 pt-3 border-t border-[#f0f0f0]">
                  <span className="text-xs font-medium text-[#101010]">Dimensions: </span>
                  <span className="text-xs text-[rgb(119,119,125)]">{request.dimensions}</span>
                </div>
              )}
              {request.reference_links && (
                <div className="mt-2">
                  <span className="text-xs font-medium text-[#101010]">Reference Links: </span>
                  <span className="text-xs text-[#ff4f01]">{request.reference_links}</span>
                </div>
              )}
            </div>
          )}

          {/* Tabs: Comments & History */}
          <div className="bg-white rounded-xl border border-[#e5e5e5]">
            <div className="flex border-b border-[#e5e5e5]">
              <button
                onClick={() => setActiveTab("comments")}
                className={`flex-1 py-3 text-sm font-medium text-center transition-colors cursor-pointer ${
                  activeTab === "comments"
                    ? "text-[#ff4f01] border-b-2 border-[#ff4f01]"
                    : "text-[rgb(119,119,125)] hover:text-[#101010]"
                }`}
              >
                <i className="ri-chat-3-line mr-1" />
                Comments ({comments.length})
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex-1 py-3 text-sm font-medium text-center transition-colors cursor-pointer ${
                  activeTab === "history"
                    ? "text-[#ff4f01] border-b-2 border-[#ff4f01]"
                    : "text-[rgb(119,119,125)] hover:text-[#101010]"
                }`}
              >
                <i className="ri-history-line mr-1" />
                Revision History ({statusHistory.length})
              </button>
            </div>

            <div className="p-6">
              {/* Comments Tab */}
              {activeTab === "comments" && (
                <>
                  <form onSubmit={handleAddComment} className="mb-6">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment or feedback..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] placeholder:text-[rgb(119,119,125)]/50 focus:outline-none focus:border-[#ff4f01] transition-colors resize-none"
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        type="submit"
                        disabled={submittingComment || !newComment.trim()}
                        className="btn btn-primary !mb-0 !py-2 !px-5 text-sm disabled:opacity-50"
                      >
                        {submittingComment ? "Sending..." : "Add Comment"}
                      </button>
                    </div>
                  </form>

                  {comments.length === 0 ? (
                    <p className="text-sm text-[rgb(119,119,125)] text-center py-4">No comments yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#ff4f01]/20 flex items-center justify-center text-xs font-bold text-[#ff4f01] shrink-0">
                            {(comment.author_name || "U").charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-[#101010]">{comment.author_name || "User"}</span>
                              <span className="text-xs text-[rgb(119,119,125)]">{formatDate(comment.created_at)}</span>
                            </div>
                            <p className="text-sm text-[rgb(119,119,125)] leading-6">{comment.comment}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* History Tab */}
              {activeTab === "history" && (
                <>
                  {statusHistory.length === 0 ? (
                    <p className="text-sm text-[rgb(119,119,125)] text-center py-4">No status changes recorded yet.</p>
                  ) : (
                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-4 top-0 bottom-0 w-px bg-[#e5e5e5]" />
                      <div className="space-y-4">
                        {statusHistory.map((entry) => (
                          <div key={entry.id} className="flex gap-4 relative">
                            <div className="w-8 h-8 rounded-full bg-white border-2 border-[#e5e5e5] flex items-center justify-center shrink-0 z-10">
                              <i className={`${historyIcon(entry.to_status)} text-sm`} />
                            </div>
                            <div className="flex-1 pb-4">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-[#101010]">
                                  {entry.from_status} → {entry.to_status}
                                </span>
                              </div>
                              <p className="text-xs text-[rgb(119,119,125)]">
                                by {entry.changed_by} • {formatDate(entry.created_at)}
                              </p>
                              {entry.note && (
                                <p className="text-sm text-[rgb(119,119,125)] mt-1 bg-[#f9f9f9] rounded-lg p-3">{entry.note}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Info, Team & Files */}
        <div className="space-y-6">
          {/* Team / Collaboration Info */}
          <div className="bg-white rounded-xl border border-[#e5e5e5] p-5">
            <h3 className="text-sm font-semibold text-[#101010] mb-3">Your Team</h3>
            <div className="space-y-3">
              {/* Designer */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#f9f9f9]">
                <div className="w-9 h-9 rounded-full bg-[#7c3aed]/20 flex items-center justify-center">
                  <i className="ri-brush-line text-[#7c3aed] text-sm" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[rgb(119,119,125)]">Designer</p>
                  <p className="text-sm font-medium text-[#101010]">{request.designer_name || "Pending Assignment"}</p>
                </div>
                {request.designer_name && (
                  <div className="w-2 h-2 rounded-full bg-[#22c55e]" title="Active" />
                )}
              </div>
              {/* Project Manager */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#f9f9f9]">
                <div className="w-9 h-9 rounded-full bg-[#ff4f01]/20 flex items-center justify-center">
                  <i className="ri-user-star-line text-[#ff4f01] text-sm" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[rgb(119,119,125)]">Project Manager</p>
                  <p className="text-sm font-medium text-[#101010]">Dedicated PM</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#22c55e]" title="Active" />
              </div>
            </div>
          </div>

          {/* Request Info */}
          <div className="bg-white rounded-xl border border-[#e5e5e5] p-5">
            <h3 className="text-sm font-semibold text-[#101010] mb-3">Request Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[rgb(119,119,125)]">ID</span>
                <span className="text-[#101010] font-medium">REQ-{String(request.id).padStart(3, "0")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[rgb(119,119,125)]">Category</span>
                <span className="text-[#101010]">{request.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[rgb(119,119,125)]">Revisions</span>
                <span className="text-[#101010] font-medium">{request.revision_count || 0}</span>
              </div>
              {request.due_date && (
                <div className="flex justify-between">
                  <span className="text-[rgb(119,119,125)]">Due Date</span>
                  <span className="text-[#101010]">{request.due_date}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[rgb(119,119,125)]">Source Files</span>
                <span className="text-[#101010]">{request.include_source ? "Included" : "Not included"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[rgb(119,119,125)]">Created</span>
                <span className="text-[#101010]">{formatDate(request.created_at)}</span>
              </div>
            </div>
          </div>

          {/* Files */}
          <div className="bg-white rounded-xl border border-[#e5e5e5] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#101010]">
                Files <span className="font-normal text-[rgb(119,119,125)]">({files.length})</span>
              </h3>
              <label className="text-xs text-[#ff4f01] hover:underline cursor-pointer flex items-center gap-1">
                <i className="ri-upload-2-line" /> Upload
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
              </label>
            </div>

            {uploadingFile && (
              <div className="flex items-center gap-2 text-sm text-[rgb(119,119,125)] mb-3">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#ff4f01]"></div>
                Uploading...
              </div>
            )}

            {files.length === 0 ? (
              <div className="text-center py-6">
                <i className="ri-folder-open-line text-2xl text-[rgb(119,119,125)] mb-2 inline-block" />
                <p className="text-xs text-[rgb(119,119,125)]">No files yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-[#f0f0f0] hover:border-[#e5e5e5] transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#f5f5f5] flex items-center justify-center shrink-0">
                      <i className={`${fileIcon(file.file_type)} text-lg`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#101010] truncate">{file.file_name}</p>
                      <div className="flex items-center gap-2 text-[10px] text-[rgb(119,119,125)]">
                        <span>{formatFileSize(file.file_size)}</span>
                        {file.is_final && <span className="text-[#22c55e] font-medium">Final</span>}
                        {file.is_source && <span className="text-[#7c3aed] font-medium">Source</span>}
                        {file.version > 1 && <span className="text-[#f59e0b] font-medium">v{file.version}</span>}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(file.object_key, file.file_name)}
                      className="w-8 h-8 rounded-lg hover:bg-[#f5f5f5] flex items-center justify-center cursor-pointer"
                      title="Download"
                    >
                      <i className="ri-download-line text-[rgb(119,119,125)]" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}