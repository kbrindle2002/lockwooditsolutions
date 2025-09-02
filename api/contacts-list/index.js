const { TableClient } = require("@azure/data-tables");

const TABLE_NAME = process.env.CONTACTS_TABLE || "Contacts";

module.exports = async function (context, req) {
  // CORS preflight
  if (req.method === "OPTIONS") {
    context.res = {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,x-admin-key"
      }
    };
    return;
  }

  try {
    const adminKey = process.env.ADMIN_KEY;
    const provided = req.headers["x-admin-key"];
    if (!adminKey || !provided || provided !== adminKey) {
      context.res = {
        status: 401,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: { error: "unauthorized" }
      };
      return;
    }

    const conn = process.env.AZURE_TABLES_CONNECTION_STRING;
    if (!conn) throw new Error("Missing AZURE_TABLES_CONNECTION_STRING");

    const client = TableClient.fromConnectionString(conn, TABLE_NAME);

    // Collect at most first ~100 entities (you can add filters or pagination later)
    const out = [];
    const iter = client.listEntities().byPage({ maxPageSize: 100 });
    for await (const page of iter) {
      for (const e of page) {
        out.push({
          name: e.name,
          email: e.email,
          phone: e.phone,
          message: e.message,
          createdAt: e.createdAt,
          source: e.partitionKey
        });
      }
      break; // first page only
    }

    // Newest first
    out.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));

    context.res = {
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: out
    };
  } catch (err) {
    context.log.error(err);
    context.res = {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: { error: "server error" }
    };
  }
};
