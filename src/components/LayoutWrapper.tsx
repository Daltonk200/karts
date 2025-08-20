"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();

  // Check if current path is dashboard-related
  const isDashboardPage = pathname?.startsWith("/dashboard");

  return (
    <>
      {!isDashboardPage && <Navbar />}
      <main>{children}</main>
      {!isDashboardPage && <Footer />}
    </>
  );
}
