"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

const SERVER_URL = process.env.SERVER_URL + "/bin";

export async function getBins() {
  try {
    const res = await axios.get(SERVER_URL);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getCompanyBins(companyId: string | null) {
  try {
    if (!companyId) return [];

    console.log(companyId);
    const res = await axios.get(SERVER_URL + `/company/${companyId}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getBin(id: string) {
  try {
    const res = await axios.get(SERVER_URL + `/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function createBin(data: any) {
  try {
    const res = await axios.post(SERVER_URL, data);
    revalidatePath("/dashboard/bin");
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function updateBin(id: string, data: any) {
  try {
    const res = await axios.put(SERVER_URL + `/${id}`, data);
    revalidatePath("/dashboard/bin");
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function deleteBin(id: string) {
  try {
    const res = await axios.delete(SERVER_URL + `/${id}`);
    revalidatePath("/dashboard/bin");
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function approveBin(id: string) {
  try {
    const res = await axios.get(SERVER_URL + `/${id}/approve`);
    revalidatePath("/dashboard/bin");
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function rejectBin(id: string) {
  try {
    const res = await axios.get(SERVER_URL + `/${id}/reject`);
    revalidatePath("/dashboard/bin");
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
