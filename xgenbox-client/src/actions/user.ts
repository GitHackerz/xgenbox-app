"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

export const getUsers = async () => {
  try {
    const response = await axios.get(process.env.SERVER_URL + "/user");
    return response.data;
  } catch (error: any) {
    console.error(error?.response?.data?.error || error.message);
    return [];
  }
};

export const approveUser = async (id: string) => {
  try {
    console.log(process.env.SERVER_URL + `/user/${id}/approve`);
    const response = await axios.get(
      process.env.SERVER_URL + `/user/${id}/approve`,
    );
    revalidatePath("/dashboard/user");
    return response.data;
  } catch (error: any) {
    console.error(error?.response?.data?.error || error.message);
  }
};

export const rejectUser = async (id: string) => {
  try {
    const response = await axios.get(
      process.env.SERVER_URL + `/user/${id}/reject`,
    );
    revalidatePath("/dashboard/user");
    return response.data;
  } catch (error: any) {
    console.error(error?.response?.data?.error || error.message);
  }
};

export const getPendingUsers = async () => {
  try {
    const response = await axios.get(process.env.SERVER_URL + "/user/pending");
    return response.data;
  } catch (error: any) {
    console.log(error?.response?.data?.error || error.message);
    console.error(error?.response?.data?.error || error.message);
    return [];
  }
};
