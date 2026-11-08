import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { services } from "@/lib/site";

const service = services.find((item) => item.slug === "technical-support")!;

export const metadata: Metadata = {
  title: service.title,
  description: service.summary,
  alternates: { canonical: "/services/technical-support/" },
};

export default function Page() {
  return <ServiceDetailPage service={service} />;
}
