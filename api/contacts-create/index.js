const crypto = require("node:crypto");

const DEFAULT_ORIGINS = [
  "https://lockwooditsolutions.com",
  "https://www.lockwooditsolutions.com",
];

const SERVICE_OPTIONS = new Set([
  "Managed IT Services",
  "Managed Cybersecurity",
  "Microsoft 365 and Cloud",
  "Backup and Business Continuity",
  "Network and Infrastructure",
  "Projects and Advisory",
  "Not sure yet",
]);

const TEAM_SIZE_OPTIONS = new Set([
  "1-9",
  "10-24",
  "25-49",
  "50-99",
  "100+",
  "Not sure",
]);

module.exports = async function contactsCreate(context, req) {
  const requestId = crypto.randomUUID();

  if (req.method === "OPTIONS") {
    context.res = {
      status: 204,
      headers: corsHeaders(req),
    };
    return;
  }

  if (req.method !== "POST") {
    context.res = jsonResponse(405, { ok: false, error: "Method not allowed", requestId }, req, {
      Allow: "POST, OPTIONS",
    });
    return;
  }

  try {
    if (!isAllowedOrigin(req)) {
      context.log.warn("Contact request rejected", { requestId, reason: "origin" });
      context.res = jsonResponse(403, { ok: false, error: "Forbidden", requestId }, req);
      return;
    }

    if (!isJsonRequest(req)) {
      context.res = jsonResponse(415, { ok: false, error: "Content-Type must be application/json", requestId }, req);
      return;
    }

    if (bodySize(req.body) > 12_000) {
      context.res = jsonResponse(413, { ok: false, error: "Request is too large", requestId }, req);
      return;
    }

    const body = parseBody(req.body);
    const startedAt = Number(body.startedAt || 0);
    const elapsed = Date.now() - startedAt;

    // Quietly acknowledge obvious bot submissions without sending anything.
    if (clean(body.website, 250) || !Number.isFinite(startedAt) || startedAt <= 0 || elapsed < 1500) {
      context.log.info("Contact request filtered", { requestId, reason: "automated" });
      context.res = jsonResponse(200, { ok: true, requestId }, req);
      return;
    }

    const lead = {
      name: clean(body.name, 100),
      email: clean(body.email, 254).toLowerCase(),
      phone: clean(body.phone, 40),
      company: clean(body.company, 120),
      teamSize: clean(body.teamSize, 40),
      service: clean(body.service, 80),
      message: clean(body.message, 4000),
      source: clean(body.source, 40) || "website",
      path: clean(body.path, 200) || "/contact",
      consent: body.consent === true,
      createdAt: new Date().toISOString(),
    };

    const validationError = validate(lead);
    if (validationError) {
      context.res = jsonResponse(400, { ok: false, error: validationError, requestId }, req);
      return;
    }

    const configuration = readConfiguration();
    if (!configuration.ok) {
      context.log.error("Contact delivery is not configured", {
        requestId,
        missing: configuration.missing,
      });
      context.res = jsonResponse(
        503,
        { ok: false, error: "Contact service is temporarily unavailable", requestId },
        req,
      );
      return;
    }

    const sendResult = await sendEmail(lead, configuration.value, requestId);
    if (!sendResult.ok) {
      context.log.error("Contact notification failed", {
        requestId,
        status: sendResult.status,
        providerRequestId: sendResult.providerRequestId,
      });
      context.res = jsonResponse(
        502,
        { ok: false, error: "Unable to deliver the request", requestId },
        req,
      );
      return;
    }

    context.log.info("Contact request accepted", {
      requestId,
      source: lead.source,
      service: lead.service,
      teamSize: lead.teamSize,
      providerRequestId: sendResult.providerRequestId,
    });

    context.res = jsonResponse(200, { ok: true, requestId }, req);
  } catch (error) {
    context.log.error("Contact endpoint failed", {
      requestId,
      ...safeError(error),
    });
    context.res = jsonResponse(
      500,
      { ok: false, error: "Unable to process the request", requestId },
      req,
    );
  }
};

function parseBody(body) {
  if (!body) return {};
  if (typeof body === "object") return body;
  try {
    return JSON.parse(body);
  } catch {
    return {};
  }
}

function bodySize(body) {
  try {
    return Buffer.byteLength(typeof body === "string" ? body : JSON.stringify(body || {}), "utf8");
  } catch {
    return Number.POSITIVE_INFINITY;
  }
}

function clean(value, maxLength) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

