import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { industries } from "@/data/siteData";
import { getPricingPackage, pricingPackages } from "@/data/pricingPackages";
import { toast } from "sonner";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    selectedPackage: "",
    budget: "",
    message: "",
    services: [] as string[],
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const buildSubmissionPayload = () => {
    const selected = getPricingPackage(formData.selectedPackage);

    return {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "",
      company: formData.company || "",
      industry: formData.industry || "",
      selectedPackage: selected ? `${selected.title} (${selected.investment})` : "",
      budget: formData.budget || "",
      message: formData.message,
      services: formData.services,
    };
  };

  const applySelectedPackage = (packageId: string) => {
    const selected = getPricingPackage(packageId);

    setFormData((prev) => {
      if (!selected) {
        return { ...prev, selectedPackage: "" };
      }

      return {
        ...prev,
        selectedPackage: selected.id,
        budget: selected.investment,
        services: prev.services.includes(selected.service)
          ? prev.services
          : [...prev.services, selected.service],
      };
    });
  };

  useEffect(() => {
    const packageId = searchParams.get("package");
    if (packageId) {
      applySelectedPackage(packageId);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buildSubmissionPayload()),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) {
        throw new Error(result?.error || "Contact API failed");
      }

      setSubmitted(true);
      toast.success("Message sent successfully! We'll get back to you within 2 hours.");
    } catch (error) {
      console.error("Contact form submission failed:", error);
      toast.error("Message could not be sent through Resend. Please check the Resend API configuration.");
    } finally {
      setLoading(false);
    }
  };

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const serviceOptions = [
    "Web Development",
    "E-Commerce",
    "SEO Services",
    "UI/UX Design",
    "Digital Marketing",
    "Website Maintenance",
  ];

  return (
    <div className="min-h-screen bg-[#fff6ec]">
      <SiteHeader />

      {/* Hero */}
      <section className="pt-[160px] pb-12">
        <div className="container-custom text-center">
          <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-4">
            <i className="ri-chat-3-line text-[#ff4f01]" />
            Get in Touch
          </span>
          <h1 className="font-bricolage font-semibold xl:text-[56px] xl:leading-[64px] lg:text-[48px] lg:leading-[56px] text-[36px] leading-[44px] text-[#101010] mb-4">
            Let&apos;s Build Something <span className="text-[#ff4f01]">Amazing</span>
          </h1>
          <p className="text-lg text-[rgb(119,119,125)] max-w-2xl mx-auto">
            Get a free consultation and custom quote for your project. We typically respond within 2 hours during business hours.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="pb-12">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
            <a href="tel:+15878826700" className="flex items-center gap-4 p-6 rounded-xl border border-[#bebebe] hover:border-[#ff4f01] transition-all bg-white group">
              <div className="w-12 h-12 rounded-full bg-[#ff4f01]/10 flex items-center justify-center shrink-0 group-hover:bg-[#ff4f01] transition-colors">
                <i className="ri-phone-line text-[#ff4f01] text-xl group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-medium font-bricolage">Call Us</p>
                <p className="text-sm text-[rgb(119,119,125)]">(587) 882-6700</p>
              </div>
            </a>
            <a href="mailto:hello@nolimitdesigns.ca" className="flex items-center gap-4 p-6 rounded-xl border border-[#bebebe] hover:border-[#ff4f01] transition-all bg-white group">
              <div className="w-12 h-12 rounded-full bg-[#ff4f01]/10 flex items-center justify-center shrink-0 group-hover:bg-[#ff4f01] transition-colors">
                <i className="ri-mail-line text-[#ff4f01] text-xl group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-medium font-bricolage">Email Us</p>
                <p className="text-sm text-[rgb(119,119,125)]">hello@nolimitdesigns.ca</p>
              </div>
            </a>
            <a href="https://calendly.com/hello-nolimitdesigns/30min?back=1&month=2026-05" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 rounded-xl border border-[#bebebe] hover:border-[#ff4f01] transition-all bg-white group">
              <div className="w-12 h-12 rounded-full bg-[#ff4f01]/10 flex items-center justify-center shrink-0 group-hover:bg-[#ff4f01] transition-colors">
                <i className="ri-calendar-line text-[#ff4f01] text-xl group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-medium font-bricolage">Book a Call</p>
                <p className="text-sm text-[rgb(119,119,125)]">Schedule a meeting</p>
              </div>
            </a>
            <div className="flex items-center gap-4 p-6 rounded-xl border border-[#bebebe] bg-white">
              <div className="w-12 h-12 rounded-full bg-[#ff4f01]/10 flex items-center justify-center shrink-0">
                <i className="ri-map-pin-line text-[#ff4f01] text-xl" />
              </div>
              <div>
                <p className="font-medium font-bricolage">Visit Us</p>
                <p className="text-sm text-[rgb(119,119,125)]">Edmonton, AB, Canada</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="lg:pb-24 pb-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-12">
            {/* Form */}
            <div className="bg-white rounded-2xl p-8 lg:p-10 border border-[#bebebe]">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="ri-check-line text-4xl text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold font-bricolage mb-4">Message Sent!</h3>
                  <p className="text-[rgb(119,119,125)] text-lg mb-6 max-w-md mx-auto">
                    Thank you for reaching out. Our team will review your project details and get back to you within 2 hours during business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", company: "", industry: "", selectedPackage: "", budget: "", message: "", services: [] });
                    }}
                    className="btn btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[#bebebe] focus:border-[#ff4f01] focus:ring-1 focus:ring-[#ff4f01] outline-none transition-all"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[#bebebe] focus:border-[#ff4f01] focus:ring-1 focus:ring-[#ff4f01] outline-none transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[#bebebe] focus:border-[#ff4f01] focus:ring-1 focus:ring-[#ff4f01] outline-none transition-all"
                        placeholder="(780) 555-0123"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Company Name</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[#bebebe] focus:border-[#ff4f01] focus:ring-1 focus:ring-[#ff4f01] outline-none transition-all"
                        placeholder="Your Company Inc."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Selected Package</label>
                    <select
                      value={formData.selectedPackage}
                      onChange={(e) => applySelectedPackage(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-[#bebebe] focus:border-[#ff4f01] focus:ring-1 focus:ring-[#ff4f01] outline-none transition-all"
                    >
                      <option value="">Select a package</option>
                      {pricingPackages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.title} - {pkg.investment}
                        </option>
                      ))}
                    </select>
                    {formData.selectedPackage && (
                      <p className="mt-2 text-sm text-[rgb(119,119,125)]">
                        This package was added from your pricing selection and will be included with your message.
                      </p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Industry</label>
                      <select
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[#bebebe] focus:border-[#ff4f01] focus:ring-1 focus:ring-[#ff4f01] outline-none transition-all"
                      >
                        <option value="">Select your industry</option>
                        {industries.map((ind) => (
                          <option key={ind.slug} value={ind.name}>{ind.name}</option>
                        ))}
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Budget Range</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[#bebebe] focus:border-[#ff4f01] focus:ring-1 focus:ring-[#ff4f01] outline-none transition-all"
                      >
                        <option value="">Select budget range</option>
                        {pricingPackages.map((pkg) => (
                          <option key={pkg.id} value={pkg.investment}>
                            {pkg.title}: {pkg.investment}
                          </option>
                        ))}
                        <option value="$2,000 - $5,000">$2,000 - $5,000</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                        <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                        <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                        <option value="$50,000+">$50,000+</option>
                      </select>
                    </div>
                  </div>

                  {/* Services Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Services Needed</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {serviceOptions.map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`px-4 py-3 rounded-lg text-sm font-medium transition-all border ${
                            formData.services.includes(service)
                              ? "bg-[#ff4f01] text-white border-[#ff4f01]"
                              : "bg-white text-[#101010] border-[#bebebe] hover:border-[#ff4f01]"
                          }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Project Details *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-[#bebebe] focus:border-[#ff4f01] focus:ring-1 focus:ring-[#ff4f01] outline-none transition-all resize-none"
                      placeholder="Tell us about your project, goals, and timeline..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full text-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <i className="ri-loader-4-line animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message <i className="ri-send-plane-line" />
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 border border-[#bebebe]">
                <h3 className="text-xl font-bold font-bricolage mb-4">Why Choose Us?</h3>
                <ul className="space-y-4">
                  {[
                    { icon: "ri-timer-line", text: "2-hour response time" },
                    { icon: "ri-money-dollar-circle-line", text: "Free consultation & quote" },
                    { icon: "ri-shield-check-line", text: "100% satisfaction guarantee" },
                    { icon: "ri-team-line", text: "Dedicated project manager" },
                    { icon: "ri-rocket-line", text: "Launch in 2-4 weeks" },
                    { icon: "ri-refresh-line", text: "Unlimited revisions" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#ff4f01]/10 flex items-center justify-center shrink-0">
                        <i className={`${item.icon} text-[#ff4f01]`} />
                      </div>
                      <span className="text-sm text-[#101010]">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#070707] to-[#1f1f1f] rounded-2xl p-8 text-center">
                <i className="ri-phone-line text-4xl text-[#ff4f01] mb-4" />
                <h3 className="text-xl font-bold font-bricolage text-white mb-2">Prefer to Talk?</h3>
                <p className="text-white/70 text-sm mb-4">
                  Call us directly for immediate assistance
                </p>
                <a href="tel:+15878826700" className="btn btn-primary w-full justify-center">
                  (587) 882-6700
                </a>
                <p className="text-white/50 text-xs mt-3">Mon-Fri 9am-6pm MST</p>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-[#bebebe]">
                <h3 className="text-xl font-bold font-bricolage mb-4">Office Hours</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[rgb(119,119,125)]">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[rgb(119,119,125)]">Saturday</span>
                    <span className="font-medium">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[rgb(119,119,125)]">Sunday</span>
                    <span className="font-medium text-red-500">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
