"use server";

import axios from "axios";

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

export const getCollectorBinActions = async (collectorId: string) => {
  try {
    const res = await axios.get(SERVER_URL + `/user/${collectorId}`);
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
    const res = await axios.post(process.env.SERVER_URL + "/binAction/", data);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
