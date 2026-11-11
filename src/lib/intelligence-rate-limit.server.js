import { createHmac } from "node:crypto";
import { getRequest, setResponseStatus } from "@tanstack/react-start/server";
import { neon } from "@neondatabase/serverless";
import { getSecret } from "@/lib/secrets.server";

const REQUESTS_PER_MINUTE = 10;

export async function enforceIntelligenceRateLimit() {
  const connectionString = await getSecret("DATABASE_URL");
  if (!connectionString?.trim()) {
    throw new Error("Missing required DATABASE_URL secret for Intelligence rate limiting.");
  }
  const hashSecret = await getSecret("OPENAI_API_KEY");
  if (!hashSecret?.trim()) {
    throw new Error("Missing required OPENAI_API_KEY secret for Intelligence.");
  }

  const request = getRequest();
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp = forwardedFor?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")?.trim()
    || "unknown";
  const clientKey = createHmac("sha256", hashSecret).update(clientIp).digest("hex");
  const now = new Date();
  const windowStart = new Date(Math.floor(now.getTime() / 60_000) * 60_000);
  const cutoff = new Date(now.getTime() - 48 * 60 * 60 * 1000);
  const sql = neon(connectionString);
  const [result] = await sql`
    WITH cleanup AS (
      DELETE FROM intelligence_rate_limits
      WHERE window_started_at < ${cutoff}
    ), limited AS (
      INSERT INTO intelligence_rate_limits (client_key, window_started_at, request_count)
      VALUES (${clientKey}, ${windowStart}, 1)
      ON CONFLICT (client_key) DO UPDATE SET
        window_started_at = CASE
          WHEN intelligence_rate_limits.window_started_at < EXCLUDED.window_started_at
            THEN EXCLUDED.window_started_at
          ELSE intelligence_rate_limits.window_started_at
        END,
        request_count = CASE
          WHEN intelligence_rate_limits.window_started_at < EXCLUDED.window_started_at THEN 1
          ELSE LEAST(intelligence_rate_limits.request_count + 1, ${REQUESTS_PER_MINUTE + 1})
        END
      RETURNING request_count
    )
    SELECT request_count FROM limited
  `;

  if (result.request_count > REQUESTS_PER_MINUTE) {
    setResponseStatus(429);
    throw Object.assign(new Error("Too many questions. Please wait a minute and try again."), {
      status: 429,
      code: "RATE_LIMITED",
    });
  }
}
