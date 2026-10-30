import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { services } from "@/lib/site";

const service = services.find((item) => item.slug === "business-continuity")!;

export const metadata: Metadata = {
  title: "Backup and Business Continuity",
  description: "Backup planning, restore verification, recovery objectives, responsibility mapping, and practical preparation for disruption.",
  alternates: { canonical: "/services/business-continuity/" },
};

const whatItSolves = [
  "Backups exist but restores have not been tested",
  "Microsoft 365 data protection is assumed rather than confirmed",
  "Recovery priorities are not aligned with business operations",
  "Critical vendor and account information is undocumented",
  "The business has no clear outage or incident communication plan",
  "Recovery responsibilities are split across several providers",
];

const deliverables = [
  "Documented backup coverage and known gaps",
  "Restore-test schedule and evidence of results",
  "Recovery objectives for important systems and data",
  "Business-continuity contacts, dependencies, and manual workarounds",
];

export default function Page() {
  return (
    <ServiceDetailPage
      service={service}
      whatItSolves={whatItSolves}
      deliverables={deliverables}
      boundaries={"A backup is not a recovery guarantee. Scope should define what is protected, retention, restore testing, recovery targets, exclusions, internet and vendor dependencies, and the customer decisions required during an outage."}
    />
  );
}
