import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { services } from "@/lib/site";

const service = services.find((item) => item.slug === "projects-advisory")!;

export const metadata: Metadata = {
  title: "Projects and Technology Advisory",
  description: "Assessments, migrations, office moves, security initiatives, co-managed IT, roadmaps, and responsible AI readiness.",
  alternates: { canonical: "/services/projects-advisory/" },
};

const whatItSolves = [
  "A major technology change needs a clear owner and plan",
  "The business needs independent guidance before buying tools",
  "An internal IT person needs experienced project or escalation support",
  "A move, migration, or refresh must minimize disruption",
  "Leadership needs priorities, costs, and dependencies explained clearly",
  "AI adoption is moving faster than data-handling and governance decisions",
];

const deliverables = [
  "Current-state assessment and prioritized roadmap",
  "Project scope, milestones, risks, dependencies, and acceptance criteria",
  "Co-managed responsibility model for internal IT teams",
  "Responsible AI and Microsoft Copilot readiness review",
];

export default function Page() {
  return (
    <ServiceDetailPage
      service={service}
      whatItSolves={whatItSolves}
      deliverables={deliverables}
      boundaries={"Projects and advisory work should separate recommendations from authorization. Scope, budget, success criteria, data handling, access, change approval, and rollback decisions remain subject to written customer approval."}
    />
  );
}
