import { getDb } from "@/db";
import { waitlist } from "@/db/schema";
import { z } from "zod";

export const dynamic = "force-dynamic";

const payloadSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  interest: z.enum(["product", "developer"]).default("product"),
});

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "production" && request.headers.get("x-vaux-simulate-failure") === "1") {
    return Response.json({ message: "Temporary service issue. Please try again." }, { status: 503 });
  }
  let input: unknown;
  try { input = await request.json(); } catch { return Response.json({ message: "Invalid request." }, { status: 400 }); }
  const parsed = payloadSchema.safeParse(input);
  if (!parsed.success) return Response.json({ message: "Enter a valid email address." }, { status: 400 });
  try {
    await getDb().insert(waitlist).values({ ...parsed.data, createdAt: new Date().toISOString() }).onConflictDoNothing({ target: waitlist.email });
    return Response.json({ ok: true, message: "You're on the list." });
  } catch (error) {
    console.error("Waitlist insert failed", error);
    return Response.json({ message: "We couldn’t save that just now. Please try again." }, { status: 500 });
  }
}
