import { NextResponse } from "next/server";

import {
  getAdminCredentials,
  hasAdminAuthConfig,
  signAdminToken,
} from "@/lib/adminAuth";

export async function POST(request: Request) {
  try {
    if (!hasAdminAuthConfig()) {
      return NextResponse.json(
        {
          error:
            "Admin login is not configured. Please set ADMIN_EMAIL, ADMIN_PASSWORD, and JWT_SECRET.",
        },
        { status: 500 },
      );
    }

    const body = (await request.json()) as {
      email?: unknown;
      password?: unknown;
    };

    const submittedEmail =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const submittedPassword =
      typeof body.password === "string" ? body.password : "";
    const { email, password } = getAdminCredentials();

    const isValid =
      submittedEmail === email?.trim().toLowerCase() &&
      submittedPassword === password;

    if (!isValid || !email) {
      return NextResponse.json(
        { error: "Invalid admin email or password." },
        { status: 401 },
      );
    }

    const token = signAdminToken(email);

    return NextResponse.json({
      token,
      admin: {
        email,
        role: "admin",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to login. Please try again." },
      { status: 500 },
    );
  }
}
