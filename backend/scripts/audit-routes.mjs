/**
 * Backend route audit script.
 * Run while server is up: node scripts/audit-routes.mjs
 *
 * Unauthenticated protected routes should NOT return 404 (route missing).
 * Clerk typically returns 302 redirect when no session is present.
 */

const BASE = process.env.API_BASE || "http://localhost:3000";

const routes = [
  { method: "GET", path: "/health", public: true, expect: 200 },
  { method: "GET", path: "/api/chat/token" },
  { method: "POST", path: "/api/sessions", body: { problem: "Two Sum", difficulty: "easy" } },
  { method: "GET", path: "/api/sessions/active" },
  { method: "GET", path: "/api/sessions/my-recent" },
  { method: "GET", path: "/api/sessions/507f1f77bcf86cd799439011" },
  { method: "POST", path: "/api/sessions/507f1f77bcf86cd799439011/join" },
  { method: "POST", path: "/api/sessions/507f1f77bcf86cd799439011/end" },
  { method: "DELETE", path: "/api/sessions/507f1f77bcf86cd799439011" },
  { method: "GET", path: "/api/unknown-route", expect: 404, public: true },
];

const authProtectedOk = new Set([401, 403, 302, 307]);

async function hit(route) {
  const init = {
    method: route.method,
    redirect: "manual",
    headers: { Accept: "application/json" },
  };

  if (route.body !== undefined) {
    init.headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(route.body);
  }

  const res = await fetch(`${BASE}${route.path}`, init);
  return res.status;
}

async function main() {
  console.log(`Auditing routes at ${BASE}\n`);

  let pass = 0;
  let fail = 0;

  for (const route of routes) {
    let status;
    try {
      status = await hit(route);
    } catch (error) {
      console.log(`FAIL ${route.method} ${route.path} -> ERROR: ${error.message}`);
      fail += 1;
      continue;
    }

    let ok = false;
    if (route.public) {
      ok = status === (route.expect ?? 200);
    } else {
      ok = authProtectedOk.has(status);
    }

    const label = ok ? "PASS" : "FAIL";
    if (ok) pass += 1;
    else fail += 1;

    const note = route.public ? "public" : "auth-protected";
    console.log(`${label} ${route.method.padEnd(6)} ${route.path} -> ${status} (${note})`);
  }

  console.log(`\nSummary: ${pass} passed, ${fail} failed`);

  if (fail > 0) process.exit(1);
}

main();
