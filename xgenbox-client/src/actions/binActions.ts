"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

const SERVER_URL = process.env.SERVER_URL + "/binAction";

export async function getCompanyBinActions(companyId: string) {
  try {
    const res = await axios.get(SERVER_URL + `/company/${companyId}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export const getBinActionsByUser = async (userId: string) => {
  try {
    const res = await axios.get(SERVER_URL + `/user/${userId}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export async function getBinActionsByBin(binId: string) {
  try {
    const res = await axios.get(SERVER_URL + `/bin/${binId}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getBinActionsByType(type: string) {
  try {
    const res = await axios.get(SERVER_URL + `/type/${type}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function createBinAction(data: any) {
  try {
    const res = await axios.post(SERVER_URL, data);
    revalidatePath("/dashboard/collection/history");
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
