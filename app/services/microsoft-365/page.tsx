import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { services } from "@/lib/site";

const service = services.find((item) => item.slug === "microsoft-365")!;

export const metadata: Metadata = {
  title: "Microsoft 365 and Cloud",
  description: "Microsoft 365 tenant administration, Entra ID, Intune, Exchange Online, Teams, SharePoint, OneDrive, migrations, and licensing guidance.",
  alternates: { canonical: "/services/microsoft-365/" },
};

const whatItSolves = [
  "Global admin and billing ownership are unclear",
  "Licenses do not match actual user needs",
  "Sharing and access controls have grown inconsistent",
  "Devices are not governed through a common management approach",
  "Teams, SharePoint, and OneDrive are used without clear structure",
  "A migration or tenant cleanup needs an accountable plan",
];

const deliverables = [
  "Tenant ownership, role, and emergency-access documentation",
  "User, group, license, and access lifecycle practices",
  "Intune enrollment and device-compliance planning",
  "Migration plans with validation, communication, and rollback considerations",
];

export default function Page() {
  return (
    <ServiceDetailPage
      service={service}
      whatItSolves={whatItSolves}
      deliverables={deliverables}
      boundaries={"Microsoft 365 licensing, feature availability, retention, backup, and security responsibilities vary by subscription and configuration. Recommendations should identify which protections are native, which require additional services, and which decisions remain with the customer."}
    />
  );
}
