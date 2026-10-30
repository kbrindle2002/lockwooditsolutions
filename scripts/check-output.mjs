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

const allFiles = await walk(root);
const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));
const documents = new Map();

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  documents.set(file, {
    html,
    ids: new Set(values(html, /\sid=["']([^"']+)["']/g)),
  });
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

for (const required of [
  "staticwebapp.config.json",
  "robots.txt",
  "sitemap.xml",
  "lockwood-logo.svg",
  "lockwood-mark.svg",
  "lockwood-mark.png",
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
