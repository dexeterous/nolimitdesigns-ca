import { Link, useLocation } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function LegalPage() {
  const location = useLocation();
  const isTerms = location.pathname.includes("terms");
  const title = isTerms ? "Terms of Service" : "Privacy Policy";
  const intro = isTerms
    ? "These terms outline how Nolimit Designs works with clients, proposals, project approvals, and ongoing support."
    : "This policy explains how Nolimit Designs handles contact details, project information, analytics, and website inquiries.";

  return (
    <div className="min-h-screen bg-[#fff6ec]">
      <SiteHeader />
      <main className="pt-[160px] pb-24">
        <div className="container-custom max-w-4xl">
          <span className="inline-flex items-center gap-2 border border-[#bebebe] py-2 px-5 rounded-full text-sm font-medium mb-4">
            <i className="ri-file-text-line text-[#ff4f01]" />
            Legal
          </span>
          <h1 className="font-bricolage font-semibold xl:text-[58px] xl:leading-[66px] text-[40px] leading-[48px] mb-5">
            {title}
          </h1>
          <p className="text-lg leading-8 text-[rgb(119,119,125)] mb-10">{intro}</p>
          <div className="rounded-2xl border border-[#bebebe] bg-white/70 p-8 space-y-6">
            {[
              ["Information we collect", "We collect information you choose to send through forms, project conversations, email, and analytics tools used to improve the website experience."],
              ["How we use information", "We use information to respond to inquiries, prepare quotes, manage projects, provide support, and improve our services."],
              ["Project and payment terms", "Project scope, pricing, timelines, and payment schedules are confirmed in writing before work begins."],
              ["Contact", "Questions about this page can be sent to hello@nolimitdesigns.com."],
            ].map(([heading, copy]) => (
              <section key={heading}>
                <h2 className="font-bricolage text-2xl font-semibold mb-2">{heading}</h2>
                <p className="text-[rgb(119,119,125)] leading-7">{copy}</p>
              </section>
            ))}
          </div>
          <Link to="/contact" className="btn btn-primary mt-8">
            Contact Nolimit Designs
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
