import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { client } from "@/lib/api";
import { toast } from "sonner";

const categories = [
  "Social Media Graphics", "Logo Design", "Brand Identity", "Presentation Design",
  "Email Graphics", "Web Design", "Packaging Design", "Print Design",
  "Illustration", "Video Editing", "Motion Graphics", "Other",
];

export default function ClientSubmitRequest() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "",
    brand_name: "",
    priority: "Medium",
    description: "",
    include_source: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const value = target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value;
    setForm({ ...form, [target.name]: value });
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
      if (form.description) requestData.description = form.description;

      await client.entities.design_requests.create({
        data: requestData,
      });
      toast.success("Request submitted successfully!");
      navigate("/client/requests");
    } catch (err) {
      console.error("Failed to submit request:", err);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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
              <label className="block text-sm font-medium text-[#101010] mb-1.5">Brand Name</label>
              <input
                type="text"
                name="brand_name"
                value={form.brand_name}
                onChange={handleChange}
                placeholder="e.g., TechCo"
                className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] placeholder:text-[rgb(119,119,125)]/50 focus:outline-none focus:border-[#ff4f01] transition-colors"
              />
            </div>
          </div>

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
            <label className="block text-sm font-medium text-[#101010] mb-1.5">Description *</label>
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