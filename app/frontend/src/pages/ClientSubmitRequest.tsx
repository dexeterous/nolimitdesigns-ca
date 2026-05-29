import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { client } from "@/lib/api";
import { toast } from "sonner";

const categoryGroups = [
  {
    label: "Website",
    items: ["Website Build", "Website Redesign", "Landing Page", "Service Page", "Contact Form", "Website Copy Update"],
  },
  {
    label: "E-Commerce",
    items: ["Online Store Setup", "Product Page", "Checkout Flow", "Payment Integration", "Inventory Setup"],
  },
  {
    label: "SEO & Analytics",
    items: ["SEO Audit", "Local SEO Update", "Analytics Setup", "Search Console Setup", "Performance Optimization"],
  },
  {
    label: "Integrations",
    items: ["Booking Integration", "CRM Integration", "Email Integration", "API Integration", "Custom Feature"],
  },
  {
    label: "Support",
    items: ["Bug Fix", "Content Update", "Maintenance Request", "Hosting / Domain Help"],
  },
  {
    label: "Other",
    items: ["Custom Website Request"],
  },
];

const allCategories = categoryGroups.flatMap((g) => g.items);

const dimensionSuggestions: Record<string, string[]> = {
  "Website Build": ["5-6 pages", "7-15 pages", "Custom scope"],
  "Website Redesign": ["Homepage + key pages", "Full site redesign", "Custom scope"],
  "Landing Page": ["Single page", "Campaign page", "Lead capture page"],
  "Service Page": ["Single service page", "Service page set", "Local service page"],
  "Online Store Setup": ["Small catalog", "Medium catalog", "Custom catalog"],
  "Product Page": ["Single product", "Product template", "Product collection"],
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
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "",
    brand_name: "",
    priority: "Medium",
    description: "",
    dimensions: "",
    reference_links: "",
    include_source: false,
    due_date: "",
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
            content: "You are a web project brief assistant. Given a website request description, suggest the best category, scope, priority considerations, and any details that would help a web development team. Keep it concise and actionable in 3-4 bullet points.",
          },
          {
            role: "user",
            content: `Website project request: "${form.description}"\n\nCurrent category: ${form.category || "not selected"}\nPlease suggest optimal settings.`,
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
        const objectKey = `project-references/${Date.now()}-${file.name}`;
        const uploadRes = await client.storage.getUploadUrl({
          bucket_name: "project-assets",
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
        revision_count: 0,
      };
      if (form.brand_name) requestData.brand_name = form.brand_name;
      if (form.description) requestData.description = form.description;
      if (form.dimensions) requestData.dimensions = form.dimensions;
      if (form.due_date) requestData.due_date = form.due_date;

      // Build reference links string
      const refLinksArr: string[] = [];
      if (form.reference_links.trim()) refLinksArr.push(form.reference_links.trim());
      if (refFiles.length > 0) {
        refLinksArr.push(...refFiles.map((f) => f.name));
      }
      if (refLinksArr.length > 0) requestData.reference_links = refLinksArr.join(", ");

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
        <p className="text-sm text-[rgb(119,119,125)]">Create a new website project request for your team.</p>
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
              placeholder="e.g., Website redesign for service pages"
              required
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] placeholder:text-[rgb(119,119,125)]/50 focus:outline-none focus:border-[#ff4f01] transition-colors"
            />
          </div>

          {/* Category & Brand */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-[#101010] mb-1.5">Project Category *</label>
              <button
                type="button"
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-left focus:outline-none focus:border-[#ff4f01] cursor-pointer flex items-center justify-between"
              >
                <span className={form.category ? "text-[#101010]" : "text-[rgb(119,119,125)]/50"}>
                  {form.category || "Select category"}
                </span>
                <i className={`ri-arrow-${showCategoryDropdown ? "up" : "down"}-s-line text-[rgb(119,119,125)]`} />
              </button>

              {showCategoryDropdown && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-[#e5e5e5] rounded-xl shadow-lg max-h-80 overflow-y-auto">
                  {categoryGroups.map((group) => (
                    <div key={group.label}>
                      <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-[rgb(119,119,125)] bg-[#fafafa] sticky top-0">
                        {group.label}
                      </div>
                      {group.items.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setForm({ ...form, category: item, dimensions: "" });
                            setShowCategoryDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#f5f5f5] transition-colors cursor-pointer ${
                            form.category === item ? "text-[#ff4f01] font-medium bg-[#ff4f01]/5" : "text-[#101010]"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
              {/* Hidden input for form validation */}
              <input type="hidden" name="category" value={form.category} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#101010] mb-1.5">Brand Profile</label>
              {brands.length > 0 ? (
                <select
                  name="brand_name"
                  value={form.brand_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] focus:outline-none focus:border-[#ff4f01] cursor-pointer"
                >
                  <option value="">Select brand</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.name}>
                      {brand.name}
                    </option>
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
          <div>
            <label className="block text-sm font-medium text-[#101010] mb-1.5">
              Dimensions / Size
              {suggestedDimensions.length > 0 && (
                <span className="text-xs text-[rgb(119,119,125)] ml-2">Suggested scope for {form.category}</span>
              )}
            </label>
            {suggestedDimensions.length > 0 && (
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
            )}
            <input
              type="text"
              name="dimensions"
              value={form.dimensions}
              onChange={handleChange}
              placeholder="e.g., 5 pages, full site redesign, custom integration"
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] placeholder:text-[rgb(119,119,125)]/50 focus:outline-none focus:border-[#ff4f01] transition-colors"
            />
          </div>

          {/* Priority & Due Date */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#101010] mb-1.5">Priority</label>
              <div className="flex gap-2">
                {["Low", "Medium", "High", "Urgent"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setForm({ ...form, priority: p })}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
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
            <div>
              <label className="block text-sm font-medium text-[#101010] mb-1.5">Due Date</label>
              <input
                type="date"
                name="due_date"
                value={form.due_date}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] focus:outline-none focus:border-[#ff4f01] cursor-pointer"
              />
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
              placeholder="Describe your website request in detail. Include goals, pages, content, integrations, audience, and any specific requirements..."
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

          {/* Reference Links */}
          <div>
            <label className="block text-sm font-medium text-[#101010] mb-1.5">
              Reference Links
              <span className="text-xs text-[rgb(119,119,125)] ml-2">URLs for inspiration or examples</span>
            </label>
            <textarea
              name="reference_links"
              value={form.reference_links}
              onChange={handleChange}
              placeholder="Paste URLs to reference websites, competitor examples, content docs, or inspiration (one per line)"
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] placeholder:text-[rgb(119,119,125)]/50 focus:outline-none focus:border-[#ff4f01] transition-colors resize-none"
            />
          </div>

          {/* Reference Files */}
          <div>
            <label className="block text-sm font-medium text-[#101010] mb-1.5">Reference Files</label>
            <div className="border-2 border-dashed border-[#e5e5e5] rounded-xl p-6 text-center hover:border-[#ff4f01]/30 transition-colors">
              <i className="ri-upload-cloud-2-line text-3xl text-[rgb(119,119,125)] mb-2 inline-block" />
              <p className="text-sm text-[rgb(119,119,125)] mb-2">
                Upload reference files, brand assets, content docs, or inspiration
              </p>
              <label className="inline-flex items-center gap-2 text-sm text-[#ff4f01] font-medium cursor-pointer hover:underline">
                <i className="ri-add-line" /> Choose Files
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.txt,.fig"
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
