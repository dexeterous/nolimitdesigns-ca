import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { client } from "@/lib/api";
import { toast } from "sonner";

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

type FilterType = "all" | "final" | "source" | "image" | "video" | "document";

export default function ClientFiles() {
  const [files, setFiles] = useState<DesignFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const response = await client.entities.design_files.query({
        sort: "-created_at",
        limit: 100,
      });
      setFiles(response?.data?.items || []);
    } catch (err) {
      console.error("Failed to load files:", err);
      toast.error("Failed to load files");
    } finally {
      setLoading(false);
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

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this file?")) return;
    try {
      await client.entities.design_files.delete({ id: String(id) });
      setFiles((prev) => prev.filter((f) => f.id !== id));
      toast.success("File deleted");
    } catch (err) {
      console.error("Failed to delete file:", err);
      toast.error("Failed to delete file");
    }
  };

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.file_name.toLowerCase().includes(searchQuery.toLowerCase());
    let matchesFilter = true;
    switch (filterType) {
      case "final": matchesFilter = file.is_final; break;
      case "source": matchesFilter = file.is_source; break;
      case "image": matchesFilter = file.file_type?.startsWith("image/") || false; break;
      case "video": matchesFilter = file.file_type?.includes("video") || false; break;
      case "document": matchesFilter = file.file_type?.includes("pdf") || file.file_type?.includes("document") || false; break;
      default: matchesFilter = true;
    }
    return matchesSearch && matchesFilter;
  });

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const fileIcon = (type: string) => {
    if (type?.startsWith("image/")) return "ri-image-line text-[#7c3aed]";
    if (type?.includes("pdf")) return "ri-file-pdf-line text-[#ef4444]";
    if (type?.includes("video")) return "ri-video-line text-[#f59e0b]";
    if (type?.includes("zip") || type?.includes("rar")) return "ri-file-zip-line text-[#22c55e]";
    return "ri-file-line text-[#0ea5e9]";
  };

  const totalSize = files.reduce((acc, f) => acc + (f.file_size || 0), 0);
  const finalCount = files.filter((f) => f.is_final).length;
  const sourceCount = files.filter((f) => f.is_source).length;

  const filterOptions: { label: string; value: FilterType }[] = [
    { label: "All Files", value: "all" },
    { label: "Final Deliverables", value: "final" },
    { label: "Source Files", value: "source" },
    { label: "Images", value: "image" },
    { label: "Videos", value: "video" },
    { label: "Documents", value: "document" },
  ];

  return (
    <DashboardLayout type="client">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-bricolage text-[#101010]">File Library</h1>
        <p className="text-sm text-[rgb(119,119,125)]">All your design files, organized and accessible.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Files", value: String(files.length), icon: "ri-folder-3-line", color: "bg-[#ff4f01]" },
          { label: "Final Deliverables", value: String(finalCount), icon: "ri-check-double-line", color: "bg-[#22c55e]" },
          { label: "Source Files", value: String(sourceCount), icon: "ri-code-box-line", color: "bg-[#7c3aed]" },
          { label: "Total Size", value: formatFileSize(totalSize), icon: "ri-hard-drive-3-line", color: "bg-[#0ea5e9]" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-[#e5e5e5]">
            <div className={`w-9 h-9 rounded-lg ${stat.color} flex items-center justify-center mb-2`}>
              <i className={`${stat.icon} text-white`} />
            </div>
            <p className="text-2xl font-bold font-bricolage text-[#101010]">{stat.value}</p>
            <p className="text-xs text-[rgb(119,119,125)]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-[#e5e5e5] p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative flex-1 w-full sm:max-w-xs">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(119,119,125)]" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] placeholder:text-[rgb(119,119,125)]/50 focus:outline-none focus:border-[#ff4f01] transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilterType(opt.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  filterType === opt.value
                    ? "bg-[#ff4f01] text-white"
                    : "bg-[#f5f5f5] text-[rgb(119,119,125)] hover:bg-[#e5e5e5]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* File List */}
      {loading ? (
        <div className="bg-white rounded-xl border border-[#e5e5e5] p-10 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff4f01] mx-auto mb-3"></div>
          <p className="text-sm text-[rgb(119,119,125)]">Loading files...</p>
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#e5e5e5] p-10 text-center">
          <i className="ri-folder-open-line text-4xl text-[rgb(119,119,125)] mb-3 inline-block" />
          <p className="text-sm text-[rgb(119,119,125)]">
            {files.length === 0 ? "No files yet. Files will appear here as designs are delivered." : "No files match your filter."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#e5e5e5] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">File</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Request</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Type</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Size</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Tags</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Date</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file) => (
                  <tr key={file.id} className="border-b border-[#f0f0f0] last:border-b-0 hover:bg-[#fafafa] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#f5f5f5] flex items-center justify-center shrink-0">
                          <i className={`${fileIcon(file.file_type)} text-lg`} />
                        </div>
                        <p className="text-sm font-medium text-[#101010] truncate max-w-[200px]">{file.file_name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-[rgb(119,119,125)]">
                      REQ-{String(file.request_id).padStart(3, "0")}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-[rgb(119,119,125)]">
                      {file.file_type?.split("/").pop()?.toUpperCase() || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-[rgb(119,119,125)]">{formatFileSize(file.file_size)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        {file.is_final && (
                          <span className="text-[10px] bg-[#22c55e]/10 text-[#22c55e] px-2 py-0.5 rounded-full font-medium">Final</span>
                        )}
                        {file.is_source && (
                          <span className="text-[10px] bg-[#7c3aed]/10 text-[#7c3aed] px-2 py-0.5 rounded-full font-medium">Source</span>
                        )}
                        {file.version > 1 && (
                          <span className="text-[10px] bg-[#f59e0b]/10 text-[#f59e0b] px-2 py-0.5 rounded-full font-medium">v{file.version}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-[rgb(119,119,125)]">{formatDate(file.created_at)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDownload(file.object_key, file.file_name)}
                          className="w-8 h-8 rounded-lg hover:bg-[#f5f5f5] flex items-center justify-center cursor-pointer"
                          title="Download"
                        >
                          <i className="ri-download-line text-[rgb(119,119,125)]" />
                        </button>
                        <button
                          onClick={() => handleDelete(file.id)}
                          className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center cursor-pointer"
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
    </DashboardLayout>
  );
}