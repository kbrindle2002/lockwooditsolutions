import {
  BookOpen,
  BriefcaseBusiness,
  CloudCog,
  DatabaseBackup,
  Headphones,
  Home,
  Network,
  ShieldCheck,
  Users,
} from "lucide-react";

export const site = {
  name: "Lockwood IT Solutions",
  legalName: "Lockwood IT Solutions, LLC",
  url: "https://lockwooditsolutions.com",
  email: "info@lockwooditsolutions.com",
  phoneDisplay: "(262) 417-2461",
  phoneHref: "+12624172461",
  tagline: "Secure. Smart. Scalable.",
  serviceArea: "Southeast Wisconsin and Northern Illinois",
  remoteArea: "Remote support available across the Midwest",
  social: {
    facebook: "https://www.facebook.com/lockwooditsolutions",
    linkedin: "https://www.linkedin.com/company/lockwooditsolutions/",
  },
};

export const navigation = [
  { href: "/", label: "Home", icon: Home },
  { href: "/services/", label: "Services", icon: BriefcaseBusiness },
  { href: "/who-we-help/", label: "Who We Help", icon: Users },
  { href: "/why-lockwood/", label: "Why LIT", icon: ShieldCheck },
  { href: "/resources/", label: "Resources", icon: BookOpen },
  { href: "/support/", label: "Client Support", icon: Headphones },
];

export const services = [
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    shortTitle: "Cybersecurity",
    summary: "Security-focused reviews, risk guidance, identity protection, and practical recommendations to help strengthen business technology.",
    icon: ShieldCheck,
  },
  {
    slug: "it-project-management",
    title: "IT Project Management",
    shortTitle: "IT Project Management",
    summary: "Structured planning and coordination for technology upgrades, deployments, migrations, and other clearly defined IT projects.",
    icon: BriefcaseBusiness,
  },
  {
    slug: "backup-recovery",
    title: "Backup & Recovery",
    shortTitle: "Backup & Recovery",
    summary: "Backup and recovery readiness reviews, restore planning, vendor evaluation, and testing guidance without recovery guarantees.",
    icon: DatabaseBackup,
  },
  {
    slug: "business-continuity",
    title: "Business Continuity",
    shortTitle: "Business Continuity",
    summary: "Business continuity planning that identifies critical systems, recovery priorities, dependencies, and practical response steps.",
    icon: DatabaseBackup,
  },
  {
    slug: "network-support",
    title: "Network Support",
    shortTitle: "Network Support",
    summary: "Planning, troubleshooting, and improvement guidance for business networks, connectivity, Wi-Fi, and infrastructure projects.",
    icon: Network,
  },
  {
    slug: "technical-support",
    title: "Technical Support",
    shortTitle: "Technical Support",
    summary: "Scheduled business technology support for Microsoft 365, Windows, devices, applications, and common operational issues.",
    icon: Headphones,
  },
  {
    slug: "microsoft-365",
    title: "Microsoft 365",
    shortTitle: "Microsoft 365",
    summary: "Microsoft 365 support, administration, security guidance, account management, and practical help for business collaboration.",
    icon: CloudCog,
  },
  {
    slug: "it-consulting",
    title: "IT Consulting",
    shortTitle: "IT Consulting",
    summary: "Practical technology planning, system reviews, project guidance, and clear recommendations tailored to your business needs.",
    icon: BriefcaseBusiness,
  },
] as const;

export const serviceLevels = [
  {
    name: "Managed Core",
    description: "A stable operational foundation for everyday support and administration.",
    includes: [
      "Help desk and remote support",
      "Endpoint monitoring and patching",
      "User onboarding and offboarding",
      "Microsoft 365 administration",
      "Inventory and documentation",
    ],
  },
  {
    name: "Managed Secure",
    description: "Core operations plus stronger identity, endpoint, email, and backup controls.",
    includes: [
      "Everything in Managed Core",
      "Endpoint security",
      "Identity and MFA hardening",
      "Email and web protection",
      "Backup and recovery oversight",
    ],
  },
  {
    name: "Managed Complete",
    description: "Higher-touch service with network management, reviews, and ongoing planning.",
    includes: [
      "Everything in Managed Secure",
      "Network and infrastructure management",
      "Recurring business reviews",
      "Technology roadmap and lifecycle planning",
      "Advisory and vendor coordination",
    ],
  },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Assess",
    description: "Understand the business, users, systems, ownership, risks, and what is getting in the way.",
  },
  {
    number: "02",
    title: "Stabilize",
    description: "Address urgent problems, secure the essentials, and document the current environment.",
  },
  {
    number: "03",
    title: "Standardize",
    description: "Create repeatable support, security, backup, onboarding, and administration practices.",
  },
  {
    number: "04",
    title: "Improve",
    description: "Use regular reviews and a practical roadmap to make the environment stronger over time.",
  },
] as const;
