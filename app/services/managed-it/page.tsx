import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { services } from "@/lib/site";

const service = services.find((item) => item.slug === "managed-it")!;

export const metadata: Metadata = {
  title: "Managed IT Services",
  description: "Help desk, endpoint management, onboarding, documentation, vendor coordination, and ongoing IT operations for small businesses.",
  alternates: { canonical: "/services/managed-it/" },
};

const whatItSolves = [
  "Employees lose time to recurring support issues",
  "Onboarding and offboarding rely on memory",
  "Devices are patched and replaced inconsistently",
  "Technology ownership is unclear across vendors",
  "Documentation is missing or outdated",
  "The business needs support without hiring a full internal team",
];

const deliverables = [
  "Support workflows and priority definitions",
  "Standard device and account onboarding checklists",
  "Recurring operational reviews and improvement priorities",
  "Coordination with internet, software, hardware, and cloud vendors",
];

export default function Page() {
  return (
    <ServiceDetailPage
      service={service}
      whatItSolves={whatItSolves}
      deliverables={deliverables}
      boundaries={"Managed IT is most effective when the responsibilities of Lockwood, the customer, software vendors, internet providers, and other partners are explicit. Support availability and response targets must be defined in the written agreement rather than assumed from website language."}
    />
  );
}