function validate(lead) {
  if (lead.name.length < 2) return "Please enter your name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return "Please enter a valid email address";
  if (lead.phone && !/^[0-9+().\-\s]{7,40}$/.test(lead.phone)) return "Please enter a valid phone number";
  if (!TEAM_SIZE_OPTIONS.has(lead.teamSize)) return "Please select a team size";
  if (!SERVICE_OPTIONS.has(lead.service)) return "Please select a service area";
  if (lead.message.length < 20) return "Please include a little more detail";
  if (!lead.consent) return "Consent is required";
  return "";
}

function readConfiguration() {
  const key = clean(process.env.SENDGRID_API_KEY, 500);
  const from = clean(process.env.CONTACT_FROM, 254);
  const to = String(process.env.CONTACT_TO || "")
    .split(",")
    .map((value) => clean(value, 254).toLowerCase())
    .filter(Boolean);

  const missing = [];
  if (!key) missing.push("SENDGRID_API_KEY");
  if (!isEmail(from)) missing.push("CONTACT_FROM");
  if (!to.length || to.some((value) => !isEmail(value))) missing.push("CONTACT_TO");

  return missing.length
    ? { ok: false, missing }
    : { ok: true, value: { key, from, to } };
}

async function sendEmail(lead, configuration, requestId) {
  const subjectName = lead.name.replace(/[\r\n]/g, " ").slice(0, 80);
  const text = [
    "New Lockwood IT Solutions website request",
    `Request ID: ${requestId}`,
    `Submitted: ${lead.createdAt}`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || "Not provided"}`,
    `Company: ${lead.company || "Not provided"}`,
    `Team size: ${lead.teamSize}`,
    `Service interest: ${lead.service}`,
    `Page: ${lead.path}`,
    "",
    lead.message,
  ].join("\n");

  const html = `
    <h2>New Lockwood IT Solutions website request</h2>
    <p><strong>Request ID:</strong> ${escapeHtml(requestId)}</p>
    <p><strong>Submitted:</strong> ${escapeHtml(lead.createdAt)}</p>
    <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(lead.phone || "Not provided")}</p>
    <p><strong>Company:</strong> ${escapeHtml(lead.company || "Not provided")}</p>
    <p><strong>Team size:</strong> ${escapeHtml(lead.teamSize)}</p>
    <p><strong>Service interest:</strong> ${escapeHtml(lead.service)}</p>
    <p><strong>Page:</strong> ${escapeHtml(lead.path)}</p>
    <hr />
    <p style="white-space:pre-wrap">${escapeHtml(lead.message)}</p>
  `;

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${configuration.key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: configuration.to.map((email) => ({ email })),
          subject: `Website request from ${subjectName}`,
        },
      ],
      from: {
        email: configuration.from,
        name: "Lockwood IT Solutions Website",
      },
      reply_to: {
        email: lead.email,
        name: lead.name,
      },
      content: [
        { type: "text/plain", value: text },
        { type: "text/html", value: html },
      ],
      categories: ["website-contact"],
    }),
    signal: AbortSignal.timeout(10_000),
  });

  return {
    ok: response.ok,
    status: response.status,
    providerRequestId: response.headers.get("x-message-id") || "",
  };
}

function isJsonRequest(req) {
  const contentType = String(req.headers?.["content-type"] || req.headers?.["Content-Type"] || "");
  return !contentType || contentType.toLowerCase().includes("application/json");
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));
}

function isAllowedOrigin(req) {
  const origin = req.headers?.origin || req.headers?.Origin;
  if (!origin) return true;

  const configured = String(process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const allowed = new Set([...DEFAULT_ORIGINS, ...configured]);

  if (allowed.has(origin)) return true;

  try {
    const requestHost = req.headers?.["x-forwarded-host"] || req.headers?.host;
    return Boolean(requestHost && new URL(origin).host === requestHost);
  } catch {
    return false;
  }
}

function corsHeaders(req) {
  const origin = req.headers?.origin || req.headers?.Origin;
  const allowOrigin = origin && isAllowedOrigin(req) ? origin : DEFAULT_ORIGINS[0];

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store",
    Vary: "Origin",
  };
}

function jsonResponse(status, body, req, extraHeaders = {}) {
  return {
    status,
    headers: {
      ...corsHeaders(req),
      "Content-Type": "application/json; charset=utf-8",
      ...extraHeaders,
    },
    body,
  };
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]);
}

function safeError(error) {
  if (!error) return { name: "Error", message: "Unknown error" };
  return {
    name: clean(error.name || "Error", 80),
    message: clean(error.message || "Unknown error", 300),
    code: clean(error.code || "", 80),
  };
}
