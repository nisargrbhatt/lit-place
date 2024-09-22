import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import Layout from "@/components/layout/Layout";

const siteFont = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-family",
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Literature Place",
  description: "Share your literature with the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          siteFont.className,
          siteFont.variable
        )}
        suppressHydrationWarning
      >
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </head>
        <Layout>{children}</Layout>
      </html>
    </ClerkProvider>
  );
}
