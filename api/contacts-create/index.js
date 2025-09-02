const sgMail = require("@sendgrid/mail");
const { TableClient, TableServiceClient } = require("@azure/data-tables");

const TABLE_NAME = process.env.CONTACTS_TABLE || "Contacts";

module.exports = async function (context, req) {
  // CORS preflight
  if (req.method === "OPTIONS") {
    context.res = {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    };
    return;
  }

  try {
    const { name, email, phone, message, source = "website", path = "/", ts } = req.body || {};
    if (!name || !email || !message) {
      context.res = { status: 400, body: { error: "Missing required fields" } };
      return;
    }

    // 1) Save to Azure Table Storage
    const conn = process.env.AZURE_TABLES_CONNECTION_STRING;
    if (!conn) throw new Error("Missing AZURE_TABLES_CONNECTION_STRING");

    const svc = TableServiceClient.fromConnectionString(conn);
    // Ensure table exists (safe to call repeatedly)
    await svc.createTable(TABLE_NAME).catch(() => {});

    const client = TableClient.fromConnectionString(conn, TABLE_NAME);
    const nowIso = (ts && typeof ts === "string") ? ts : new Date().toISOString();
    const rowKey = `${nowIso}_${Math.random().toString(36).slice(2,8)}`;

    await client.createEntity({
      partitionKey: source,   // e.g., 'website'
      rowKey,
      name,
      email,
      phone: phone || "",
      message,
      path,
      createdAt: nowIso,
      status: "new"
    });

    // 2) Email via SendGrid (optional but recommended)
    const apiKey = process.env.SENDGRID_API_KEY;
    const to = process.env.CONTACT_TO || "contact@lockwooditsolutions.com";
    const from = process.env.CONTACT_FROM || "no-reply@lockwooditsolutions.com";
    if (apiKey) {
      sgMail.setApiKey(apiKey);
      await sgMail.send({
        to,
        from,
        subject: `New contact from ${name}`,
        text: `From: ${name} <${email}>\nPhone: ${phone || ""}\nPage: ${path}\n\n${message}`
      });
    }

    context.res = {
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: { ok: true }
    };
  } catch (err) {
    context.log.error(err);
    context.res = {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: { error: "Server error" }
    };
  }
};
