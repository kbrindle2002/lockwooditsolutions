import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { services, site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="mt-24 bg-[#082b59] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/lockwood-mark.svg" alt="" width={256} height={256} className="h-14 w-14" />
            <div>
              <p className="text-lg font-bold">{site.name}</p>
              <p className="text-sm text-blue-100">{site.tagline}</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-blue-100">
            Founder-led, security-first managed IT for small businesses that need dependable support, stronger protection, and technology explained clearly.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-200">Services</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {services.slice(0, 4).map((item) => (
              <li key={item.slug}>
                <Link href={`/services/${item.slug}/`} className="text-blue-50 transition hover:text-white hover:underline">
                  {item.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-200">Company</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/why-lockwood/" className="text-blue-50 hover:text-white hover:underline">Why Lockwood</Link></li>
            <li><Link href="/who-we-help/" className="text-blue-50 hover:text-white hover:underline">Who We Help</Link></li>
            <li><Link href="/resources/" className="text-blue-50 hover:text-white hover:underline">Resources &amp; FAQ</Link></li>
            <li><Link href="/support/" className="text-blue-50 hover:text-white hover:underline">Client Support</Link></li>
            <li><Link href="/contact/" className="text-blue-50 hover:text-white hover:underline">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-200">Get in touch</h2>
          <ul className="mt-4 space-y-4 text-sm text-blue-50">
            <li>
              <a href={`tel:${site.phoneHref}`} className="flex items-start gap-3 transition hover:text-white">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{site.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-start gap-3 break-all transition hover:text-white">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{site.email}</span>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{site.serviceArea}<br />{site.remoteArea}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-blue-100 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/privacy/" className="hover:text-white hover:underline">Privacy Policy</Link>
            <Link href="/terms/" className="hover:text-white hover:underline">Website Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
