"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

export async function getBins() {
  try {
    const res = await axios.get(process.env.SERVER_URL + "/bin");
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getBin(id: string) {
  try {
    const res = await axios.get(process.env.SERVER_URL + `/bin/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function createBin(data: any) {
  try {
    const res = await axios.post(process.env.SERVER_URL + "/bin", data);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function updateBin(id: string, data: any) {
  try {
    const res = await axios.put(process.env.SERVER_URL + `/bin/${id}`, data);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function deleteBin(id: string) {
  try {
    const res = await axios.delete(process.env.SERVER_URL + `/bin/${id}`);
    revalidatePath("/dashboard/bin");
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
