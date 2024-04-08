"use server";

import axios from "axios";

export const getCompanies = async () => {
  try {
    const response = await axios.get(
      process.env.SERVER_URL + "/user/type/company",
    );
    return response.data;
  } catch (error: any) {
    console.error(error?.response?.data?.error || error.message);
  }
};
