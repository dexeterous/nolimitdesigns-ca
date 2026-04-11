import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const plans = [
  { id: "graphics", name: "Nolimit Graphics", price: "CAD 1,040/mo" },
  { id: "graphics-video", name: "Nolimit Graphics + Video", price: "CAD 1,263.50/mo" },
  { id: "video", name: "Nolimit Video", price: "CAD 1,040/mo" },
];

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
    plan: "graphics-video",
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const value = target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value;
    setForm({ ...form, [target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/client/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#fff6ec] flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-[#070707] to-[#1f1f1f] relative overflow-hidden flex-col justify-between p-12">
        <div>
          <a href="/" className="inline-block mb-16">
            <img src="/nolimit-logo.png" alt="NoLimit Designs" className="h-10 w-auto brightness-0 invert" />
          </a>
          <h1 className="font-bricolage font-semibold text-[48px] leading-[56px] text-white mb-6">
            Start Creating <span className="text-[#ff4f01]">Without Limits</span>
          </h1>
          <p className="text-lg text-white/70 leading-8 max-w-md">
            Join hundreds of businesses using Nolimit360 to manage unlimited design requests with a dedicated creative team.
          </p>

          <div className="mt-12 space-y-6">
            {[
              { icon: "ri-infinity-line", text: "Unlimited design requests" },
              { icon: "ri-flashlight-line", text: "24-hour turnaround" },
              { icon: "ri-team-line", text: "Dedicated design team" },
              { icon: "ri-loop-left-line", text: "Unlimited revisions" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#ff4f01]/20 flex items-center justify-center shrink-0">
                  <i className={`${item.icon} text-[#ff4f01] text-xl`} />
                </div>
                <span className="text-white/80 text-base">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex items-center gap-6">
            {[
              { platform: "Google", rating: "4.7" },
              { platform: "Trustpilot", rating: "4.9" },
              { platform: "Clutch", rating: "4.9" },
            ].map((badge, i) => (
              <div key={i} className="text-center">
                <p className="text-[#ff4f01] font-bold text-lg font-bricolage">{badge.rating}</p>
                <p className="text-white/50 text-xs">{badge.platform}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff4f01]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff4f01]/5 rounded-full blur-3xl" />
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8">
            <a href="/">
              <img src="/nolimit-logo.png" alt="NoLimit Designs" className="h-8 w-auto" />
            </a>
          </div>

          <h2 className="font-bricolage font-semibold text-[32px] leading-[40px] text-[#101010] mb-2">
            Start Your Free Trial
          </h2>
          <p className="text-[rgb(119,119,125)] mb-8">
            Already have an account?{" "}
            <Link to="/login" className="text-[#ff4f01] font-medium hover:underline">
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-[#101010] mb-1.5">Full Name</label>
              <div className="relative">
                <i className="ri-user-line absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(119,119,125)]" />
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="John Smith"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#bebebe] bg-white text-[#101010] placeholder:text-[rgb(119,119,125)]/50 focus:outline-none focus:border-[#ff4f01] transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#101010] mb-1.5">Work Email</label>
              <div className="relative">
                <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(119,119,125)]" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#bebebe] bg-white text-[#101010] placeholder:text-[rgb(119,119,125)]/50 focus:outline-none focus:border-[#ff4f01] transition-colors"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-[#101010] mb-1.5">Company Name</label>
              <div className="relative">
                <i className="ri-building-line absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(119,119,125)]" />
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Acme Inc."
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#bebebe] bg-white text-[#101010] placeholder:text-[rgb(119,119,125)]/50 focus:outline-none focus:border-[#ff4f01] transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#101010] mb-1.5">Password</label>
              <div className="relative">
                <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(119,119,125)]" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                  minLength={8}
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-[#bebebe] bg-white text-[#101010] placeholder:text-[rgb(119,119,125)]/50 focus:outline-none focus:border-[#ff4f01] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgb(119,119,125)] hover:text-[#ff4f01] transition-colors cursor-pointer"
                >
                  <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"} />
                </button>
              </div>
            </div>

            {/* Plan Selection */}
            <div>
              <label className="block text-sm font-medium text-[#101010] mb-1.5">Select Plan</label>
              <div className="space-y-2">
                {plans.map((plan) => (
                  <label
                    key={plan.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                      form.plan === plan.id
                        ? "border-[#ff4f01] bg-[#ff4f01]/5"
                        : "border-[#bebebe] bg-white hover:border-[#ff4f01]/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="plan"
                      value={plan.id}
                      checked={form.plan === plan.id}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        form.plan === plan.id ? "border-[#ff4f01]" : "border-[#bebebe]"
                      }`}
                    >
                      {form.plan === plan.id && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff4f01]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-[#101010]">{plan.name}</span>
                    </div>
                    <span className="text-sm font-medium text-[#ff4f01]">{plan.price}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={form.agreeTerms}
                onChange={handleChange}
                required
                className="mt-1 w-4 h-4 rounded border-[#bebebe] text-[#ff4f01] focus:ring-[#ff4f01] cursor-pointer"
              />
              <span className="text-sm text-[rgb(119,119,125)]">
                I agree to the{" "}
                <a href="#" className="text-[#ff4f01] hover:underline">Terms of Service</a>{" "}
                and{" "}
                <a href="#" className="text-[#ff4f01] hover:underline">Privacy Policy</a>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-full text-center !mb-0"
            >
              Start Free Trial
            </button>

            <p className="text-center text-xs text-[rgb(119,119,125)]">
              No credit card required • Cancel anytime
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}