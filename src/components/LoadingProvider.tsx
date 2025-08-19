"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Loader from "./Loader";

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Show loader when route changes
    setIsLoading(true);

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {isLoading && <Loader />}
      {children}
    </>
  );
}
