import type { Metadata } from "next";
import { CheckCircle2, FileText, Handshake, ShieldCheck, UserRoundCheck } from "lucide-react";
import CallToAction from "@/components/CallToAction";
import PageHero from "@/components/PageHero";
import { Card, PrimaryLink, SecondaryLink, SectionHeading } from "@/components/ui";
import { processSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: "Why Lockwood IT Solutions",
  description:
    "Founder-led managed IT with more than three decades of hands-on experience, clear documentation, security-first operations, and plain-English guidance.",
  alternates: { canonical: "/why-lockwood/" },
};

const principles = [
  {
    title: "Founder involvement",
    description: "Kelly L. Lockwood remains close to the technology, documentation, priorities, and customer decisions.",
    icon: UserRoundCheck,
  },
  {
    title: "Security as daily operations",
    description: "Identity, patching, endpoint protection, backup, and access changes are integrated into how the environment is managed.",
    icon: ShieldCheck,
  },
  {
    title: "Useful documentation",
    description: "Ownership, configurations, decisions, and dependencies should be recorded well enough to support continuity and accountability.",
    icon: FileText,
  },
  {
    title: "Human-readable guidance",
    description: "Technical terms are translated into business impact, options, responsibilities, and practical next steps.",
    icon: Handshake,
  },
];

const experience = [
  "Windows endpoints and servers",
  "Microsoft 365, Entra ID, Exchange Online, Teams, SharePoint, and Intune",
  "Active Directory, Group Policy, DNS, DHCP, imaging, deployment, and patching",
  "Networks, firewalls, Wi-Fi, VPN, virtualization, and infrastructure support",
  "Help desk, desktop engineering, systems administration, and vendor coordination",
];

export default function WhyLockwoodPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Lockwood IT Solutions"
        title="Enterprise experience, delivered personally and sized for small business"
        description="Lockwood IT Solutions combines more than three decades of hands-on IT experience with founder involvement, practical security, clear documentation, and direct communication."
        actions={
          <>
            <PrimaryLink href="/contact/">Start a conversation</PrimaryLink>
            <SecondaryLink href="/who-we-help/">See who we help</SecondaryLink>
          </>
        }
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">Founder story</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Technology should support people—not make them feel powerless.</h2>
            <div className="mt-5 space-y-4 leading-7 text-slate-600">
              <p>
                Kelly L. Lockwood has worked across support, desktop engineering, systems administration, networking, deployment, Microsoft platforms, and small-business technology for more than three decades.
              </p>
              <p>
                Lockwood IT Solutions was built around a straightforward idea: small businesses deserve capable IT guidance without inflated promises, unexplained decisions, or unnecessary complexity.
              </p>
              <p>
                The goal is not to make the customer dependent on mystery. It is to create a better-understood, better-documented, and more manageable environment.
              </p>
            </div>
          </div>

          <Card className="p-7 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-950">Hands-on experience across the stack</h2>
            <ul className="mt-6 grid gap-4">
              {experience.map((item) => (
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
            eyebrow="Operating principles"
            title="What customers should be able to expect"
            description="Trust is built through accurate scope, transparent decisions, documented responsibilities, and work that can be explained."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <Card key={principle.title} className="flex gap-5 p-7">
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-950">{principle.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{principle.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="The process"
          title="Progress without losing human control"
          description="Technical work can be proactive, but material changes, costs, access, and risk decisions should remain visible and authorized."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <Card key={step.number} className="p-6">
              <span className="text-4xl font-black text-blue-100">{step.number}</span>
              <h3 className="mt-3 text-xl font-bold text-slate-950">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <CallToAction />
    </>
  );
}
