import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

/**
 * Proxy a request to the backend calendar API with auth token forwarding.
 * Handles session validation, JSON parsing errors, and non-JSON backend responses.
 */
export async function proxyToBackend(backendPath: string, init?: RequestInit): Promise<NextResponse> {
  const BACKEND_URL = process.env.BACKEND_API_URL;
  if (!BACKEND_URL) {
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const session = await getServerSession(authOptions);
  if (!session?.access_token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = await fetch(`${BACKEND_URL}${backendPath}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  try {
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json(
      { success: false, error: `Backend returned ${response.status}` },
      { status: response.status || 502 },
    );
  }
}
