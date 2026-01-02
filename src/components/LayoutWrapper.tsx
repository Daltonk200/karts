"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();

  // Check if current path is dashboard-related or auth-related
  const isDashboardPage = pathname?.startsWith("/dashboard");
  const isAuthPage = pathname?.startsWith("/auth");
  const isAccountPage = pathname?.startsWith("/account");

  return (
    <>
      {!isDashboardPage && !isAuthPage && !isAccountPage && <Navbar />}
      <main>{children}</main>
      {!isDashboardPage && !isAuthPage && !isAccountPage && <Footer />}
    </>
  );
}
