import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import CallToAction from "@/components/CallToAction";
import PageHero from "@/components/PageHero";
import { Card, PrimaryLink, SecondaryLink, SectionHeading } from "@/components/ui";
import { services } from "@/lib/site";

type Service = (typeof services)[number];

export default function ServiceDetailPage({
  service,
  whatItSolves,
  deliverables,
  boundaries,
}: {
  service: Service;
  whatItSolves: string[];
  deliverables: string[];
  boundaries: string;
}) {
  const Icon = service.icon;

  return (
    <>
      <PageHero
        eyebrow="Managed service"
        title={service.title}
        description={service.summary}
        actions={
          <>
            <PrimaryLink href="/contact/">Discuss your environment</PrimaryLink>
            <SecondaryLink href="/services/">View all services</SecondaryLink>
          </>
        }
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950">Business outcome</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">{service.outcome}</p>
          </div>

          <Card className="p-7 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-950">Common problems this service addresses</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {whatItSolves.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Typical scope"
            title="What the work can include"
            description="The final scope depends on the current environment, business priorities, existing vendors, and the responsibilities defined in writing."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[...service.features, ...deliverables].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Card className="border-blue-100 bg-blue-50/60 p-7 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-950">Scope and responsibility matter</h2>
          <p className="mt-4 leading-7 text-slate-700">{boundaries}</p>
          <p className="mt-4 leading-7 text-slate-700">
            Proposals and service agreements should identify included services, support hours, exclusions, customer responsibilities, third-party dependencies, and how changes are approved.
          </p>
        </Card>
      </section>

      <CallToAction
        title={`Ready to talk about ${service.shortTitle.toLowerCase()}?`}
        description="A useful first conversation focuses on the current environment, the business impact, and the smallest responsible next step."
      />
    </>
  );
}
