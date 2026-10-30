import {
  BriefcaseBusiness,
  CloudCog,
  DatabaseBackup,
  Headphones,
  Network,
  ShieldCheck,
} from "lucide-react";

export const site = {
  name: "Lockwood IT Solutions",
  url: "https://lockwooditsolutions.com",
  email: "info@lockwooditsolutions.com",
  phoneDisplay: "(262) 417-2461",
  phoneHref: "+12624172461",
  tagline: "Secure. Smart. Scalable.",
  serviceArea: "Southeast Wisconsin and Northern Illinois",
  remoteArea: "Remote support available across the Midwest",
};

export const navigation = [
  { href: "/services/", label: "Services" },
  { href: "/who-we-help/", label: "Who We Help" },
  { href: "/why-lockwood/", label: "Why Lockwood" },
  { href: "/resources/", label: "Resources" },
];

export const services = [
  {
    slug: "managed-it",
    title: "Managed IT Services",
    shortTitle: "Managed IT",
    summary:
      "Day-to-day support, monitoring, patching, onboarding, documentation, and vendor coordination for a steadier technology environment.",
    outcome: "Keep people productive and routine technology work under control.",
    icon: Headphones,
    features: [
      "Remote help desk and scheduled on-site support",
      "User onboarding, offboarding, and access changes",
      "Endpoint monitoring, patching, and lifecycle planning",
      "Technology inventory and useful documentation",
      "Vendor coordination and recurring service reviews",
    ],
  },
  {
    slug: "cybersecurity",
    title: "Managed Cybersecurity",
    shortTitle: "Cybersecurity",
    summary:
      "Layered protection for identities, endpoints, email, web access, and everyday business operations—without fear-based promises.",
    outcome: "Reduce avoidable risk and make security part of daily IT operations.",
    icon: ShieldCheck,
    features: [
      "Multi-factor authentication and identity hardening",
      "Endpoint protection and response coordination",
      "Email security and phishing-resistance controls",
      "DNS and web filtering",
      "Security baselines, reviews, and prioritized remediation",
    ],
  },
  {
    slug: "microsoft-365",
    title: "Microsoft 365 and Cloud",
    shortTitle: "Microsoft 365",
    summary:
      "Administration, identity, device management, collaboration, migrations, and licensing guidance for Microsoft-centered businesses.",
    outcome: "Turn Microsoft 365 into a governed business platform instead of a collection of disconnected subscriptions.",
    icon: CloudCog,
    features: [
      "Microsoft 365 tenant administration",
      "Entra ID identity and access management",
      "Intune endpoint and mobile-device management",
      "Exchange Online, Teams, SharePoint, and OneDrive support",
      "Tenant cleanup, migrations, and licensing review",
    ],
  },
  {
    slug: "business-continuity",
    title: "Backup and Business Continuity",
    shortTitle: "Business Continuity",
    summary:
      "Backup planning, restore testing, recovery documentation, and practical preparation for outages, mistakes, and security incidents.",
    outcome: "Know what is protected, how recovery works, and who is responsible when something goes wrong.",
    icon: DatabaseBackup,
    features: [
      "Endpoint, server, and Microsoft 365 backup planning",
      "Restore testing and recovery verification",
      "Recovery objectives and responsibility mapping",
      "Business-continuity and disaster-recovery documentation",
      "Recovery planning for vendors and line-of-business systems",
    ],
  },
  {
    slug: "network-infrastructure",
    title: "Network and Infrastructure",
    shortTitle: "Networks",
    summary:
      "Firewalls, switches, Wi-Fi, segmentation, VPN, servers, and infrastructure documentation sized for small-business needs.",
    outcome: "Build a dependable foundation for the people, devices, and cloud services your business relies on.",
    icon: Network,
    features: [
      "Firewall, switching, and business Wi-Fi management",
      "Guest access, segmentation, and secure remote access",
      "Server and virtualization support",
      "Performance troubleshooting and lifecycle planning",
      "Network diagrams and infrastructure documentation",
    ],
  },
  {
    slug: "projects-advisory",
    title: "Projects and Technology Advisory",
    shortTitle: "Projects & Advisory",
    summary:
      "Focused assessments, migrations, office moves, co-managed support, roadmaps, and responsible AI readiness.",
    outcome: "Make technology changes with a clear scope, practical priorities, and accountable decisions.",
    icon: BriefcaseBusiness,
    features: [
      "Technology assessments and improvement roadmaps",
      "Microsoft 365 migrations and tenant projects",
      "Office moves, network refreshes, and security projects",
      "Co-managed support for internal IT staff",
      "Responsible AI and Microsoft Copilot readiness",
    ],
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
