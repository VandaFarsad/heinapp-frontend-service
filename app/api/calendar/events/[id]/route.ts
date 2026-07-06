import { NextRequest } from "next/server";
import { proxyToBackend } from "../../proxy";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  return proxyToBackend(`calendar/events/${id}/`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxyToBackend(`calendar/events/${id}/`, {
    method: "DELETE",
  });
}
