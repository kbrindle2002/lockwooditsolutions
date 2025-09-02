import { Card } from "../../components/ui";
import Link from "next/link";

export default function BusinessPage() {
  const items = [
    { t: "Cybersecurity & EDR", d: "Defender for Business/Huntress, MFA everywhere, baselines." },
    { t: "Cloud & Productivity", d: "M365 admin, migrations, retention, backup for M365." },
    { t: "Networking", d: "Business routers, VLANs, guest Wi‑Fi, site‑to‑site VPN." },
    { t: "Helpdesk & Onboarding", d: "Zero‑touch provisioning (Intune), device lifecycle." }
  ];
  return (
    <>
      <div className="bg-gradient-to-br from-slate-900 via-indigo-800 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <h1 className="text-3xl md:text-4xl font-bold">Business IT that just works.</h1>
          <p className="mt-3 text-white/80 max-w-2xl">We manage your devices, cloud apps, security, and network so you can focus on customers — not IT fires.</p>
          <div className="mt-6 flex gap-3">
            <Link href="/pricing" className="px-4 py-2 rounded-xl bg-white text-slate-900">See Business Plans</Link>
            <Link href="/contact" className="px-4 py-2 rounded-xl ring-1 ring-white/30">Talk to an Expert</Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-4 md:grid-cols-2">
        {items.map((x) => (
          <Card key={x.t}>
            <div className="text-base font-semibold">{x.t}</div>
            <div className="text-sm text-slate-400 mt-1">{x.d}</div>
          </Card>
        ))}
      </div>
    </>
  );
}
