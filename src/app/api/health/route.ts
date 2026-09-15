import { sql } from "drizzle-orm";

/**
 * Statically prerendered so the same code works on the platform server build
 * and in the zero-config GitHub Pages static export (STATIC_EXPORT=true).
 *
 * The DB client is imported LAZILY so builds without DATABASE_URL (e.g. the
 * GitHub Actions Pages workflow) never touch the database module at all.
 */
export const dynamic = "force-static";

export async function GET() {
  if (process.env.STATIC_EXPORT === "true") {
    return Response.json({ ok: true, mode: "static" });
  }
  let dbOk = false;
  try {
    const { db } = await import("@/db");
    await db.execute(sql`select 1`);
    dbOk = true;
  } catch {
    dbOk = false;
  }
  return Response.json({ ok: true, db: dbOk });
}
