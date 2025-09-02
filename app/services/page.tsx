import { Card } from "../../components/ui";

export default function ServicesPage() {
  const items = [
    { t: "Security & EDR", d: "Endpoint protection, phishing defense, DNS filtering." },
    { t: "Wi‑Fi & Networking", d: "Mesh Wi‑Fi, router hardening, VLANs, VPN/SD‑WAN." },
    { t: "Device Mgmt", d: "Windows, macOS, iOS/Android — setup, updates, troubleshooting." },
    { t: "Cloud & Productivity", d: "Microsoft 365 / Google Workspace, backups, admin." },
    { t: "Family Controls", d: "Content filtering, identity monitoring, privacy coaching." }
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Services</h1>
      <p className="text-slate-400 mt-2">Residential & Small Business plans to fit your needs.</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {items.map((x) => (
          <Card key={x.t}>
            <div className="text-base font-semibold">{x.t}</div>
            <div className="text-sm text-slate-400 mt-1">{x.d}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
