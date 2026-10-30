"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation, site } from "@/lib/site";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4"
          aria-label="Lockwood IT Solutions home"
        >
          <Image
            src="/lockwood-logo.svg"
            alt="Lockwood IT Solutions — Secure. Smart. Scalable."
            width={693}
            height={220}
            priority
            className="h-auto w-[205px] sm:w-[235px]"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navigation.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                  active
                    ? "bg-blue-50 text-blue-800"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${site.phoneHref}`}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {site.phoneDisplay}
          </a>
          <Link
            href="/contact/"
            className="rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            Schedule an assessment
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 text-slate-800 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <div id="mobile-navigation" className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1" aria-label="Mobile navigation">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-xl px-4 py-3 text-base font-medium ${
                    active ? "bg-blue-50 text-blue-800" : "text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href="/support/" className="rounded-xl px-4 py-3 text-base font-medium text-slate-800 hover:bg-slate-100">
              Client Support
            </Link>
            <div className="mt-3 grid gap-2 border-t border-slate-200 pt-4 sm:grid-cols-2">
              <a
                href={`tel:${site.phoneHref}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 font-semibold text-slate-800"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.phoneDisplay}
              </a>
              <Link href="/contact/" className="rounded-xl bg-blue-700 px-4 py-3 text-center font-semibold text-white">
                Schedule an assessment
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
