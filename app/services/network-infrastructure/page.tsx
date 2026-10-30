import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { services } from "@/lib/site";

const service = services.find((item) => item.slug === "network-infrastructure")!;

export const metadata: Metadata = {
  title: "Network and Infrastructure",
  description: "Firewalls, switching, business Wi-Fi, segmentation, secure remote access, servers, virtualization, and infrastructure documentation.",
  alternates: { canonical: "/services/network-infrastructure/" },
};

const whatItSolves = [
  "Wi-Fi coverage or performance interrupts work",
  "Guest, business, and connected devices share one flat network",
  "Firewall and switch ownership or credentials are unclear",
  "Remote access is unreliable or difficult to govern",
  "Servers and network equipment lack lifecycle planning",
  "The environment has no current diagram or configuration record",
];

const deliverables = [
  "Network inventory, topology, and ownership documentation",
  "Segmentation and secure remote-access design",
  "Configuration backup and lifecycle recommendations",
  "Coordination with carriers, cabling vendors, and equipment providers",
];

export default function Page() {
  return (
    <ServiceDetailPage
      service={service}
      whatItSolves={whatItSolves}
      deliverables={deliverables}
      boundaries={"Network performance depends on internet providers, cabling, building conditions, hardware, software, and user demand. The written scope should distinguish managed equipment, customer-owned equipment, third-party systems, and any availability targets."}
    />
  );
}
