"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Loader from "./Loader";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Show loader when route changes
    setIsLoading(true);

    // Hide loader after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading) return null;

  return <Loader />;
}
