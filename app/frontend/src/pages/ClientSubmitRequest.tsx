import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { client } from "@/lib/api";
import { toast } from "sonner";

const categories = [
  "Social Media Graphics", "Logo Design", "Brand Identity", "Presentation Design",
  "Email Graphics", "Web Design", "Packaging Design", "Print Design",
  "Illustration", "Video Editing", "Motion Graphics", "Other",
];

const dimensionSuggestions: Record<string, string[]> = {
  "Social Media Graphics": ["1080x1080 (Instagram Post)", "1200x628 (Facebook Post)", "1080x1920 (Story)", "1500x500 (Twitter Header)"],
  "Logo Design": ["1000x1000 (Square)", "2000x500 (Horizontal)", "500x2000 (Vertical)"],
  "Presentation Design": ["1920x1080 (16:9)", "1024x768 (4:3)"],
  "Email Graphics": ["600x200 (Header)", "600x400 (Hero)", "600x600 (Square)"],
  "Web Design": ["1440x900 (Desktop)", "768x1024 (Tablet)", "375x812 (Mobile)"],
  "Print Design": ["8.5x11 in (Letter)", "11x17 in (Tabloid)", "3.5x2 in (Business Card)"],
};

interface Brand {
  id: number;
  name: string;
  primary_color: string;
  secondary_color: string;
}

