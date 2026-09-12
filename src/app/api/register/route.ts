import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

const RegisterSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(200),
});

/** Turns "wanderer@keep.realm" into a starting username like "wanderer", disambiguated if taken. */
async function uniqueUsernameFrom(email: string): Promise<string> {
  const base = email
    .split("@")[0]
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "")
    .slice(0, 20) || "wanderer";

  let candidate = base;
  let suffix = 0;
  // The table is tiny at this stage of the project; a few sequential lookups is fine.
  while (await prisma.user.findUnique({ where: { username: candidate }, select: { id: true } })) {
    suffix += 1;
    candidate = `${base}${suffix}`;
  }
  return candidate;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = RegisterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "A name of record and a ward of at least 8 characters are required." }, { status: 400 });
  }
  const { email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (existing) {
    return NextResponse.json({ error: "That name of record is already sworn to the gate." }, { status: 409 });
  }

  const username = await uniqueUsernameFrom(email);
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      email,
      username,
      displayName: username,
      passwordHash,
    },
  });

  return NextResponse.json({ ok: true });
}
