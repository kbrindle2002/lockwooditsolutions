import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">404</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">This page could not be found</h1>
      <p className="mt-4 text-lg leading-8 text-slate-600">
        The address may have changed, or the page may no longer be available. Use the navigation above or return to the home page.
      </p>
      <Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Return home
      </Link>
    </section>
  );
}
