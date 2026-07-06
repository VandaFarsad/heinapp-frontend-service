import { UserType } from "@/types/next-auth";

export interface ResponseToken {
  access: string;
  user: UserType;
}

/**
 * Returns the current epoch time in seconds.
 * @returns The current epoch time in seconds.
 */
export const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};

/**
 * Retrieves the backend access token using the provided credentials.
 * @param credentials - The user's login credentials.
 * @returns A promise that resolves to the bacnkend access token if successful, otherwise null.
 */
export const getBackendAccessToken = async (credentials: Record<"email" | "password", string> | undefined) => {
  if (!credentials) {
    return null;
  }
  const response = await fetch(process.env.NEXTAUTH_BACKEND_URL || "", {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    console.error("Failed to fetch access token:", response.statusText);
    return null;
  }

  const data: ResponseToken = await response.json();
  if (data) {
    return { ...data, id: data.user.pk.toString() };
  }

  console.error("No data received from backend:", data);
  return null;
};

const API_URL = process.env.NEXT_PUBLIC_BACKEND_AUTH_URL;

/**
 * Parses API error responses into a human-readable error message.
 * Handles the common Django REST Framework error format: { field: ["error1", "error2"] }
 */
export const parseApiError = (errorData: unknown, fallback: string): string => {
  if (errorData && typeof errorData === "object") {
    const messages = Object.values(errorData as Record<string, unknown>).flat();
    if (messages.length > 0) {
      return messages.join(" ");
    }
  }
  return fallback;
};

export const api = {
  async patch(url: string, body: Record<string, unknown>, accessToken: string) {
    const response = await fetch(`${API_URL}${url}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });
    return response;
  },

  async post(url: string, body: Record<string, unknown>, accessToken?: string) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
    const response = await fetch(`${API_URL}${url}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    return response;
  },

  async delete(url: string, accessToken: string, body?: Record<string, unknown>) {
    const response = await fetch(`${API_URL}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });
    return response;
  },
};
