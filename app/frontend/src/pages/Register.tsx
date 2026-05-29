import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Register() {
  const { login, isAuthenticated } = useAuth();

  const handleRegister = async () => {
    await login();
  };

  if (isAuthenticated) {
    window.location.href = "/client/dashboard";
    return null;
  }

  return (
    <div className="min-h-screen bg-[#fff6ec] flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-[#070707] to-[#1f1f1f] relative overflow-hidden flex-col justify-between p-12">
        <div>
          <a href="/" className="inline-block mb-16">
            <img src="/nolimit-logo.png" alt="NoLimit Designs" className="h-10 w-auto brightness-0 invert" />
          </a>
          <h1 className="font-bricolage font-semibold text-[48px] leading-[56px] text-white mb-6">
            Start Your Website <span className="text-[#ff4f01]">Project</span>
          </h1>
          <p className="text-lg text-white/70 leading-8 max-w-md">
            Work with an Edmonton web development team to plan, build, launch, and support your website.
          </p>

          <div className="mt-12 space-y-6">
            {[
              { icon: "ri-code-s-slash-line", text: "Custom website development" },
              { icon: "ri-search-line", text: "SEO-ready structure" },
              { icon: "ri-team-line", text: "Dedicated project support" },
              { icon: "ri-rocket-line", text: "Launch and maintenance help" },
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

      {/* Right Panel - Registration */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md text-center">
          <div className="lg:hidden mb-8">
            <a href="/">
              <img src="/nolimit-logo.png" alt="NoLimit Designs" className="h-8 w-auto mx-auto" />
            </a>
          </div>

          <h2 className="font-bricolage font-semibold text-[32px] leading-[40px] text-[#101010] mb-2">
            Request Project Access
          </h2>
          <p className="text-[rgb(119,119,125)] mb-8">
            Already have an account?{" "}
            <Link to="/login" className="text-[#ff4f01] font-medium hover:underline">
              Sign in
            </Link>
          </p>

          <div className="bg-white rounded-2xl border border-[#e5e5e5] p-8 mb-6">
            <div className="space-y-4 mb-6">
              {[
                { id: "starter", name: "Starter Website", price: "From $1,600" },
                { id: "professional", name: "Professional Website", price: "$1,800 - $5,000" },
                { id: "ecommerce", name: "E-Commerce Store", price: "$4,500 - $7,000" },
              ].map((plan) => (
                <div
                  key={plan.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9]"
                >
                  <span className="text-sm font-medium text-[#101010]">{plan.name}</span>
                  <span className="text-sm font-medium text-[#ff4f01]">{plan.price}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleRegister}
              className="btn btn-primary w-full text-center !mb-0"
            >
              <i className="ri-user-add-line mr-2" />
              Continue with SSO
            </button>
          </div>

          <p className="text-center text-xs text-[rgb(119,119,125)]">
            Project workspace access is provided after onboarding.
          </p>
        </div>
      </div>
    </div>
  );
}
