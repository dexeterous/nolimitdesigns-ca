import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fff6ec]">
      <SiteHeader />
      <main className="pt-[160px] pb-24 text-center">
        <div className="container-custom">
          <p className="text-[#ff4f01] font-bold uppercase tracking-[0.25em] mb-3">404</p>
          <h1 className="font-bricolage text-5xl font-semibold mb-4">Page not found</h1>
          <p className="text-[rgb(119,119,125)] max-w-xl mx-auto mb-8">
            The page you opened does not exist, but the main service and portfolio pages are ready.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn btn-primary">Go Home</Link>
            <Link to="/sitemap" className="btn btn-dark">View Sitemap</Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
