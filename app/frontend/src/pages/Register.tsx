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

      {/* Right Panel - Registration */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md text-center">
          <div className="lg:hidden mb-8">
            <a href="/">
              <img src="/nolimit-logo.png" alt="NoLimit Designs" className="h-8 w-auto mx-auto" />
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

          <div className="bg-white rounded-2xl border border-[#e5e5e5] p-8 mb-6">
            <div className="space-y-4 mb-6">
              {[
                { id: "graphics", name: "Nolimit Graphics", price: "CAD 1,040/mo" },
                { id: "graphics-video", name: "Nolimit Graphics + Video", price: "CAD 1,263.50/mo" },
                { id: "video", name: "Nolimit Video", price: "CAD 1,040/mo" },
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
              Get Started — Sign Up
            </button>
          </div>

          <p className="text-center text-xs text-[rgb(119,119,125)]">
            No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}