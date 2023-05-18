import jwt, { JwtPayload } from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "secret";

export function getUserIdFromToken(token: string): number | null {
  try {
    const decoded = jwt.verify(
      token.split("Bearer ")[1],
      JWT_SECRET
    ) as JwtPayload;
    return decoded?.id || null;
  } catch {
    return null;
  }
}
