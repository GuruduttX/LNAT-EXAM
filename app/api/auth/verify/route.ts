import { NextResponse } from "next/server";

import { requireAdminRequest, verifyAdminToken } from "@/lib/adminAuth";

export async function GET(request: Request) {
  const authError = requireAdminRequest(request);
  if (authError) return authError;

  const token = request.headers
    .get("authorization")
    ?.replace("Bearer ", "")
    .trim();
  const admin = token ? verifyAdminToken(token) : null;

  if (!admin) {
    return NextResponse.json(
      { error: "Admin session is invalid or expired." },
      { status: 401 },
    );
  }

  return NextResponse.json({
    admin: {
      email: admin.email,
      role: admin.role,
    },
  });
}
