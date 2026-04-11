import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const { login, isAuthenticated } = useAuth();

  const handleLogin = async () => {
    await login();
  };

  if (isAuthenticated) {
    window.location.href = "/client/dashboard";
    return null;
  }

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
        <div className="w-full max-w-md text-center">
          <div className="lg:hidden mb-8">
            <a href="/">
              <img src="/nolimit-logo.png" alt="NoLimit Designs" className="h-8 w-auto mx-auto" />
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

          <button
            onClick={handleLogin}
            className="btn btn-primary w-full text-center !mb-0"
          >
            <i className="ri-login-box-line mr-2" />
            Sign In with SSO
          </button>

          <p className="text-center text-xs text-[rgb(119,119,125)] mt-6">
            Secure single sign-on authentication
          </p>
        </div>
      </div>
    </div>
  );
}