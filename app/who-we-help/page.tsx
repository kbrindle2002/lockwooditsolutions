import type { Metadata } from "next";
import { CheckCircle2, Factory, Hammer, HeartHandshake, Scale, UsersRound } from "lucide-react";
import CallToAction from "@/components/CallToAction";
import PageHero from "@/components/PageHero";
import { Card, PrimaryLink, SecondaryLink, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Who We Help",
  description:
    "Managed IT for growing small businesses, professional services, nonprofits, light manufacturing, contractors, and teams without a full internal IT department.",
  alternates: { canonical: "/who-we-help/" },
};

const fitSignals = [
  "Approximately 10–75 users, with flexibility for the right environment",
  "Microsoft 365, Windows devices, cloud applications, Wi-Fi, and business systems are central to daily work",
  "No internal IT team—or one person who needs experienced backup",
  "Support, security, backup, and ownership are split across vendors or individuals",
  "Leadership wants clearer documentation, accountability, and planning",
  "The business values direct communication and practical recommendations",
];

const sectors = [
  {
    title: "Professional services",
    description: "Businesses that depend on secure communication, reliable devices, controlled access, and productive collaboration.",
    icon: Scale,
  },
  {
    title: "Nonprofit organizations",
    description: "Mission-driven teams that need right-sized support, careful licensing, strong identity practices, and understandable planning.",
    icon: HeartHandshake,
  },
  {
    title: "Light manufacturing",
    description: "Operations that need dependable networks, segmented access, managed endpoints, vendor coordination, and continuity planning.",
    icon: Factory,
  },
  {
    title: "Contractors and skilled trades",
    description: "Mobile teams that rely on Microsoft 365, shared files, line-of-business applications, secure access, and responsive support.",
    icon: Hammer,
  },
  {
    title: "Growing local businesses",
    description: "Organizations that have outgrown informal technology support but are not ready to build a complete internal IT department.",
    icon: UsersRound,
  },
];

export default function WhoWeHelpPage() {
  return (
    <>
      <PageHero
        eyebrow="Who we help"
        title="Small businesses ready for a more accountable IT model"
        description="Lockwood IT Solutions is designed for organizations that depend on technology every day but do not want critical support, security, and administration to depend on informal arrangements."
        actions={
          <>
            <PrimaryLink href="/contact/">Discuss your fit</PrimaryLink>
            <SecondaryLink href="/services/">Explore services</SecondaryLink>
          </>
        }
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow="A strong fit"
            title="The environment matters more than the industry label"
            description="The best fit is a business that wants responsibilities defined, security integrated into daily operations, and recommendations explained in terms of business impact."
          />
          <Card className="p-7 sm:p-8">
            <ul className="grid gap-4 sm:grid-cols-2">
              {fitSignals.map((signal) => (
                <li key={signal} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                  <span>{signal}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Common environments"
            title="Built around how small organizations actually operate"
            description="These examples describe the kinds of environments the service model is designed to support. They are not claims about current customers or regulated-industry specialization."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector) => {
              const Icon = sector.icon;
              return (
                <Card key={sector.title} className="h-full p-7">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h2 className="mt-5 text-xl font-bold text-slate-950">{sector.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{sector.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Card className="border-amber-200 bg-amber-50/60 p-7 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-950">When Lockwood IT Solutions may not be the right fit</h2>
          <p className="mt-4 leading-7 text-slate-700">
            A good relationship requires realistic scope and mutual accountability. Environments that require a staffed 24/7 operations center, unlimited on-site coverage, specialized regulatory counsel, or a large multi-state field team may need a different primary provider or a co-managed arrangement.
          </p>
        </Card>
      </section>

      <CallToAction title="Not sure whether your business is a fit?" description="A short assessment conversation can identify the environment, priorities, and whether Lockwood IT Solutions is the right partner—or whether another path makes more sense." />
    </>
  );
}
