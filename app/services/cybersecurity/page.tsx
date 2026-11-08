import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { services } from "@/lib/site";

const service = services.find((item) => item.slug === "cybersecurity")!;

export const metadata: Metadata = {
  title: service.title,
  description: service.summary,
  alternates: { canonical: "/services/cybersecurity/" },
};

export default function Page() {
  return <ServiceDetailPage service={service} />;
}
