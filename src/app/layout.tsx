import type { Metadata } from "next";
import { Outfit, Caveat } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Toaster } from "react-hot-toast";
import PageLoader from "@/components/PageLoader";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "GlowBeauty - Premium Cosmetics & Skincare",
  description:
    "Discover luxury cosmetics, skincare, and makeup products for your beauty routine",
  icons: {
    icon: "/glow_logo.png",
    shortcut: "/glow_logo.png",
    apple: "/glow_logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} ${caveat.variable} ${outfit.variable} bg-white text-zinc-900`}
      >
        <LayoutWrapper>
          {children}
          {/* <PageLoader /> */}
        </LayoutWrapper>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#fff",
              color: "#18181b",
              border: "1px solid #e4e4e7",
              borderRadius: "0",
              fontSize: "14px",
              fontWeight: "500",
            },
            success: {
              iconTheme: {
                primary: "#16a34a",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#dc2626",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
