"use server";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const key = new TextEncoder().encode(process.env.JWT_SECRET);

export async function decryptToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error: any) {
    return null;
  }
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decryptToken(session);
}

export async function setSession(token: string) {
  cookies().set("session", token);
}
