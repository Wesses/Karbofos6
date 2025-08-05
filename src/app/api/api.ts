/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

axios.defaults.baseURL = "https://communal.in.ua/Karbofos6api/api/";
const authenticatePath = "Authenticate";

export const postLoginReq = async (data: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axios.post(authenticatePath + "/login", data);

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (e: any) {
    console.error("Помилка при виконанні запиту:", e);
    throw e?.response?.status || "Unknown error";
  }
};
