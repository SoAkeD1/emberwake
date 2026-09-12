import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma 7 always connects through a driver adapter now (no more bare
// `datasourceUrl` string) — this one wraps `pg`, pointed at Supabase's
// pooled connection string (DATABASE_URL), not the direct one migrations
// use (DIRECT_URL, see prisma7.config.ts).
function makeClient() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as { prisma?: ReturnType<typeof makeClient> };

// Reuse the client across Next.js dev-mode hot reloads instead of opening a
// fresh pool (and a fresh set of Supabase connections) on every file save.
export const prisma = globalForPrisma.prisma ?? makeClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
