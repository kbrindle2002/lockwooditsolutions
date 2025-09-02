'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home as HomeIcon,
  Layers,
  BadgeDollarSign,
  LifeBuoy,
  Info,
  Mail,
  ShieldCheck,
  ScrollText,
} from 'lucide-react';

type IconName =
  | 'home'
  | 'services'
  | 'plans'
  | 'support'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms';

const ICONS: Record<IconName, React.ComponentType<{ className?: string }>> = {
  home: HomeIcon,
  services: Layers,
  plans: BadgeDollarSign,
  support: LifeBuoy,
  about: Info,
  contact: Mail,
  privacy: ShieldCheck,
  terms: ScrollText,
};

export default function NavIconLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: IconName;
}) {
  const pathname = usePathname();
  const active = pathname === href;
  const IconCmp = ICONS[icon];

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-2 py-1 rounded-lg text-sm transition ${
        active ? 'bg-white/10 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
      }`}
      aria-label={label}
      title={label}
    >
      <IconCmp className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}
