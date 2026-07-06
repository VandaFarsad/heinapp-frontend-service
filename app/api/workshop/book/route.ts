import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_WORKSHOP_API_URL ?? process.env.NEXT_PUBLIC_BACKEND_WORKSHOP_API_URL;

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.access_token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const response = await fetch(`${BACKEND_URL}slots/book-slot/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.access_token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const slotId = searchParams.get("slotId");

  const response = await fetch(`${BACKEND_URL}slots/cancel-slot/?slotId=${encodeURIComponent(slotId ?? "")}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
