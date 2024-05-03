"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

const SERVER_URL = process.env.SERVER_URL + "/user";

export const getUsers = async () => {
  try {
    const response = await axios.get(SERVER_URL);
    return response.data;
  } catch (error: any) {
    console.error(error?.response?.data?.error || error.message);
    return [];
  }
};

export const getCompanyUsers = async (companyId: string) => {
  try {
    const response = await axios.get(SERVER_URL + `/company/${companyId}`);
    return response.data;
  } catch (error: any) {
    console.error(error?.response?.data?.error || error.message);
    return [];
  }
};

export const approveUser = async (id: string) => {
  try {
    const response = await axios.get(SERVER_URL + `/${id}/approve`);
    revalidatePath("/dashboard/user");
    return response.data;
  } catch (error: any) {
    console.error(error?.response?.data?.error || error.message);
  }
};

export const rejectUser = async (id: string) => {
  try {
    const response = await axios.get(SERVER_URL + `/${id}/reject`);
    revalidatePath("/dashboard/user");
    return response.data;
  } catch (error: any) {
    console.error(error?.response?.data?.error || error.message);
  }
};

export const grantUser = async (id: string) => {
  try {
    const response = await axios.get(SERVER_URL + `/${id}/grant`);
    revalidatePath("/dashboard/user");
    return response.data;
  } catch (error: any) {
    console.error(error?.response?.data?.error || error.message);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(SERVER_URL + `/${id}`);
    revalidatePath("/dashboard/user");
    return response.data;
  } catch (error: any) {
    console.error(error?.response?.data?.error || error.message);
  }
};
