import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}

export async function getUserFromToken(): Promise<JwtPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
    return decoded;
  } catch (error) {
    console.log(error)
    return null;
  }
}
