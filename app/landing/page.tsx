import Link from "next/link";
import { Card } from "../../components/ui";

export default function LandingPage() {
  const services = [
    ["Cybersecurity","Endpoint protection, DNS filtering, backups"],
    ["Whole‑Home Wi‑Fi","Mesh coverage, parental controls, speed tuning"],
    ["Smart Home & IoT","Secure cameras, thermostats, speakers"],
    ["Cloud & Productivity","M365 & Google support, backups"],
    ["Networking","Routers, firewalls, VLANs, VPN/SD‑WAN"],
    ["Helpdesk","Remote support, onboarding, device setup"]
  ];
  return (
    <div className="bg-slate-50/0">
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <h1 className="text-4xl md:text-5xl font-bold max-w-2xl">Residential & Small Business IT Made Simple</h1>
          <p className="mt-4 text-white/80 max-w-xl">
            Wi‑Fi that works. Devices that stay protected. Business tech that just runs.
          </p>
          <div className="mt-6 flex gap-3">
            <Link className="px-4 py-2 rounded-xl bg-white text-slate-900" href="/pricing">See Plans</Link>
            <Link className="px-4 py-2 rounded-xl ring-1 ring-white/30" href="/contact">Get Started</Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map(([t,d]) => (
          <Card key={t}>
            <div className="text-base font-semibold">{t}</div>
            <div className="text-sm text-slate-400 mt-1">{d}</div>
          </Card>
        ))}
      </div>
      <div className="bg-indigo-50/10">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-2">Simple Plans</h2>
          <p className="text-slate-400 mb-6">Residential from $29/mo. Business from $59/user.</p>
          <Link className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700" href="/pricing">View Pricing</Link>
        </div>
      </div>
    </div>
  );
}
