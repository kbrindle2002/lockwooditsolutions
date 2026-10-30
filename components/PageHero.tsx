import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui";

export default function PageHero({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-44 w-44 rounded-full bg-cyan-100/60 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-4xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">{description}</p>
          {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div>}
        </div>
      </div>
    </section>
  );
}
