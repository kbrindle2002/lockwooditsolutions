// app/page.tsx
import Link from "next/link";
import { Card } from "../components/ui";

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-bold text-sky-400">{n}</div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight">
            Secure. Simple. <span className="text-sky-400">Ahead.</span>
          </h1>
          <p className="mt-5 text-slate-300 text-lg">
            We manage your Microsoft 365, Google, and AI so you can focus on customers — not tickets.
            Security-first, automation-led, and explained in plain English.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="px-5 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold">
              Book a consult
            </Link>
            <Link href="/pricing" className="px-5 py-3 rounded-2xl ring-1 ring-slate-700 hover:ring-slate-500">
              See plans
            </Link>
          </div>
          <div className="mt-6 text-xs text-slate-400">
            Serving Southeast Wisconsin & Northern Illinois • Remote-friendly across the Midwest
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Card><Stat n="231" label="Managed Devices" /></Card>
          <Card><Stat n="99.98%" label="Uptime (30d)" /></Card>
          <Card><Stat n="94" label="Secure Score" /></Card>
          <Card><Stat n="427" label="Patches Deployed" /></Card>
          <Card><Stat n="14m" label="Median Response" /></Card>
          <Card><Stat n="0" label="Critical Incidents" /></Card>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-slate-800 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-sm text-slate-400">
          <span>Microsoft 365</span>
          <span>Azure & Intune</span>
          <span>Defender for Business</span>
          <span>Compliance: HIPAA / PCI</span>
        </div>
      </section>

      {/* OFFER CARDS */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <div className="text-base font-semibold">Security & EDR</div>
          <p className="mt-1 text-sm text-slate-400">Defender/Huntress, phishing defense, DNS filtering, MFA everywhere.</p>
          <Link href="/services" className="inline-block mt-4 text-sm underline underline-offset-4">Learn more</Link>
        </Card>
        <Card>
          <div className="text-base font-semibold">Wi-Fi & Networking</div>
          <p className="mt-1 text-sm text-slate-400">Mesh Wi-Fi, router hardening, VLANs, site-to-site VPN, guest networks.</p>
          <Link href="/services" className="inline-block mt-4 text-sm underline underline-offset-4">Learn more</Link>
        </Card>
        <Card>
          <div className="text-base font-semibold">Cloud & Productivity</div>
          <p className="mt-1 text-sm text-slate-400">M365/Google admin, migrations, retention, and reliable backups.</p>
          <Link href="/services" className="inline-block mt-4 text-sm underline underline-offset-4">Learn more</Link>
        </Card>
        <Card>
          <div className="text-base font-semibold">Device Management</div>
          <p className="mt-1 text-sm text-slate-400">Windows, macOS, iOS/Android — setup, updates, lifecycle, zero-touch.</p>
          <Link href="/services" className="inline-block mt-4 text-sm underline underline-offset-4">Learn more</Link>
        </Card>
        <Card>
          <div className="text-base font-semibold">Family Controls</div>
          <p className="mt-1 text-sm text-slate-400">Parental filtering, identity monitoring, privacy coaching.</p>
          <Link href="/services" className="inline-block mt-4 text-sm underline underline-offset-4">Learn more</Link>
        </Card>
        <Card>
          <div className="text-base font-semibold">Helpdesk & Onboarding</div>
          <p className="mt-1 text-sm text-slate-400">Friendly support, rapid triage, and onboarding that just works.</p>
          <Link href="/services" className="inline-block mt-4 text-sm underline underline-offset-4">Learn more</Link>
        </Card>
      </section>

      {/* SPLIT CTA: HOME vs BUSINESS */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid gap-4 md:grid-cols-2">
        <Card>
          <div className="text-base font-semibold">For Homes</div>
          <p className="mt-1 text-sm text-slate-400">Protect your family’s devices, Wi-Fi, and smart home — stress-free.</p>
          <div className="mt-4 flex gap-3">
            <Link href="/pricing" className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-sm">Home plans</Link>
            <Link href="/landing" className="px-4 py-2 rounded-xl ring-1 ring-slate-600 text-sm">One-page overview</Link>
          </div>
        </Card>
        <Card>
          <div className="text-base font-semibold">For Small Business</div>
          <p className="mt-1 text-sm text-slate-400">Managed IT, security baselines, backups, and modern networking.</p>
          <div className="mt-4 flex gap-3">
            <Link href="/business" className="px-4 py-2 rounded-xl bg-white text-slate-900 text-sm">Explore business</Link>
            <Link href="/pricing#business" className="px-4 py-2 rounded-xl ring-1 ring-slate-600 text-sm">Business plans</Link>
          </div>
        </Card>
      </section>

      {/* TESTIMONIALS / SOCIAL PROOF */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold">What clients say</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card><p className="text-sm text-slate-300">“Fast, friendly, and my Wi-Fi finally works in every room.”</p><p className="mt-2 text-xs text-slate-500">— Homeowner, Mount Pleasant</p></Card>
          <Card><p className="text-sm text-slate-300">“They secured our M365 and trained staff. Zero phishing since.”</p><p className="mt-2 text-xs text-slate-500">— Dental Office, Kenosha</p></Card>
          <Card><p className="text-sm text-slate-300">“Clear pricing, great communication, no surprises.”</p><p className="mt-2 text-xs text-slate-500">— Contractor, Racine</p></Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold">FAQs</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card>
            <div className="text-base font-semibold">Do you come on-site?</div>
            <p className="mt-1 text-sm text-slate-400">Yes. Most issues are remote, but we schedule on-site when hands-on is best.</p>
          </Card>
          <Card>
            <div className="text-base font-semibold">Can you secure my smart home?</div>
            <p className="mt-1 text-sm text-slate-400">We segment IoT, harden routers, and set alerts for cameras/sensors.</p>
          </Card>
          <Card>
            <div className="text-base font-semibold">Do you support small teams?</div>
            <p className="mt-1 text-sm text-slate-400">Absolutely — see our business plans for security, backups, and helpdesk.</p>
          </Card>
          <Card>
            <div className="text-base font-semibold">Contracts?</div>
            <p className="mt-1 text-sm text-slate-400">Month-to-month. Transparent pricing. No surprise fees.</p>
          </Card>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-indigo-50/10 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-12 md:flex md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold">Ready to make tech headaches a thing of the past?</h3>
            <p className="text-slate-400 mt-1">Get protected today. Simple monthly plans, no long-term contracts.</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Link href="/contact" className="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-sm">Talk to us</Link>
            <Link href="/pricing" className="px-5 py-3 rounded-2xl ring-1 ring-slate-600 text-sm">View pricing</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
