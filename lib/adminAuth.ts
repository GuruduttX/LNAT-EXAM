import jwt, { type JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

const TOKEN_EXPIRES_IN = "7d";

export type AdminTokenPayload = JwtPayload & {
  email: string;
  role: "admin";
};

export function getAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    jwtSecret: process.env.JWT_SECRET,
  };
}

export function hasAdminAuthConfig() {
  const { email, password, jwtSecret } = getAdminCredentials();
  return Boolean(email && password && jwtSecret);
}

export function signAdminToken(email: string) {
  const { jwtSecret } = getAdminCredentials();

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign({ email, role: "admin" }, jwtSecret, {
    expiresIn: TOKEN_EXPIRES_IN,
  });
}

export function verifyAdminToken(token: string) {
  const { jwtSecret } = getAdminCredentials();

  if (!jwtSecret) return null;

  try {
    const decoded = jwt.verify(token, jwtSecret);

    if (
      typeof decoded === "object" &&
      decoded !== null &&
      decoded.role === "admin" &&
      typeof decoded.email === "string"
    ) {
      return decoded as AdminTokenPayload;
    }

    return null;
  } catch {
    return null;
  }
}

function getBearerToken(request: Request) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) return "";

  return authorization.replace("Bearer ", "").trim();
}

export function requireAdminRequest(request: Request) {
  const token = getBearerToken(request);
  const admin = token ? verifyAdminToken(token) : null;

  if (!admin) {
    return NextResponse.json(
      { error: "Admin authorization is required." },
      { status: 401 },
    );
  }

  return null;
}
