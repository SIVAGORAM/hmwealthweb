import type { Metadata, Viewport } from "next";
import "@fontsource-variable/plus-jakarta-sans/wght.css";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: Mutual Funds, SIP, Insurance and Gold`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { title: `${site.name}, ${site.tagline}`, description: site.description, url: site.url, siteName: site.name, locale: "en_IN", type: "website" },
};

export const viewport: Viewport = { themeColor: "#0b7a55" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <body className="min-h-screen">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
