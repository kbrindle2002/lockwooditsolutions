'use client';
import { Builder } from '@builder.io/react';
import { Card } from '@/components/ui';
import Link from 'next/link';

/* --------------------------
   Hero component
--------------------------- */
export function Hero(props: any) {
  const {
    kicker = 'Lockwood IT Solutions',
    title = 'Secure. Simple. Ahead.',
    subtitle = 'We manage Microsoft 365, Azure, and Intune—so you can focus on customers.',
    primaryText = 'Book a consult',
    primaryHref = '/contact',
    secondaryText = 'See plans & pricing',
    secondaryHref = '/pricing',
  } = props;

  return (
    <section className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <p className="text-xs uppercase tracking-widest text-sky-400/80">{kicker}</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight">
          {title.replace('Ahead.', '')}
          <span className="text-sky-400">Ahead.</span>
        </h1>
        <p className="mt-5 text-slate-300 text-lg">{subtitle}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={primaryHref}
            className="px-5 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold"
          >
            {primaryText}
          </Link>
          <Link
            href={secondaryHref}
            className="px-5 py-3 rounded-2xl ring-1 ring-slate-700 hover:ring-slate-500"
          >
            {secondaryText}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* --------------------------
   Stats Grid component
--------------------------- */
export function StatsGrid({ items = [] as { n: string; label: string }[] }) {
  const list = items.length
    ? items
    : [
        { n: '231', label: 'Managed Devices' },
        { n: '99.98%', label: 'Uptime (30d)' },
        { n: '94', label: 'Secure Score' },
        { n: '427', label: 'Patches Deployed' },
        { n: '14m', label: 'Median Response' },
        { n: '0', label: 'Critical Incidents' },
      ];
  return (
    <section className="max-w-7xl mx-auto px-4 pb-10">
      <div className="grid grid-cols-3 gap-3">
        {list.map((x, i) => (
          <Card key={i}>
            <div className="text-2xl font-bold text-sky-400">{x.n}</div>
            <div className="text-xs text-slate-400">{x.label}</div>
          </Card>
        ))}
      </div>
    </section>
  );
}

/* --------------------------
   Register components in Builder.io
--------------------------- */
if (typeof window !== 'undefined') {
  Builder.registerComponent(Hero, {
    name: 'Hero',
    inputs: [
      { name: 'kicker', type: 'string' },
      { name: 'title', type: 'string' },
      { name: 'subtitle', type: 'longText' },
      { name: 'primaryText', type: 'string' },
      { name: 'primaryHref', type: 'string' },
      { name: 'secondaryText', type: 'string' },
      { name: 'secondaryHref', type: 'string' },
    ],
  });

  Builder.registerComponent(StatsGrid, {
    name: 'StatsGrid',
    inputs: [
      {
        name: 'items',
        type: 'list',
        subFields: [
          { name: 'n', type: 'string' },
          { name: 'label', type: 'string' },
        ],
      },
    ],
  });

  Builder.registerComponent(Card, {
    name: 'Card',
    canHaveChildren: true,
    inputs: [{ name: 'className', type: 'string' }],
  });
}
