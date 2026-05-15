import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { industries } from "@/data/siteData";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    budget: "",
    message: "",
    services: [] as string[],
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
            <a href="tel:+17809001234" className="flex items-center gap-4 p-6 rounded-xl border border-[#bebebe] hover:border-[#ff4f01] transition-all bg-white group">
              <div className="w-12 h-12 rounded-full bg-[#ff4f01]/10 flex items-center justify-center shrink-0 group-hover:bg-[#ff4f01] transition-colors">
                <i className="ri-phone-line text-[#ff4f01] text-xl group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-medium font-bricolage">Call Us</p>
                <p className="text-sm text-[rgb(119,119,125)]">(780) 900-1234</p>
              </div>
            </a>
            <a href="mailto:hello@nolimitdesigns.com" className="flex items-center gap-4 p-6 rounded-xl border border-[#bebebe] hover:border-[#ff4f01] transition-all bg-white group">
              <div className="w-12 h-12 rounded-full bg-[#ff4f01]/10 flex items-center justify-center shrink-0 group-hover:bg-[#ff4f01] transition-colors">
                <i className="ri-mail-line text-[#ff4f01] text-xl group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-medium font-bricolage">Email Us</p>
                <p className="text-sm text-[rgb(119,119,125)]">hello@nolimitdesigns.com</p>
              </div>
            </a>
            <button type="button" className="flex items-center gap-4 p-6 rounded-xl border border-[#bebebe] hover:border-[#ff4f01] transition-all bg-white group text-left">
              <div className="w-12 h-12 rounded-full bg-[#ff4f01]/10 flex items-center justify-center shrink-0 group-hover:bg-[#ff4f01] transition-colors">
                <i className="ri-chat-1-line text-[#ff4f01] text-xl group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-medium font-bricolage">Live Chat</p>
                <p className="text-sm text-[rgb(119,119,125)]">Chat with us now</p>
              </div>
            </button>
            <button type="button" className="flex items-center gap-4 p-6 rounded-xl border border-[#bebebe] hover:border-[#ff4f01] transition-all bg-white group text-left">
              <div className="w-12 h-12 rounded-full bg-[#ff4f01]/10 flex items-center justify-center shrink-0 group-hover:bg-[#ff4f01] transition-colors">
                <i className="ri-calendar-line text-[#ff4f01] text-xl group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-medium font-bricolage">Book a Call</p>
                <p className="text-sm text-[rgb(119,119,125)]">Schedule a meeting</p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="lg:py-16 py-8">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[60%_40%] gap-12">
            {/* Form */}
            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-[#eee]">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <i className="ri-check-line text-green-600 text-4xl" />
                  </div>
                  <h3 className="font-bricolage text-3xl font-bold mb-4">Thank You!</h3>
                  <p className="text-[rgb(119,119,125)] text-lg mb-2">
                    We&apos;ve received your message and will get back to you within 2 hours.
                  </p>
                  <p className="text-sm text-[rgb(119,119,125)]">
                    In the meantime, feel free to call us at (780) 900-1234.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="font-bricolage text-2xl font-bold mb-6">Tell Us About Your Project</h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[#ccc] focus:border-[#ff4f01] focus:outline-none transition-colors"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[#ccc] focus:border-[#ff4f01] focus:outline-none transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[#ccc] focus:border-[#ff4f01] focus:outline-none transition-colors"
                        placeholder="(780) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[#ccc] focus:border-[#ff4f01] focus:outline-none transition-colors"
                        placeholder="Your Company Name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Industry</label>
                      <select
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[#ccc] focus:border-[#ff4f01] focus:outline-none transition-colors bg-white"
                      >
                        <option value="">Select your industry</option>
                        {industries.map((ind) => (
                          <option key={ind.slug} value={ind.slug}>{ind.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Budget Range</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[#ccc] focus:border-[#ff4f01] focus:outline-none transition-colors bg-white"
                      >
                        <option value="">Select budget range</option>
                        <option value="2500-5000">$2,500 - $5,000</option>
                        <option value="5000-10000">$5,000 - $10,000</option>
                        <option value="10000-15000">$10,000 - $15,000</option>
                        <option value="15000+">$15,000+</option>
                      </select>
                    </div>
                  </div>

                  {/* Services checkboxes */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Services Needed</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {serviceOptions.map((svc) => (
                        <label
                          key={svc}
                          className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                            formData.services.includes(svc)
                              ? "border-[#ff4f01] bg-[#ff4f01]/5"
                              : "border-[#ccc] hover:border-[#ff4f01]/50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.services.includes(svc)}
                            onChange={() => toggleService(svc)}
                            className="accent-[#ff4f01]"
                          />
                          <span className="text-sm">{svc}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Project Details</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-[#ccc] focus:border-[#ff4f01] focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your project, goals, and timeline..."
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-full text-center">
                    Send Message &amp; Get Free Quote
                  </button>
                  <p className="text-center text-xs text-[rgb(119,119,125)] mt-3">
                    We respond within 2 hours during business hours. No spam, ever.
                  </p>
                </form>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Office Info */}
              <div className="bg-white rounded-2xl p-8 border border-[#eee]">
                <h4 className="font-bricolage text-xl font-bold mb-4">Our Office</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <i className="ri-map-pin-line text-[#ff4f01] text-xl mt-0.5" />
                    <div>
                      <p className="font-medium">Edmonton, Alberta</p>
                      <p className="text-sm text-[rgb(119,119,125)]">Serving all of Edmonton Metro</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="ri-time-line text-[#ff4f01] text-xl mt-0.5" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-sm text-[rgb(119,119,125)]">Mon-Fri: 9am - 6pm MST</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="ri-reply-line text-[#ff4f01] text-xl mt-0.5" />
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-sm text-[rgb(119,119,125)]">Within 2 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-gradient-to-br from-[#070707] to-[#1f1f1f] rounded-2xl p-8 text-white">
                <h4 className="font-bricolage text-xl font-bold mb-4">Why Choose Nolimit?</h4>
                <div className="space-y-3">
                  {[
                    "100+ projects delivered",
                    "20+ industries served",
                    "Local Edmonton team",
                    "Free consultation included",
                    "No obligation quotes",
                    "2-4 week delivery",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <i className="ri-check-line text-[#ff4f01]" />
                      <span className="text-white/80 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Calendar Placeholder */}
              <div className="bg-white rounded-2xl p-8 border border-[#eee] text-center">
                <i className="ri-calendar-check-line text-4xl text-[#ff4f01] mb-3 inline-block" />
                <h4 className="font-bricolage text-lg font-bold mb-2">Book a Discovery Call</h4>
                <p className="text-sm text-[rgb(119,119,125)] mb-4">
                  Schedule a 30-minute call to discuss your project.
                </p>
                <button type="button" className="btn btn-dark w-full text-center text-sm !py-3">
                  <i className="ri-calendar-line mr-2" />
                  Choose a Time Slot
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Widget (Fixed) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          className="w-14 h-14 rounded-full bg-[#ff4f01] text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
          title="Chat with us"
        >
          <i className="ri-chat-3-fill text-2xl" />
        </button>
      </div>

      <SiteFooter />
    </div>
  );
}