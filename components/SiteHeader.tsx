"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Mail, MapPin, Menu, Phone, X } from "lucide-react";
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
    <header className="sticky top-0 z-50 shadow-sm">
      <div className="bg-[#082b59] text-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-2 text-xs sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-4 sm:gap-6">
            <a
              href={`tel:${site.phoneHref}`}
              className="inline-flex shrink-0 items-center gap-2 font-semibold text-blue-50 transition hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{site.phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="hidden min-w-0 items-center gap-2 text-blue-50 transition hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:inline-flex"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{site.email}</span>
            </a>
          </div>
          <Link
            href="/contact/#service-area-map"
            className="hidden items-center gap-2 rounded-md text-blue-100 transition hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 lg:flex"
            aria-label="View the Lockwood IT Solutions service area map"
          >
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Racine, WI <span aria-hidden="true">•</span> Serving Southeast Wisconsin</span>
          </Link>
        </div>
      </div>

      <div className="border-b border-slate-200/90 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-24 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4"
            aria-label="Lockwood IT Solutions home"
          >
            <Image
              src="/lockwood-logo-approved.png"
              alt="Lockwood IT Solutions — Secure. Smart. Scalable."
              width={1200}
              height={346}
              priority
              sizes="(max-width: 640px) 230px, (max-width: 1280px) 270px, 290px"
              className="h-auto w-[230px] sm:w-[270px] xl:w-[290px]"
            />
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary navigation">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    active
                      ? "bg-blue-50 text-blue-800"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <Link
            href="/contact/"
            className="hidden items-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 xl:inline-flex"
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Schedule an IT Assessment
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-300 text-slate-800 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 xl:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>

        {open && (
          <div id="mobile-navigation" className="border-t border-slate-200 bg-white px-4 py-4 xl:hidden">
            <nav className="mx-auto grid max-w-7xl gap-1" aria-label="Mobile navigation">
              {navigation.map((item) => {
                const active = isActive(pathname, item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium ${
                      active ? "bg-blue-50 text-blue-800" : "text-slate-800 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <div className="mt-3 grid gap-2 border-t border-slate-200 pt-4 sm:grid-cols-2">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 font-semibold text-slate-800"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Email us
                </a>
                <Link
                  href="/contact/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-center font-semibold text-white"
                >
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                  Schedule an assessment
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
