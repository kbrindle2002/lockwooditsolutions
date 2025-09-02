import { Card } from "../../components/ui";

function Plan({ name, price, features, highlight=false }: any) {
  return (
    <Card className={highlight ? "ring-2 ring-sky-500" : ""}>
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">{name}</div>
        {highlight && <span className="text-xs px-2 py-0.5 rounded bg-sky-600/30">Popular</span>}
      </div>
      <div className="mt-3 text-3xl font-bold">{price}</div>
      <div className="text-xs text-slate-400 mb-3">per month</div>
      <ul className="text-sm text-slate-300 space-y-1">
        {features.map((f: string) => <li key={f}>• {f}</li>)}
      </ul>
    </Card>
  );
}

export default function PlansPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Plans & Pricing</h1>
      <p className="text-slate-400 mt-2">Simple, transparent pricing. No contracts required.</p>
      <h2 className="text-xl font-semibold mt-8">Residential</h2>
      <div className="grid gap-4 lg:grid-cols-3 mt-4">
        <Plan name="Basic Home Care" price="$29" features={["AV & patching (2 devices)","Remote support","Monthly health report","Priority on‑site scheduling"]}/>
        <Plan name="Family Plan" price="$79" highlight features={["Everything in Basic","Up to 8 devices","Cloud backup","Password manager","Wi‑Fi monitoring","24/7 alerts"]}/>
        <Plan name="Smart Home Plus" price="$149" features={["Everything in Family","IoT protection","Parental filtering","Identity monitoring","2 on‑site visits / year"]}/>
      </div>
      <h2 className="text-xl font-semibold mt-10">Business (per user)</h2>
      <div className="grid gap-4 lg:grid-cols-3 mt-4">
        <Plan name="Essentials" price="$59/user" features={["Helpdesk & remote support","Patch & asset mgmt","M365/Google support","Basic email & DNS filtering"]}/>
        <Plan name="Secure" price="$89/user" highlight features={["Everything in Essentials","EDR/AV + advanced email","PC & M365 backup","Security baseline hardening"]}/>
        <Plan name="Complete" price="$129/user" features={["Everything in Secure","vCIO & reviews","Basic compliance","Network monitoring/SD‑WAN options"]}/>
      </div>
      <div className="mt-6 text-sm text-slate-500">* On‑site billed at $125/hour outside included visits. Minimums may apply for business plans.</div>
    </div>
  );
}
