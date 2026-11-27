import { NextRequest, NextResponse } from "next/server";
import type { PackageId } from "@/data/agency";

interface InquiryPayload {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  businessName?: unknown;
  packageId?: unknown;
  message?: unknown;
  companyFaxTrap?: unknown;
  formStartedAt?: unknown;
}

const VALID_PACKAGES = new Set<PackageId>([
  "starter",
  "professional",
  "maintenance",
  "custom",
]);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Lightweight in-memory rate limit per IP (resets across cold starts; pair with edge/KV rate limiting in production)
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 6;
const requestLog = new Map<string, number[]>();

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(ip: string, now: number): boolean {
  const recent = (requestLog.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_WINDOW_MS
  );
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    requestLog.set(ip, recent);
    return true;
  }
  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n\t]+/g, " ").trim().slice(0, maxLength);
}

function cleanMultilineText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/\r/g, "").trim().slice(0, maxLength);
}

export async function POST(req: NextRequest) {
  const now = Date.now();
  const ip = getClientIp(req);

  if (isRateLimited(ip, now)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Too many inquiries submitted recently. Please wait a few minutes or email hello@inlanddigitalstudio.com directly.",
      },
      { status: 429 }
    );
  }

  let body: InquiryPayload;
  try {
    body = (await req.json()) as InquiryPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request format." },
      { status: 400 }
    );
  }

  // Honeypot check: silently acknowledge bot submissions without processing
  if (typeof body.companyFaxTrap === "string" && body.companyFaxTrap.trim().length > 0) {
    return NextResponse.json({
      ok: true,
      referenceId: "IDS-RECEIVED",
      message: "Thank you. Your inquiry has been received.",
    });
  }

  // Reject instant automated submissions (< 1.2s after form render)
  if (typeof body.formStartedAt === "number" && now - body.formStartedAt < 1200) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please take a moment to review your project details before submitting.",
      },
      { status: 400 }
    );
  }

  const name = cleanText(body.name, 80);
  const email = cleanText(body.email, 120).toLowerCase();
  const phone = cleanText(body.phone, 30);
  const businessName = cleanText(body.businessName, 100);
  const message = cleanMultilineText(body.message, 2000);
  const rawPackage = typeof body.packageId === "string" ? body.packageId : "";
  const packageId: PackageId = VALID_PACKAGES.has(rawPackage as PackageId)
    ? (rawPackage as PackageId)
    : "professional";

  const fieldErrors: Record<string, string> = {};

  if (name.length < 2) {
    fieldErrors.name = "Please enter your full name (at least 2 characters).";
  }
  if (!EMAIL_PATTERN.test(email) || /[\r\n]/.test(email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }
  if (businessName.length < 2) {
    fieldErrors.businessName = "Please enter your business or project name.";
  }
  if (message.length < 15) {
    fieldErrors.message =
      "Please share a short summary of your goals (at least 15 characters).";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please fix the highlighted fields.",
        fieldErrors,
      },
      { status: 400 }
    );
  }

  const referenceId = `IDS-${now.toString(36).toUpperCase().slice(-6)}`;

  // Production hook: connect Resend / Postmark / Webhook via process.env.RESEND_API_KEY
  // Intentionally logging sanitized metadata only (no sensitive secrets).
  console.info("[Inland Digital Studio Inquiry]", {
    referenceId,
    packageId,
    businessName,
    hasPhone: Boolean(phone),
    receivedAt: new Date(now).toISOString(),
  });

  return NextResponse.json({
    ok: true,
    referenceId,
    packageId,
    message: `Thanks, ${name}. Your inquiry (${referenceId}) is logged—we respond within one business day.`,
  });
}
