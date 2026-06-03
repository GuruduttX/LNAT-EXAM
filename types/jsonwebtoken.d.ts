declare module "jsonwebtoken" {
  export type Secret = string;

  export interface JwtPayload {
    [key: string]: unknown;
    exp?: number;
    iat?: number;
    sub?: string;
  }

  export interface SignOptions {
    expiresIn?: string | number;
  }

  export function sign(
    payload: string | object | Buffer,
    secretOrPrivateKey: Secret,
    options?: SignOptions,
  ): string;

  export function verify(
    token: string,
    secretOrPublicKey: Secret,
  ): string | JwtPayload;
}
