import type { Metadata } from "next";
import { CheckCircle2, HelpCircle } from "lucide-react";
import CallToAction from "@/components/CallToAction";
import PageHero from "@/components/PageHero";
import { Card, PrimaryLink, SecondaryLink, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Resources and FAQ",
  description:
    "Practical answers about managed IT, onboarding, pricing, support, cybersecurity responsibilities, backup, and working with Lockwood IT Solutions.",
  alternates: { canonical: "/resources/" },
};

const questions = [
  {
    question: "What is a Managed Service Provider?",
    answer:
      "A Managed Service Provider, or MSP, takes ongoing responsibility for defined parts of a customer’s technology environment. That can include support, device management, security, Microsoft 365, backup, networks, documentation, and planning. The written agreement should state exactly what is included and what remains the customer’s responsibility.",
  },
  {
    question: "Do you publish per-user pricing?",
    answer:
      "Not before the environment is understood. User count matters, but so do devices, locations, current technical debt, security requirements, licensing, backup, support hours, on-site needs, and the amount of responsibility Lockwood will carry. Pricing is proposal-based so the scope is accurate rather than artificially simple.",
  },
  {
    question: "Do you support businesses with internal IT staff?",
    answer:
      "Yes. Co-managed support can provide project help, Microsoft 365 administration, escalation, documentation, infrastructure work, or additional capacity while preserving the internal team’s authority and knowledge.",
  },
  {
    question: "Can an MSP make a business compliant?",
    answer:
      "An MSP can help implement and operate technical controls that support a customer’s obligations. Compliance also depends on business processes, policies, contracts, training, legal interpretation, and leadership decisions. Lockwood does not present managed IT as an automatic compliance guarantee.",
  },
  {
    question: "What happens during onboarding?",
    answer:
      "Onboarding typically includes discovery, access and ownership review, inventory, urgent-risk identification, documentation, tool deployment, support-process setup, and a prioritized stabilization plan. The order depends on the condition of the current environment.",
  },
  {
    question: "Do you provide 24/7 support?",
    answer:
      "The website does not promise a staffed 24/7 service desk. Support hours, escalation, after-hours availability, and any monitoring response are defined in the applicable written agreement so expectations are clear.",
  },
  {
    question: "Do you work on-site?",
    answer:
      "Remote support is usually the fastest path for routine work. Scheduled on-site service can be included or quoted when the task, location, or equipment requires hands-on work.",
  },
  {
    question: "Do Microsoft 365 subscriptions include backup?",
    answer:
      "Microsoft provides resilience, retention, and recovery capabilities, but those features are not the same as every business’s desired backup and recovery model. Coverage, retention, restore needs, and responsibility should be reviewed rather than assumed.",
  },
];

const assessmentChecklist = [
  "Approximate number of users, devices, and locations",
  "Microsoft 365 tenant, domain, and billing ownership",
  "Current IT vendors, contracts, and support contacts",
  "Critical applications, shared files, and business workflows",
  "Firewall, Wi-Fi, server, backup, and security tools",
  "Recent outages, incidents, recurring problems, or planned changes",
  "What leadership wants to improve in the next 6–12 months",
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Clear answers before you choose an IT partner"
        description="Managed IT works best when scope, responsibilities, security expectations, costs, and decision authority are understood before the agreement is signed."
        actions={
          <>
            <PrimaryLink href="/contact/">Ask a question</PrimaryLink>
            <SecondaryLink href="#faq">Read the FAQ</SecondaryLink>
          </>
        }
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeading
            eyebrow="Before an assessment"
            title="A little preparation makes the first conversation more useful"
            description="Perfect documentation is not required. These details simply help identify ownership, dependencies, immediate risks, and the right next questions."
          />
          <Card className="p-7 sm:p-8">
            <ul className="grid gap-4 sm:grid-cols-2">
              {assessmentChecklist.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <section id="faq" className="scroll-mt-28 bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Frequently asked questions"
            title="Questions worth asking before work begins"
            description="These answers describe the intended Lockwood service model. Final commitments belong in the applicable proposal or service agreement."
          />
          <div className="mt-10 grid gap-5">
            {questions.map((item) => (
              <Card key={item.question} className="p-7">
                <div className="flex gap-4">
                  <HelpCircle className="mt-1 h-6 w-6 shrink-0 text-blue-700" aria-hidden="true" />
                  <div>
                    <h2 className="text-xl font-bold text-slate-950">{item.question}</h2>
                    <p className="mt-3 leading-7 text-slate-600">{item.answer}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CallToAction title="Have a question that is specific to your environment?" description="Share enough context to identify the business impact, systems involved, and the outcome you are trying to achieve." />
    </>
  );
}
