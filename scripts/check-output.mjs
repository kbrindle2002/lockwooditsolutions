import { readdir, readFile, stat } from "node:fs/promises";
import { resolve, relative, extname } from "node:path";

const root = resolve("out");
const siteHosts = new Set(["lockwooditsolutions.com", "www.lockwooditsolutions.com"]);
const errors = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    else files.push(fullPath);
  }
  return files;
}

function values(html, pattern) {
  return [...html.matchAll(pattern)].map((match) => match[1]);
}

function routeTarget(pathname) {
  if (pathname === "/") return resolve(root, "index.html");
  const target = resolve(root, `.${pathname}`);
  return extname(target) ? target : resolve(target, "index.html");
}

async function exists(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

function attributeValue(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}=["']([^"']*)["']`, "i"));
  return match?.[1] || "";
}

function cspDirectiveSources(csp, directiveName) {
  const directive = csp
    .split(";")
    .map((value) => value.trim())
    .find(
      (value) =>
        value === directiveName || value.startsWith(`${directiveName} `),
    );

  return directive ? directive.split(/\s+/).slice(1) : [];
}

const allFiles = await walk(root);
const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));
const documents = new Map();

const staticConfigPath = resolve(root, "staticwebapp.config.json");
let staticConfig;

try {
  staticConfig = JSON.parse(await readFile(staticConfigPath, "utf8"));
} catch (error) {
  errors.push(
    `staticwebapp.config.json: invalid JSON (${
      error instanceof Error ? error.message : "unknown parse error"
    })`,
  );
}

if (staticConfig) {
  const csp =
    staticConfig.globalHeaders?.["Content-Security-Policy"] || "";
  const actualFrameSources = cspDirectiveSources(csp, "frame-src");
  const expectedFrameSources = [
    "'self'",
    "https://www.google.com",
    "https://maps.google.com",
  ];

  if (
    actualFrameSources.length !== expectedFrameSources.length ||
    expectedFrameSources.some(
      (source) => !actualFrameSources.includes(source),
    )
  ) {
    errors.push(
      `staticwebapp.config.json: frame-src must contain only ${
        expectedFrameSources.join(" ")
      }`,
    );
  }

  const frameAncestors = cspDirectiveSources(csp, "frame-ancestors");
  if (
    frameAncestors.length !== 1 ||
    frameAncestors[0] !== "'none'"
  ) {
    errors.push(
      "staticwebapp.config.json: frame-ancestors must remain 'none'",
    );
  }
}


for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  documents.set(file, {
    html,
    ids: new Set(values(html, /\sid=["']([^"']+)["']/g)),
  });
}


const allowedMapHosts = new Set([
  "www.google.com",
  "maps.google.com",
]);
const contactFile = resolve(root, "contact/index.html");
const contactDocument = documents.get(contactFile);

if (!contactDocument) {
  errors.push("contact/index.html: generated contact page was not found");
} else {
  const iframeTags = [
    ...contactDocument.html.matchAll(/<iframe\b[^>]*>/gi),
  ].map((match) => match[0]);

  const mapIframes = iframeTags.filter((tag) => {
    const source = attributeValue(tag, "src");

    try {
      return allowedMapHosts.has(
        new URL(source, "https://lockwooditsolutions.com").hostname,
      );
    } catch {
      return false;
    }
  });

  if (mapIframes.length !== 1) {
    errors.push(
      `contact/index.html: expected one approved Google Maps iframe, found ${mapIframes.length}`,
    );
  } else {
    const mapIframe = mapIframes[0];
    const source = attributeValue(mapIframe, "src");
    const title = attributeValue(mapIframe, "title");
    const loading = attributeValue(mapIframe, "loading").toLowerCase();
    const referrerPolicy = attributeValue(
      mapIframe,
      "referrerpolicy",
    ).toLowerCase();

    if (!title.trim()) {
      errors.push("contact/index.html: map iframe requires a title");
    }

    if (loading !== "lazy") {
      errors.push(
        "contact/index.html: map iframe must use loading=\"lazy\"",
      );
    }

    if (referrerPolicy !== "no-referrer-when-downgrade") {
      errors.push(
        "contact/index.html: map iframe has an unexpected referrer policy",
      );
    }

    try {
      const mapUrl = new URL(
        source,
        "https://lockwooditsolutions.com",
      );

      if (!allowedMapHosts.has(mapUrl.hostname)) {
        errors.push(
          `contact/index.html: unapproved map host ${mapUrl.hostname}`,
        );
      }
    } catch {
      errors.push(
        `contact/index.html: invalid map iframe source ${source}`,
      );
    }
  }
}

let internalLinkCount = 0;
let assetCount = 0;

for (const [file, document] of documents) {
  const { html, ids } = document;
  const display = relative(root, file);
  const titles = values(html, /<title>([^<]*)<\/title>/g);
  const canonicals = values(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/g);
  const h1Count = (html.match(/<h1(?:\s|>)/g) || []).length;

  if (titles.length !== 1 || !titles[0].trim()) errors.push(`${display}: expected one non-empty title`);
  if (!display.startsWith("404") && canonicals.length !== 1) errors.push(`${display}: expected one canonical URL`);
  if (h1Count !== 1) errors.push(`${display}: expected one h1, found ${h1Count}`);

  for (const href of values(html, /<a[^>]+href=["']([^"']+)["'][^>]*>/g)) {
    if (/^(mailto:|tel:|sms:|javascript:)/.test(href)) continue;
    if (href.startsWith("#")) {
      const fragment = href.slice(1);
      if (fragment && !ids.has(fragment)) errors.push(`${display}: missing local anchor ${href}`);
      continue;
    }

    let parsed;
    try {
      parsed = new URL(href, "https://lockwooditsolutions.com");
    } catch {
      errors.push(`${display}: invalid link ${href}`);
      continue;
    }
    if (!siteHosts.has(parsed.hostname)) continue;

    internalLinkCount += 1;
    const target = routeTarget(parsed.pathname);
    if (!(await exists(target))) {
      errors.push(`${display}: broken internal link ${href}`);
      continue;
    }
    if (parsed.hash && target.endsWith(".html")) {
      const targetDocument = documents.get(target);
      const fragment = decodeURIComponent(parsed.hash.slice(1));
      if (targetDocument && !targetDocument.ids.has(fragment)) errors.push(`${display}: missing target anchor ${href}`);
    }
  }

  const assets = [
    ...values(html, /<(?:img|script|source)[^>]+src=["']([^"']+)["'][^>]*>/g),
    ...values(html, /<link[^>]+href=["']([^"']+)["'][^>]*>/g),
  ];
  for (const asset of assets) {
    if (/^(data:|https?:|\/\/)/.test(asset)) continue;
    const parsed = new URL(asset, "https://lockwooditsolutions.com");
    if (!parsed.pathname.startsWith("/")) continue;
    assetCount += 1;
    if (!(await exists(resolve(root, `.${parsed.pathname}`)))) errors.push(`${display}: missing local asset ${asset}`);
  }
}

function requireGeneratedText(relativePath, requiredFragments) {
  const file = resolve(root, relativePath);
  const document = documents.get(file);

  if (!document) {
    errors.push(`${relativePath}: generated page was not found`);
    return;
  }

  for (const fragment of requiredFragments) {
    if (!document.html.includes(fragment)) {
      errors.push(`${relativePath}: missing required published text "${fragment}"`);
    }
  }
}

const linkedInUrl =
  "https://www.linkedin.com/company/lockwooditsolutions/";

if (
  ![...documents.values()].some((document) =>
    document.html.includes(linkedInUrl),
  )
) {
  errors.push("generated HTML: verified LinkedIn company URL was not found");
}

requireGeneratedText("support/index.html", [
  "Need support for an environment managed by Lockwood IT Solutions?",
]);

requireGeneratedText("privacy/index.html", [
  "Lockwood IT Solutions, LLC",
  "Microsoft Azure",
  "Twilio SendGrid",
  "Google Maps",
]);

requireGeneratedText("terms/index.html", [
  "Lockwood IT Solutions, LLC",
  "Microsoft Azure",
  "Twilio SendGrid",
  "Google Maps",
]);

let structuredLegalNameFound = false;

for (const [file, document] of documents) {
  const display = relative(root, file);
  const jsonLdBlocks = [
    ...document.html.matchAll(
      /<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];

  for (const match of jsonLdBlocks) {
    try {
      const parsed = JSON.parse(match[1]);
      const records = Array.isArray(parsed) ? parsed : [parsed];

      if (
        records.some(
          (record) =>
            record &&
            typeof record === "object" &&
            record.legalName === "Lockwood IT Solutions, LLC",
        )
      ) {
        structuredLegalNameFound = true;
      }
    } catch {
      errors.push(`${display}: contains an invalid JSON-LD block`);
    }
  }
}

if (!structuredLegalNameFound) {
  errors.push(
    "generated HTML: Organization structured data is missing legalName",
  );
}

const controlledPublicationPatterns = [
  {
    description: "an EIN-formatted value",
    pattern: /\b\d{2}-\d{7}\b/,
  },
  {
    description: "a D-U-N-S reference",
    pattern: /D-U-N-S/i,
  },
  {
    description: "a standalone DUNS reference",
    pattern: /\bDUNS\b/i,
  },
  {
    description: "the phrase provider notice address",
    pattern: /provider notice address/i,
  },
];

for (const [file, document] of documents) {
  const display = relative(root, file);

  for (const check of controlledPublicationPatterns) {
    if (check.pattern.test(document.html)) {
      errors.push(`${display}: contains ${check.description}`);
    }
  }
}

for (const required of [
  "staticwebapp.config.json",
  "robots.txt",
  "sitemap.xml",
  "lockwood-logo-approved.png",
  "lockwood-mark-approved.png",
  "icon.png",
  "apple-icon.png",
]) {
  if (!(await exists(resolve(root, required)))) errors.push(`missing output file ${required}`);
}

for (const requiredRoute of [
  "index.html",
  "services/index.html",
  "services/managed-it/index.html",
  "services/cybersecurity/index.html",
  "services/microsoft-365/index.html",
  "services/business-continuity/index.html",
  "services/network-infrastructure/index.html",
  "services/projects-advisory/index.html",
  "who-we-help/index.html",
  "why-lockwood/index.html",
  "resources/index.html",
  "service-area/index.html",
  "support/index.html",
  "contact/index.html",
  "privacy/index.html",
  "terms/index.html",
  "404.html",
]) {
  if (!(await exists(resolve(root, requiredRoute)))) errors.push(`missing generated route ${requiredRoute}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Output check passed: ${htmlFiles.length} HTML files, ${internalLinkCount} internal links, ${assetCount} local assets.`);
}
