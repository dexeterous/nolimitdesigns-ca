import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const RouteProgressBar = () => {
  const { pathname } = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (prevPathRef.current === pathname) return;
    prevPathRef.current = pathname;

    // Start progress
    setVisible(true);
    setProgress(30);

    // Simulate progress
    timeoutRef.current = setTimeout(() => {
      setProgress(70);
    }, 100);

    const completeTimeout = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
    }, 300);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      clearTimeout(completeTimeout);
    };
  }, [pathname]);

  if (!visible && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-[#ff4f01] transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transition: progress === 100
            ? 'width 200ms ease-out, opacity 300ms ease-in 200ms'
            : 'width 300ms ease-out',
        }}
      />
    </div>
  );
};

export default RouteProgressBar;