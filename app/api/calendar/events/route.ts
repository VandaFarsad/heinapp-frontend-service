import { NextRequest } from "next/server";
import { proxyToBackend } from "../proxy";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const params = new URLSearchParams();
  for (const [key, value] of searchParams.entries()) {
    params.set(key, value);
  }
  return proxyToBackend(`calendar/events/?${params.toString()}`);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return proxyToBackend("calendar/events/", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
