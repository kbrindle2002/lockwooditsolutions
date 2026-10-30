import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { services } from "@/lib/site";

const service = services.find((item) => item.slug === "cybersecurity")!;

export const metadata: Metadata = {
  title: "Managed Cybersecurity",
  description: "Identity, endpoint, email, DNS, configuration, and incident-readiness services integrated into everyday IT operations.",
  alternates: { canonical: "/services/cybersecurity/" },
};

const whatItSolves = [
  "Multi-factor authentication is incomplete or inconsistently enforced",
  "Former employees or unused accounts still have access",
  "Endpoint and email protections are difficult to verify",
  "Security alerts have no clear owner",
  "The business lacks an incident communication plan",
  "Security recommendations are not prioritized by risk and effort",
];

const deliverables = [
  "Identity and access review with prioritized remediation",
  "Security baseline documentation and exception tracking",
  "Incident contact, escalation, and containment procedures",
  "Guidance that supports customer security or compliance obligations without claiming automatic compliance",
];

export default function Page() {
  return (
    <ServiceDetailPage
      service={service}
      whatItSolves={whatItSolves}
      deliverables={deliverables}
      boundaries={"No provider can guarantee that an incident will never occur. Cybersecurity scope should define monitoring, tools, escalation, customer actions, third-party responsibilities, and incident-response services. Compliance remains a shared business and legal responsibility."}
    />
  );
}
