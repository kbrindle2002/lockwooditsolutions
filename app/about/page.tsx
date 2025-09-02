import { Card } from "../../components/ui";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid gap-6 md:grid-cols-2">
      <div>
        <h1 className="text-3xl font-bold">About Lockwood IT Solutions</h1>
        <p className="text-slate-400 mt-3">
          We bring business‑grade reliability and security to homes and small businesses.
          Proactive protection, clear pricing, and real human support.
        </p>
        <Link href="/contact" className="inline-block mt-6 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700">Get in touch</Link>
      </div>
      <Card>
        <div className="text-base font-semibold">Fast facts</div>
        <ul className="text-sm text-slate-400 space-y-2 mt-2">
          <li>Based in Racine County, WI</li>
          <li>Residential & small business focus</li>
          <li>Same‑day remote support options</li>
          <li>Transparent, month‑to‑month plans</li>
        </ul>
      </Card>
    </div>
  );
}