export default function ClientSubmitRequest() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [aiSuggesting, setAiSuggesting] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [uploadingRef, setUploadingRef] = useState(false);
  const [refFiles, setRefFiles] = useState<{ name: string; key: string }[]>([]);
  const [form, setForm] = useState({
    title: "",
    category: "",
    brand_name: "",
    priority: "Medium",
    description: "",
    dimensions: "",
    include_source: false,
  });

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      const response = await client.entities.brands.query({ limit: 50 });
      setBrands(response?.data?.items || []);
    } catch {
      // silently fail
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const value = target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value;
    setForm({ ...form, [target.name]: value });
  };

  const handleAiAssist = async () => {
    if (!form.description || form.description.length < 10) {
      toast.error("Please write at least a brief description first");
      return;
    }

    setAiSuggesting(true);
    setAiSuggestion("");
    try {
      await client.ai.gentxt({
        messages: [
          {
            role: "system",
            content: "You are a design brief assistant. Given a design request description, suggest the best category, dimensions, format, and any additional details that would help a designer. Keep it concise and actionable in 3-4 bullet points.",
          },
          {
            role: "user",
            content: `Design request: "${form.description}"\n\nCurrent category: ${form.category || "not selected"}\nPlease suggest optimal settings.`,
          },
        ],
        model: "deepseek-v3.2",
        stream: true,
        onChunk: (chunk: { content?: string }) => {
          if (chunk.content) {
            setAiSuggestion((prev) => prev + chunk.content);
          }
        },
        onComplete: () => {
          setAiSuggesting(false);
        },
        onError: () => {
          setAiSuggesting(false);
          toast.error("AI suggestion failed. You can still submit manually.");
        },
      });
    } catch {
      setAiSuggesting(false);
      toast.error("AI suggestion failed");
    }
  };

  const handleRefUpload = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setUploadingRef(true);
    try {
      for (const file of Array.from(fileList)) {
        const objectKey = `references/${Date.now()}-${file.name}`;
        const uploadRes = await client.storage.getUploadUrl({
          bucket_name: "design-assets",
          object_key: objectKey,
        });
        await fetch(uploadRes.data.upload_url, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        });
        setRefFiles((prev) => [...prev, { name: file.name, key: objectKey }]);
      }
      toast.success("Reference file(s) uploaded!");
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Failed to upload reference file");
    } finally {
      setUploadingRef(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const requestData: Record<string, unknown> = {
        title: form.title,
        category: form.category,
        priority: form.priority,
        status: "Queue",
        include_source: form.include_source,
      };
      if (form.brand_name) requestData.brand_name = form.brand_name;
      if (form.description) {
        let desc = form.description;
        if (form.dimensions) desc += `\n\nDimensions: ${form.dimensions}`;
        if (refFiles.length > 0) {
          desc += `\n\nReference files: ${refFiles.map((f) => f.name).join(", ")}`;
        }
        requestData.description = desc;
      }

      await client.entities.design_requests.create({ data: requestData });
      toast.success("Request submitted successfully!");
      navigate("/client/requests");
    } catch (err) {
      console.error("Failed to submit request:", err);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const suggestedDimensions = dimensionSuggestions[form.category] || [];

  return (
    <DashboardLayout type="client">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-bricolage text-[#101010]">Submit Request</h1>
        <p className="text-sm text-[rgb(119,119,125)]">Create a new design request for your team.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="bg-white rounded-xl border border-[#e5e5e5] p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-[#101010] mb-1.5">Request Title *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g., Instagram Post Design for Product Launch"
              required
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] placeholder:text-[rgb(119,119,125)]/50 focus:outline-none focus:border-[#ff4f01] transition-colors"
            />
          </div>

          {/* Category & Brand */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#101010] mb-1.5">Design Category *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] focus:outline-none focus:border-[#ff4f01] cursor-pointer"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#101010] mb-1.5">Brand</label>
              {brands.length > 0 ? (
                <select
                  name="brand_name"
                  value={form.brand_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] focus:outline-none focus:border-[#ff4f01] cursor-pointer"
                >
                  <option value="">Select brand</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.name}>{brand.name}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name="brand_name"
                  value={form.brand_name}
                  onChange={handleChange}
                  placeholder="e.g., TechCo"
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] placeholder:text-[rgb(119,119,125)]/50 focus:outline-none focus:border-[#ff4f01] transition-colors"
                />
              )}
            </div>
          </div>

          {/* Dimensions */}
          {suggestedDimensions.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-[#101010] mb-1.5">
                Dimensions
                <span className="text-xs text-[rgb(119,119,125)] ml-2">AI Suggested for {form.category}</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {suggestedDimensions.map((dim) => (
                  <button
                    key={dim}
                    type="button"
                    onClick={() => setForm({ ...form, dimensions: dim })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      form.dimensions === dim
                        ? "bg-[#ff4f01] text-white"
                        : "bg-[#f5f5f5] text-[rgb(119,119,125)] hover:bg-[#e5e5e5]"
                    }`}
                  >
                    {dim}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={form.dimensions}
                onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
                placeholder="Or enter custom dimensions"
                className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] placeholder:text-[rgb(119,119,125)]/50 focus:outline-none focus:border-[#ff4f01] transition-colors"
              />
            </div>
          )}

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-[#101010] mb-1.5">Priority</label>
            <div className="flex gap-2">
              {["Low", "Medium", "High", "Urgent"].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setForm({ ...form, priority: p })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    form.priority === p
                      ? "bg-[#ff4f01] text-white"
                      : "bg-[#f5f5f5] text-[rgb(119,119,125)] hover:bg-[#e5e5e5]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-[#101010]">Description *</label>
              <button
                type="button"
                onClick={handleAiAssist}
                disabled={aiSuggesting}
                className="flex items-center gap-1.5 text-xs text-[#ff4f01] hover:underline cursor-pointer disabled:opacity-50"
              >
                <i className={`ri-magic-line ${aiSuggesting ? "animate-spin" : ""}`} />
                {aiSuggesting ? "Analyzing..." : "AI Assist"}
              </button>
            </div>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your design request in detail. Include dimensions, colors, text content, and any specific requirements..."
              required
              rows={6}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] placeholder:text-[rgb(119,119,125)]/50 focus:outline-none focus:border-[#ff4f01] transition-colors resize-none"
            />
          </div>

          {/* AI Suggestion */}
          {aiSuggestion && (
            <div className="bg-[#ff4f01]/5 border border-[#ff4f01]/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <i className="ri-magic-line text-[#ff4f01]" />
                <span className="text-sm font-medium text-[#ff4f01]">AI Suggestions</span>
              </div>
              <p className="text-sm text-[#101010] leading-6 whitespace-pre-wrap">{aiSuggestion}</p>
            </div>
          )}

          {/* Reference Files */}
          <div>
            <label className="block text-sm font-medium text-[#101010] mb-1.5">Reference Files</label>
            <div className="border-2 border-dashed border-[#e5e5e5] rounded-xl p-6 text-center hover:border-[#ff4f01]/30 transition-colors">
              <i className="ri-upload-cloud-2-line text-3xl text-[rgb(119,119,125)] mb-2 inline-block" />
              <p className="text-sm text-[rgb(119,119,125)] mb-2">
                Upload reference images, brand assets, or inspiration
              </p>
              <label className="inline-flex items-center gap-2 text-sm text-[#ff4f01] font-medium cursor-pointer hover:underline">
                <i className="ri-add-line" /> Choose Files
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.ai,.psd,.sketch,.fig"
                  className="hidden"
                  onChange={(e) => handleRefUpload(e.target.files)}
                />
              </label>
              {uploadingRef && (
                <div className="flex items-center justify-center gap-2 mt-3 text-sm text-[rgb(119,119,125)]">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#ff4f01]"></div>
                  Uploading...
                </div>
              )}
            </div>
            {refFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                {refFiles.map((file, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#101010] bg-[#f9f9f9] rounded-lg px-3 py-2">
                    <i className="ri-file-line text-[rgb(119,119,125)]" />
                    <span className="flex-1 truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => setRefFiles((prev) => prev.filter((_, j) => j !== i))}
                      className="text-red-400 hover:text-red-500 cursor-pointer"
                    >
                      <i className="ri-close-line" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Include Source */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="include_source"
              checked={form.include_source}
              onChange={handleChange}
              className="w-4 h-4 rounded border-[#bebebe] text-[#ff4f01] focus:ring-[#ff4f01] cursor-pointer"
            />
            <span className="text-sm text-[#101010]">Include source files with delivery</span>
          </label>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary !mb-0 !py-3 !px-8 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <i className="ri-send-plane-line mr-1" /> Create Request
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/client/requests")}
              className="btn btn-outline !mb-0 !py-3 !px-8"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}