/* eslint-disable @typescript-eslint/no-explicit-any */
import { clearToken, getToken } from "@/lib/auth";
import axios from "axios";

axios.defaults.baseURL = "https://gk50a.biz.ua/Karbofos6api/api/";
const authenticatePath = "Authenticate";
const userAdminPath = "UserAdmin";
const abonInspectorPath = "AbonInspector";

// Attach token from localStorage to all requests except login
axios.interceptors.request.use((config) => {
  try {
    const isLogin = config.url?.includes(`${authenticatePath}/login`);
    if (!isLogin && typeof window !== "undefined") {
      const token = getToken();
      if (token) {
        config.headers = config.headers ?? {};
        (config.headers as Record<string, string>)[
          "Authorization"
        ] = `Bearer ${token}`;
      }
    }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e: any) {
    // noop
  }
  return config;
});

axios.interceptors.response.use(
  (resp) => resp,
  (error) => {
    const status = error?.response?.status;
    if (typeof window !== "undefined" && status === 401) {
      try {
        clearToken();
        window.location.href = "/login";
      } catch {
        // ignore
      }
    }
    return Promise.reject(error);
  }
);

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

// UserAdmin
export const postUserAdminRevoke = async (username: string) => {
  try {
    const response = await axios.post(
      `${userAdminPath}/revoke/${encodeURIComponent(username)}`
    );

    if (response.statusText !== "No Content") {
      throw new Error(response.statusText);
    }

    return "Success";
  } catch (e: any) {
    console.error("Помилка при виконанні запиту:", e);
    throw e?.response?.status || "Unknown error";
  }
};

export const postUserAdminRevokeAll = async () => {
  try {
    const response = await axios.post(`${userAdminPath}/revoke-all`);

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (e: any) {
    console.error("Помилка при виконанні запиту:", e);
    throw e?.response?.status || "Unknown error";
  }
};

export interface UserAdminUser {
  name: string;
  roles: string[];

  abondb: string[];
}

export const postUserAdminListAll = async (): Promise<UserAdminUser[]> => {
  try {
    const response = await axios.post(`${userAdminPath}/list-all`, undefined, {
      headers: { Accept: "application/json" },
    });

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    const data = response.data as unknown;
    if (typeof data === "string") {
      try {
        return JSON.parse(data) as UserAdminUser[];
      } catch {
        // fallback: empty list if server truly returns plain text
        return [];
      }
    }
    return data as UserAdminUser[];
  } catch (e: any) {
    console.error("Помилка при виконанні запиту:", e);
    throw e?.response?.status || "Unknown error";
  }
};

export const postUserAdminAddToRole = async (data: {
  username: string;
  role: string;
}) => {
  try {
    const response = await axios.post(`${userAdminPath}/add-to-role`, data);

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    return "Success";
  } catch (e: any) {
    console.error("Помилка при виконанні запиту:", e);
    throw e?.response?.status || "Unknown error";
  }
};

export const postUserAdminRemoveFromRole = async (data: {
  username: string;
  role: string;
}) => {
  try {
    const response = await axios.post(`${userAdminPath}/remove-from-role`, data);

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (e: any) {
    console.error("Помилка при виконанні запиту:", e);
    throw e?.response?.status || "Unknown error";
  }
};

export const postUserAdminAddDb = async (data: {
  username: string;
  fbDatabaseName: string;
}) => {
  try {
    const response = await axios.post(`${userAdminPath}/add-db`, data);

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (e: any) {
    console.error("Помилка при виконанні запиту:", e);
    throw e?.response?.status || "Unknown error";
  }
};

export const postUserAdminRemoveDb = async (data: {
  username: string;
  fbDatabaseName: string;
}) => {
  try {
    const response = await axios.post(`${userAdminPath}/remove-db`, data);

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (e: any) {
    console.error("Помилка при виконанні запиту:", e);
    throw e?.response?.status || "Unknown error";
  }
};

export const getUserAdminListOfRoles = async () => {
  try {
    const response = await axios.get(`${userAdminPath}/list-roles`);

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (e: any) {
    console.error("Помилка при виконанні запиту:", e);
    throw e?.response?.status || "Unknown error";
  }
};

export const getUserAdminListOfDbs = async () => {
  try {
    const response = await axios.get(`${userAdminPath}/list-db`);

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (e: any) {
    console.error("Помилка при виконанні запиту:", e);
    throw e?.response?.status || "Unknown error";
  }
};

export const getAllRoles = async () => {
  try {
    const response = await axios.get(`${authenticatePath}/my-roles`);

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (e: any) {
    console.error("Помилка при виконанні запиту:", e);
    throw e?.response?.status || "Unknown error";
  }
};

export const getInspectorDBS = async () => {
  try {
    const response = await axios.get(`${abonInspectorPath}/get-inspector-orgs`);

    if (response.statusText !== "OK") {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (e: any) {
    console.error("Помилка при виконанні запиту:", e);
    throw e?.response?.status || "Unknown error";
  }
};
