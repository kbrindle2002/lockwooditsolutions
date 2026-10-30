const assert = require("node:assert/strict");
const test = require("node:test");
const handler = require("../contacts-create/index.js");

const allowedOrigin = "https://lockwooditsolutions.com";
const originalFetch = global.fetch;

function createContext() {
  return {
    res: null,
    log: {
      info() {},
      warn() {},
      error() {},
    },
  };
}

async function invoke(req) {
  const context = createContext();
  await handler(context, req);
  return context.res;
}

function validBody(overrides = {}) {
  return {
    name: "Test User",
    email: "test@example.com",
    phone: "262-555-0100",
    company: "Example Company",
    teamSize: "10-24",
    service: "Managed IT Services",
    message: "This is a valid test request with enough detail.",
    source: "website",
    path: "/contact",
    consent: true,
    website: "",
    startedAt: Date.now() - 2500,
    ...overrides,
  };
}

function request(body = validBody(), overrides = {}) {
  return {
    method: "POST",
    headers: {
      origin: allowedOrigin,
      "content-type": "application/json",
      host: "lockwooditsolutions.com",
      ...(overrides.headers || {}),
    },
    body,
    ...overrides,
  };
}

function configureDelivery() {
  process.env.SENDGRID_API_KEY = "SG.test-key";
  process.env.CONTACT_FROM = "website@lockwooditsolutions.com";
  process.env.CONTACT_TO = "info@lockwooditsolutions.com";
}

function clearSettings() {
  delete process.env.SENDGRID_API_KEY;
  delete process.env.CONTACT_FROM;
  delete process.env.CONTACT_TO;
  delete process.env.ALLOWED_ORIGINS;
  global.fetch = originalFetch;
}

test.beforeEach(clearSettings);
test.after(clearSettings);

test("answers preflight requests", async () => {
  const response = await invoke({ method: "OPTIONS", headers: { origin: allowedOrigin } });
  assert.equal(response.status, 204);
  assert.equal(response.headers["Access-Control-Allow-Origin"], allowedOrigin);
});

test("rejects unsupported methods", async () => {
  const response = await invoke({ method: "GET", headers: { origin: allowedOrigin } });
  assert.equal(response.status, 405);
  assert.equal(response.headers.Allow, "POST, OPTIONS");
});

test("rejects an unapproved browser origin", async () => {
  const response = await invoke(request(validBody(), { headers: { origin: "https://example.invalid" } }));
  assert.equal(response.status, 403);
});

test("requires JSON content", async () => {
  const response = await invoke(request(validBody(), { headers: { origin: allowedOrigin, "content-type": "text/plain" } }));
  assert.equal(response.status, 415);
});

test("validates submitted fields", async () => {
  const response = await invoke(request(validBody({ email: "not-an-email" })));
  assert.equal(response.status, 400);
});

test("quietly accepts honeypot submissions without delivery", async () => {
  global.fetch = async () => {
    throw new Error("fetch should not be called");
  };
  const response = await invoke(request(validBody({ website: "bot.example" })));
  assert.equal(response.status, 200);
  assert.equal(response.body.ok, true);
});

test("quietly accepts submissions completed too quickly", async () => {
  const response = await invoke(request(validBody({ startedAt: Date.now() })));
  assert.equal(response.status, 200);
  assert.equal(response.body.ok, true);
});

test("fails safely when delivery is not configured", async () => {
  const response = await invoke(request());
  assert.equal(response.status, 503);
});

test("sends a valid request through SendGrid", async () => {
  configureDelivery();
  let captured;
  global.fetch = async (url, options) => {
    captured = { url, options };
    return {
      ok: true,
      status: 202,
      headers: new Headers({ "x-message-id": "provider-123" }),
    };
  };

  const response = await invoke(request());
  assert.equal(response.status, 200);
  assert.equal(response.body.ok, true);
  assert.equal(captured.url, "https://api.sendgrid.com/v3/mail/send");
  assert.equal(captured.options.method, "POST");
  assert.match(captured.options.headers.Authorization, /^Bearer /);

  const payload = JSON.parse(captured.options.body);
  assert.equal(payload.reply_to.email, "test@example.com");
  assert.equal(payload.personalizations[0].to[0].email, "info@lockwooditsolutions.com");
});

test("reports provider failures without exposing provider details", async () => {
  configureDelivery();
  global.fetch = async () => ({
    ok: false,
    status: 401,
    headers: new Headers(),
  });

  const response = await invoke(request());
  assert.equal(response.status, 502);
  assert.equal(response.body.ok, false);
  assert.equal(response.body.error, "Unable to deliver the request");
});
