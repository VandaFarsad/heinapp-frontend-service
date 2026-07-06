import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_WORKSHOP_API_URL ?? process.env.NEXT_PUBLIC_BACKEND_WORKSHOP_API_URL;

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.access_token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = await fetch(`${BACKEND_URL}slots/available-slots/`, {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
