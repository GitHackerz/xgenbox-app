"use server";

import axios from "axios";
import { clearSession, setSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const createAccount = async (data: any) => {
  try {
    await axios.post(`${process.env.SERVER_URL}/user`, data);
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      error: error?.response?.data?.error || error.message,
      success: false,
    };
  }
};

export const loginAccount = async (data: any) => {
  try {
    const response = await axios.post(
      `${process.env.SERVER_URL}/user/signin`,
      data,
    );
    const { token } = response.data;

    await setSession(token);
    return {
      token,
    };
  } catch (error: any) {
    return {
      error: error?.response?.data?.error || error.message,
    };
  }
};

export const logoutAccount = async () => {
  await clearSession();
  redirect("/sign-in");
};
