import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function PageLoadSpinner() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    const timer = window.setTimeout(() => setIsVisible(false), 520);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#fff6ec]/95 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-[#101010]/15 border-t-[#ff4f01]" />
        <img src="/nolimit-logo.png" alt="Nolimit Designs" className="h-9 w-auto" />
      </div>
    </div>
  );
}
