import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import CallToAction from "@/components/CallToAction";
import PageHero from "@/components/PageHero";
import { Card, PrimaryLink, SecondaryLink, SectionHeading } from "@/components/ui";
import { services, serviceLevels } from "@/lib/site";

export const metadata: Metadata = {
  title: "Managed IT Services",
  description:
    "Managed IT, cybersecurity, Microsoft 365, backup, networking, infrastructure, projects, and technology advisory for small businesses.",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Managed IT from the device to the cloud"
        description="Lockwood IT Solutions connects support, cybersecurity, Microsoft 365, backup, networks, and planning into one accountable operating model for small business."
        actions={
          <>
            <PrimaryLink href="/contact/">Schedule an IT assessment</PrimaryLink>
            <SecondaryLink href="#service-levels">Compare service levels</SecondaryLink>
          </>
        }
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="Service areas"
          title="Start with the business outcome—not a product list"
          description="Each service area can support a managed relationship or a focused project. The right combination depends on where responsibility, risk, and operational friction exist today."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.slug} className="flex h-full flex-col p-7 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-950">{service.title}</h2>
                    <p className="mt-2 leading-7 text-slate-600">{service.summary}</p>
                  </div>
                </div>
                <ul className="mt-6 grid gap-3 text-sm leading-6 text-slate-700 sm:grid-cols-2">
                  {service.features.slice(0, 4).map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/services/${service.slug}/`} className="mt-7 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-900 hover:underline">
                  Explore {service.shortTitle.toLowerCase()} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="service-levels" className="scroll-mt-28 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Service levels"
            title="Operational support, stronger protection, or full technology stewardship"
            description="These levels describe increasing responsibility. They are not off-the-shelf promises; scope and price are confirmed after the environment and expectations are understood."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {serviceLevels.map((level, index) => (
              <Card key={level.name} className={`p-7 ${index === 1 ? "border-blue-400 ring-2 ring-blue-100" : ""}`}>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-700">Level {index + 1}</p>
                <h2 className="mt-3 text-2xl font-bold text-slate-950">{level.name}</h2>
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
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700">
            <strong className="text-slate-950">Why prices are proposal-based:</strong> users, devices, locations, support hours, current technical debt, required security controls, licensing, backup, and on-site needs materially affect the work and cost. Publishing a low per-user number before defining those responsibilities would be misleading.
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
