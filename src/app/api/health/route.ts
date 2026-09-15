import { db } from "@/db";
import { sql } from "drizzle-orm";

/**
 * Statically prerendered so the same code works on the platform server build
 * and in the zero-config GitHub Pages static export (STATIC_EXPORT=true).
 * The DB ping is best-effort and never fails the health response.
 */
export const dynamic = "force-static";

export async function GET() {
  let dbOk = false;
  try {
    await db.execute(sql`select 1`);
    dbOk = true;
  } catch {
    dbOk = false;
  }
  return Response.json({ ok: true, db: dbOk });
}
