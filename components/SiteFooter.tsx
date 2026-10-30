import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { services, site } from "@/lib/site";
function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="mt-24 bg-[#082b59] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-flex rounded-2xl bg-white p-1 shadow-sm">
              <Image
                src="/lockwood-mark-approved.png"
                alt=""
                width={512}
                height={477}
                className="h-14 w-14 object-contain"
              />
            </span>
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
            <li><Link href="/why-lockwood/" className="text-blue-50 hover:text-white hover:underline">Why LIT</Link></li>
            <li><Link href="/who-we-help/" className="text-blue-50 hover:text-white hover:underline">Who We Help</Link></li>
            <li><Link href="/resources/" className="text-blue-50 hover:text-white hover:underline">Resources</Link></li>
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
            <li>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                aria-label="Visit Lockwood IT Solutions on LinkedIn"
              >
                <LinkedInIcon className="h-4 w-4 shrink-0" />
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <Link
                href="/contact/#service-area-map"
                className="flex items-start gap-3 transition hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                aria-label="View the Lockwood IT Solutions service area map"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{site.serviceArea}<br />{site.remoteArea}</span>
              </Link>
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
