import "./globals.css";
import Link from "next/link";
import {
  Home as HomeIcon, Layers, BadgeDollarSign, LifeBuoy, Info, Mail,
  ShieldCheck, ScrollText
} from "lucide-react";
import NavIconLink from "@/components/NavIconLink";

export const metadata = {
  metadataBase: new URL("https://lockwooditsolutions.com"),
  title: "Lockwood IT Solutions",
  description: "Residential & Business Managed IT • Microsoft 365 • Azure • Intune",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-[#0a1a2f] text-white sticky top-0 z-50 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="font-semibold">Lockwood IT Solutions</Link>
   			<nav className="hidden md:flex items-center gap-1">
				<NavIconLink href="/"         label="Home"     icon="home" />
				<NavIconLink href="/services" label="Services" icon="services" />
				<NavIconLink href="/plans"    label="Plans"    icon="plans" />
				<NavIconLink href="/support"  label="Support"  icon="support" />
				<NavIconLink href="/about"    label="About Us"    icon="about" />
				<NavIconLink href="/contact"  label="Contact Us"  icon="contact" />
			</nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-[#0a1a2f] text-white mt-16">
  <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3 text-sm text-white/80">
    {/* Company summary */}
    <div>
      <div className="font-semibold">Lockwood IT Solutions</div>
      <p className="mt-2">Residential & Small Business IT you can trust.</p>
    </div>

    {/* Links */}
    <div>
      <div className="font-semibold">Links</div>
      <ul className="space-y-2">
        <li><NavIconLink href="/"         label="Home"            icon="home" /></li>
        <li><NavIconLink href="/services" label="Services"        icon="services" /></li>
        <li><NavIconLink href="/plans"    label="Plans"           icon="plans" /></li>
        <li><NavIconLink href="/support"  label="Support"         icon="support" /></li>
        <li><NavIconLink href="/about"    label="About Us"           icon="about" /></li>
        <li><NavIconLink href="/contact"  label="Contact Us"         icon="contact" /></li>
      </ul>
    </div>

    {/* Contact info */}
    <div>
      <div className="font-semibold">Contact Us</div>
      <p className="mt-2">(262) 417-2461</p>
      <p>contact@lockwooditsolutions.com</p>
    </div>
  </div>

  {/* Bottom bar with quick links */}
  <div className="border-t border-white/10 text-xs text-white/60 px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
    <span>© 2025 Lockwood IT Solutions. All rights reserved.</span>
    <div className="flex gap-4">
      <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
      <Link href="/terms" className="hover:underline">Terms of Service</Link>
    </div>
  </div>
</footer>


      </body>
    </html>
  );
}