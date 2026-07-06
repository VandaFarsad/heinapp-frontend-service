import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const BACKEND_API_URL = process.env.BACKEND_API_URL;
  if (!BACKEND_API_URL) {
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  try {
    const body = await request.json();

    const response = await fetch(`${BACKEND_API_URL}contact/submit/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 });
  }
}
