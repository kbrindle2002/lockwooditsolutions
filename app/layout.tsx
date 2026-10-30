import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Lockwood IT Solutions | Managed IT for Small Business",
    template: "%s | Lockwood IT Solutions",
  },
  description:
    "Security-first managed IT, Microsoft 365 administration, cybersecurity, backup, networking, and technology advisory for small businesses.",
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: "Lockwood IT Solutions | Secure. Smart. Scalable.",
    description:
      "Founder-led, security-first managed IT for small businesses in Southeast Wisconsin and Northern Illinois.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lockwood IT Solutions | Secure. Smart. Scalable.",
    description: "Managed IT that keeps your business working and your data protected.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#082b59",
  colorScheme: "light",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: site.name,
  url: site.url,
  logo: `${site.url}/lockwood-logo-approved.png`,
  email: site.email,
  telephone: site.phoneHref,
  slogan: site.tagline,
  sameAs: [site.social.linkedin],
  founder: {
    "@type": "Person",
    name: "Kelly L. Lockwood",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Southeast Wisconsin" },
    { "@type": "AdministrativeArea", name: "Northern Illinois" },
    { "@type": "AdministrativeArea", name: "Midwest United States" },
  ],
  knowsAbout: [
    "Managed IT services",
    "Cybersecurity",
    "Microsoft 365",
    "Cloud administration",
    "Business continuity",
    "Computer networking",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <a
          href="#main-content"
          className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-lg bg-slate-950 px-4 py-2 font-semibold text-white transition focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="outline-none">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
