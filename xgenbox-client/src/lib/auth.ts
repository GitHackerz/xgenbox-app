"use server";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { User } from "@/types/User";

const key = new TextEncoder().encode(process.env.JWT_SECRET);

export async function decryptToken(token: string): Promise<User | null> {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });

    return payload._doc as User;
  } catch (error: any) {
    return null;
  }
}

export async function getSession(): Promise<{
  user: User;
  token: string;
} | null> {
  const token = cookies().get("session")?.value;
  if (!token) return null;

  const user = await decryptToken(token);
  if (!user) return null;

  return {
    user,
    token,
  };
}

export async function setSession(token: string) {
  cookies().set("session", token);
}

export async function clearSession() {
  cookies().set("session", "", { expires: new Date(0) });
}
