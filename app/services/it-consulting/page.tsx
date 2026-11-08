import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { services } from "@/lib/site";

const service = services.find((item) => item.slug === "it-consulting")!;

export const metadata: Metadata = {
  title: service.title,
  description: service.summary,
  alternates: { canonical: "/services/it-consulting/" },
};

export default function Page() {
  return <ServiceDetailPage service={service} />;
}
