import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { client } from "@/lib/api";
import { toast } from "sonner";

interface Brand {
  id: number;
  name: string;
  logo_key: string;
  primary_color: string;
  secondary_color: string;
  fonts: string;
  guidelines: string;
  website: string;
  industry: string;
  created_at: string;
  updated_at: string;
}

const industries = [
  "Technology", "E-commerce", "Healthcare", "Education", "Finance",
  "Real Estate", "Food & Beverage", "Fashion", "Travel", "Entertainment",
  "Marketing", "Non-profit", "Other",
];

export default function ClientBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    primary_color: "#ff4f01",
    secondary_color: "#101010",
    fonts: "",
    guidelines: "",
    website: "",
    industry: "",
  });

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      const response = await client.entities.brands.query({
        sort: "-created_at",
        limit: 50,
      });
      setBrands(response?.data?.items || []);
    } catch (err) {
      console.error("Failed to load brands:", err);
      toast.error("Failed to load brands");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      primary_color: "#ff4f01",
      secondary_color: "#101010",
      fonts: "",
      guidelines: "",
      website: "",
      industry: "",
    });
    setEditingBrand(null);
    setShowForm(false);
  };

  const openEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setForm({
      name: brand.name,
      primary_color: brand.primary_color || "#ff4f01",
      secondary_color: brand.secondary_color || "#101010",
      fonts: brand.fonts || "",
      guidelines: brand.guidelines || "",
      website: brand.website || "",
      industry: brand.industry || "",
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Brand name is required");
      return;
    }

    setSubmitting(true);
    try {
      const data: Record<string, unknown> = { name: form.name };
      if (form.primary_color) data.primary_color = form.primary_color;
      if (form.secondary_color) data.secondary_color = form.secondary_color;
      if (form.fonts) data.fonts = form.fonts;
      if (form.guidelines) data.guidelines = form.guidelines;
      if (form.website) data.website = form.website;
      if (form.industry) data.industry = form.industry;

      if (editingBrand) {
        await client.entities.brands.update({
          id: String(editingBrand.id),
          data,
        });
        toast.success("Brand updated successfully!");
      } else {
        await client.entities.brands.create({ data });
        toast.success("Brand created successfully!");
      }
      resetForm();
      loadBrands();
    } catch (err) {
      console.error("Failed to save brand:", err);
      toast.error("Failed to save brand");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this brand?")) return;
    try {
      await client.entities.brands.delete({ id: String(id) });
      setBrands((prev) => prev.filter((b) => b.id !== id));
      toast.success("Brand deleted");
    } catch (err) {
      console.error("Failed to delete brand:", err);
      toast.error("Failed to delete brand");
    }
  };

  const handleLogoUpload = async (brandId: number, file: File) => {
    try {
      const objectKey = `brands/${brandId}/logo-${Date.now()}-${file.name}`;
      const uploadRes = await client.storage.getUploadUrl({
        bucket_name: "design-assets",
        object_key: objectKey,
      });
      await fetch(uploadRes.data.upload_url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      await client.entities.brands.update({
        id: String(brandId),
        data: { logo_key: objectKey },
      });
      toast.success("Logo uploaded!");
      loadBrands();
    } catch (err) {
      console.error("Failed to upload logo:", err);
      toast.error("Failed to upload logo");
    }
  };

  const [logoUrls, setLogoUrls] = useState<Record<number, string>>({});

  useEffect(() => {
    brands.forEach(async (brand) => {
      if (brand.logo_key && !logoUrls[brand.id]) {
        try {
          const res = await client.storage.getDownloadUrl({
            bucket_name: "design-assets",
            object_key: brand.logo_key,
          });
          setLogoUrls((prev) => ({ ...prev, [brand.id]: res.data.download_url }));
        } catch {
          // silently fail
        }
      }
    });
  }, [brands]);

  return (
    <DashboardLayout type="client">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold font-bricolage text-[#101010]">Brands</h1>
          <p className="text-sm text-[rgb(119,119,125)]">
            Manage your brand profiles, assets, and guidelines.
          </p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="btn btn-primary !mb-0 !py-2.5 !px-5 text-sm"
        >
          <i className="ri-add-line mr-1" /> New Brand
        </button>
      </div>

      {/* Brand Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#e5e5e5]">
              <h2 className="text-xl font-bold font-bricolage text-[#101010]">
                {editingBrand ? "Edit Brand" : "Create New Brand"}
              </h2>
              <button onClick={resetForm} className="text-[rgb(119,119,125)] hover:text-[#101010] cursor-pointer">
                <i className="ri-close-line text-xl" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#101010] mb-1.5">Brand Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g., TechCo"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] placeholder:text-[rgb(119,119,125)]/50 focus:outline-none focus:border-[#ff4f01] transition-colors"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#101010] mb-1.5">Industry</label>
                  <select
                    value={form.industry}
                    onChange={(e) => setForm({ ...form, industry: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] focus:outline-none focus:border-[#ff4f01] cursor-pointer"
                  >
                    <option value="">Select industry</option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#101010] mb-1.5">Website</label>
                  <input
                    type="url"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] placeholder:text-[rgb(119,119,125)]/50 focus:outline-none focus:border-[#ff4f01] transition-colors"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#101010] mb-1.5">Primary Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={form.primary_color}
                      onChange={(e) => setForm({ ...form, primary_color: e.target.value })}
                      className="w-10 h-10 rounded-lg border border-[#e5e5e5] cursor-pointer"
                    />
                    <input
                      type="text"
                      value={form.primary_color}
                      onChange={(e) => setForm({ ...form, primary_color: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] focus:outline-none focus:border-[#ff4f01] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#101010] mb-1.5">Secondary Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={form.secondary_color}
                      onChange={(e) => setForm({ ...form, secondary_color: e.target.value })}
                      className="w-10 h-10 rounded-lg border border-[#e5e5e5] cursor-pointer"
                    />
                    <input
                      type="text"
                      value={form.secondary_color}
                      onChange={(e) => setForm({ ...form, secondary_color: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] focus:outline-none focus:border-[#ff4f01] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#101010] mb-1.5">Brand Fonts</label>
                <input
                  type="text"
                  value={form.fonts}
                  onChange={(e) => setForm({ ...form, fonts: e.target.value })}
                  placeholder="e.g., Inter, Playfair Display"
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] placeholder:text-[rgb(119,119,125)]/50 focus:outline-none focus:border-[#ff4f01] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#101010] mb-1.5">Brand Guidelines</label>
                <textarea
                  value={form.guidelines}
                  onChange={(e) => setForm({ ...form, guidelines: e.target.value })}
                  placeholder="Describe your brand voice, style preferences, do's and don'ts..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] placeholder:text-[rgb(119,119,125)]/50 focus:outline-none focus:border-[#ff4f01] transition-colors resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary !mb-0 !py-3 !px-8 disabled:opacity-50"
                >
                  {submitting ? "Saving..." : editingBrand ? "Update Brand" : "Create Brand"}
                </button>
                <button type="button" onClick={resetForm} className="btn btn-outline !mb-0 !py-3 !px-8">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Brands Grid */}
      {loading ? (
        <div className="bg-white rounded-xl border border-[#e5e5e5] p-10 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff4f01] mx-auto mb-3"></div>
          <p className="text-sm text-[rgb(119,119,125)]">Loading brands...</p>
        </div>
      ) : brands.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#e5e5e5] p-10 text-center">
          <i className="ri-palette-line text-4xl text-[rgb(119,119,125)] mb-3 inline-block" />
          <h3 className="text-lg font-semibold text-[#101010] mb-2">No brands yet</h3>
          <p className="text-sm text-[rgb(119,119,125)] mb-4">
            Create your first brand profile to keep your designs consistent.
          </p>
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="btn btn-primary !mb-0 !py-2 !px-5 text-sm"
          >
            <i className="ri-add-line mr-1" /> Create Brand
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="bg-white rounded-xl border border-[#e5e5e5] hover:border-[#ff4f01]/30 transition-all overflow-hidden"
            >
              {/* Color Banner */}
              <div
                className="h-20 relative"
                style={{
                  background: `linear-gradient(135deg, ${brand.primary_color || "#ff4f01"}, ${brand.secondary_color || "#101010"})`,
                }}
              >
                {/* Logo */}
                <div className="absolute -bottom-6 left-5">
                  <div className="w-14 h-14 rounded-xl bg-white border-2 border-white shadow-md flex items-center justify-center overflow-hidden">
                    {brand.logo_key && logoUrls[brand.id] ? (
                      <img src={logoUrls[brand.id]} alt={brand.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xl font-bold text-[#ff4f01]">
                        {brand.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-10 px-5 pb-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-[#101010] font-bricolage">{brand.name}</h3>
                    {brand.industry && (
                      <span className="text-xs text-[rgb(119,119,125)]">{brand.industry}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEdit(brand)}
                      className="w-8 h-8 rounded-lg hover:bg-[#f5f5f5] flex items-center justify-center transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <i className="ri-pencil-line text-[rgb(119,119,125)]" />
                    </button>
                    <button
                      onClick={() => handleDelete(brand.id)}
                      className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <i className="ri-delete-bin-line text-red-400" />
                    </button>
                  </div>
                </div>

                {/* Color Swatches */}
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-6 h-6 rounded-full border border-[#e5e5e5]"
                    style={{ backgroundColor: brand.primary_color || "#ff4f01" }}
                    title={`Primary: ${brand.primary_color}`}
                  />
                  <div
                    className="w-6 h-6 rounded-full border border-[#e5e5e5]"
                    style={{ backgroundColor: brand.secondary_color || "#101010" }}
                    title={`Secondary: ${brand.secondary_color}`}
                  />
                  {brand.fonts && (
                    <span className="text-xs text-[rgb(119,119,125)] ml-2">
                      <i className="ri-font-size mr-1" />{brand.fonts}
                    </span>
                  )}
                </div>

                {brand.guidelines && (
                  <p className="text-xs text-[rgb(119,119,125)] line-clamp-2 mb-3">{brand.guidelines}</p>
                )}

                {/* Upload Logo */}
                <label className="flex items-center gap-2 text-xs text-[#ff4f01] hover:underline cursor-pointer">
                  <i className="ri-upload-2-line" />
                  {brand.logo_key ? "Change Logo" : "Upload Logo"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleLogoUpload(brand.id, file);
                    }}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}