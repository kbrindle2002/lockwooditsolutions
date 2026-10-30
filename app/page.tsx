import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Handshake,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import CallToAction from "@/components/CallToAction";
import { Card, Eyebrow, PrimaryLink, SecondaryLink, SectionHeading } from "@/components/ui";
import { processSteps, services, serviceLevels } from "@/lib/site";

const problems = [
  "Recurring issues interrupting productive work",
  "Unclear ownership of Microsoft 365 and vendor accounts",
  "Security controls that are incomplete or undocumented",
  "Backups that exist but have not been tested",
  "Inconsistent onboarding and offboarding",
  "Technology spending without a practical roadmap",
];

const differentiators = [
  {
    title: "Founder-led service",
    description: "Work with an experienced IT professional who stays close to the environment and the decisions that affect it.",
    icon: UserRoundCheck,
  },
  {
    title: "Security built into operations",
    description: "Identity, endpoint, email, backup, and network protection are treated as part of everyday IT—not an optional add-on.",
    icon: ShieldCheck,
  },
  {
    title: "Clear documentation",
    description: "Useful records, ownership details, and recommendations reduce confusion and make future support faster.",
    icon: FileCheck2,
  },
  {
    title: "Plain-English partnership",
    description: "Recommendations are explained in terms of business impact, priorities, responsibilities, and tradeoffs.",
    icon: Handshake,
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#082b59] text-white">
        <div className="absolute inset-0 opacity-30" aria-hidden="true">
          <div className="absolute -right-32 -top-40 h-96 w-96 rounded-full bg-blue-400 blur-3xl" />
          <div className="absolute -bottom-48 left-1/4 h-96 w-96 rounded-full bg-cyan-300 blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:py-28">
          <div>
            <p className="inline-flex rounded-full border border-blue-200/30 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-50">
              Managed IT for small businesses
            </p>
            <h1 className="mt-7 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Managed IT that keeps your business working—and your data protected.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100 sm:text-xl">
              Lockwood IT Solutions helps small businesses manage Microsoft 365, devices, cybersecurity, backups, networks, and day-to-day support without building an internal IT department.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/contact/" variant="light">
                Schedule an IT assessment
              </PrimaryLink>
              <SecondaryLink href="/services/" className="border-white/35 bg-white/5 text-white hover:bg-white/10">
                Explore managed services
              </SecondaryLink>
            </div>
            <ul className="mt-8 grid gap-3 text-sm text-blue-50 sm:grid-cols-3">
              {["Founder-led service", "Security-first operations", "Plain-English guidance"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur sm:p-8">
            <Eyebrow className="text-cyan-200">What we manage</Eyebrow>
            <div className="mt-5 grid gap-4">
              {[
                ["People & access", "Accounts, onboarding, offboarding, permissions, email, and day-to-day support."],
                ["Devices & security", "Endpoint management, patching, protection, backup, and lifecycle planning."],
                ["Cloud & infrastructure", "Microsoft 365, networks, Wi-Fi, firewalls, servers, and connected vendors."],
              ].map(([title, description]) => (
                <div key={title} className="rounded-2xl border border-white/15 bg-[#06254d]/70 p-5">
                  <h2 className="font-semibold text-white">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-blue-100">{description}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-blue-100">
              Start with an assessment, a focused project, or a managed-services conversation. The recommendation should fit the actual environment—not a generic package.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 text-center text-sm font-semibold text-slate-700 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <span>Microsoft 365 &amp; Entra ID</span>
          <span>Endpoint management</span>
          <span>Cybersecurity &amp; backup</span>
          <span>Networks &amp; infrastructure</span>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="When IT is holding the business back"
            title="The problem is rarely just one device."
            description="Small businesses often inherit technology one decision at a time. Over time, ownership becomes unclear, security becomes inconsistent, and routine work depends on a few people remembering how everything fits together."
          />
          <Card className="p-7 sm:p-8">
            <ul className="grid gap-4 sm:grid-cols-2">
              {problems.map((problem) => (
                <li key={problem} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <section className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Core services"
            title="One accountable technology partner"
            description="The service model connects support, security, cloud administration, backup, networking, and planning so important responsibilities do not fall between vendors."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.slug} className="group flex h-full flex-col transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-950">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{service.summary}</p>
                  <Link href={`/services/${service.slug}/`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 hover:underline">
                    Explore this service <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="service-levels" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Managed service levels"
          title="A clear framework without one-size-fits-all pricing"
          description="Final scope and pricing depend on users, devices, locations, risk, existing systems, support expectations, and the tools required to manage the environment responsibly."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {serviceLevels.map((level, index) => (
            <Card key={level.name} className={`flex h-full flex-col p-7 ${index === 1 ? "border-blue-400 ring-2 ring-blue-100" : ""}`}>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-700">Service level {index + 1}</p>
              <h3 className="mt-3 text-2xl font-bold text-slate-950">{level.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{level.description}</p>
              <ul className="mt-6 grid gap-3 text-sm leading-6 text-slate-700">
                {level.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-6 text-slate-600">
          Projects, onboarding, hardware, software licensing, after-hours work, and on-site services are scoped separately. No service level is presented as a compliance guarantee or a promise that incidents cannot occur.
        </p>
      </section>

      <section className="bg-[#082b59] py-20 text-white lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How Lockwood works"
            title="A disciplined path from uncertainty to steady operations"
            description="You should know what is being done, why it matters, what is still unknown, and which decisions remain yours."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.number} className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <span className="text-4xl font-black text-cyan-300">{step.number}</span>
                <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-blue-100">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Why Lockwood"
          title="Enterprise experience, delivered personally and sized for small business"
          description="Lockwood IT Solutions combines more than three decades of hands-on IT experience with founder involvement, practical security, and direct communication."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {differentiators.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="flex gap-5 p-7">
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
        <Link href="/why-lockwood/" className="mt-8 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-900 hover:underline">
          Learn more about the approach <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>

      <CallToAction />
    </>
  );
}
