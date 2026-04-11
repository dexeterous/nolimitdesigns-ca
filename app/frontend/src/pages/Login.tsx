import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/client/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#fff6ec] flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-[#070707] to-[#1f1f1f] relative overflow-hidden flex-col justify-between p-12">
        <div>
          <a href="/" className="inline-block mb-16">
            <img src="/nolimit-logo.png" alt="NoLimit Designs" className="h-10 w-auto brightness-0 invert" />
          </a>
          <h1 className="font-bricolage font-semibold text-[48px] leading-[56px] text-white mb-6">
            Welcome Back to <span className="text-[#ff4f01]">Nolimit360</span>
          </h1>
          <p className="text-lg text-white/70 leading-8 max-w-md">
            Access your design dashboard, manage requests, and collaborate with your dedicated creative team.
          </p>

          <div className="mt-12 bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i key={star} className="ri-star-fill text-[#ff4f01]" />
                ))}
              </div>
            </div>
            <p className="text-white/80 italic leading-7 mb-4">
              "Nolimit360 has completely streamlined how we manage design work. Everything is in one place."
            </p>
            <p className="text-white/50 text-sm">— Marketing Director, SaaS Company</p>
          </div>
        </div>

        <div className="mt-auto">
          <p className="text-white/40 text-sm">© 2025 NoLimit Designs. All rights reserved.</p>
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff4f01]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff4f01]/5 rounded-full blur-3xl" />
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <a href="/">
              <img src="/nolimit-logo.png" alt="NoLimit Designs" className="h-8 w-auto" />
            </a>
          </div>

          <h2 className="font-bricolage font-semibold text-[32px] leading-[40px] text-[#101010] mb-2">
            Sign In
          </h2>
          <p className="text-[rgb(119,119,125)] mb-8">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#ff4f01] font-medium hover:underline">
              Start free trial
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#101010] mb-1.5">Email</label>
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

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-[#101010]">Password</label>
                <a href="#" className="text-sm text-[#ff4f01] hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(119,119,125)]" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
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

            <button type="submit" className="btn btn-primary w-full text-center !mb-0">
              Sign In
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#bebebe]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-[#fff6ec] px-4 text-[rgb(119,119,125)]">or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#bebebe] bg-white hover:border-[#ff4f01] transition-all text-sm font-medium text-[#101010] cursor-pointer"
              >
                <i className="ri-google-fill text-lg" />
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#bebebe] bg-white hover:border-[#ff4f01] transition-all text-sm font-medium text-[#101010] cursor-pointer"
              >
                <i className="ri-microsoft-fill text-lg" />
                Microsoft
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}