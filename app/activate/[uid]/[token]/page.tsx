"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ActivatePage() {
  const { uid, token } = useParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (typeof uid === "string" && typeof token === "string") {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_ACTIVATE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, token }),
      })
        .then((res) => {
          if (res.ok) setStatus("success");
          else throw new Error("Invalid");
        })
        .catch(() => setStatus("error"));
    }
  }, [uid, token]);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              Konto wird aktiviert...
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Bitte einen Moment Geduld.</p>
          </>
        );
      case "success":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-green-600 dark:text-green-400">Konto aktiviert!</h1>
            <p className="text-gray-700 dark:text-gray-300">
              Dein Konto wurde erfolgreich aktiviert. Du kannst dich jetzt einloggen.
            </p>
            <Link
              href="/login"
              className="inline-block w-full rounded-lg bg-green-600 px-4 py-3 text-center font-bold text-white transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
            >
              Zum Login
            </Link>
          </div>
        );
      case "error":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-red-600 dark:text-red-400">
              Aktivierung fehlgeschlagen
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              Der Aktivierungslink ist ungültig oder bereits abgelaufen.
            </p>
            <Link
              href="/register"
              className="inline-block w-full rounded-lg bg-gray-600 px-4 py-3 text-center font-bold text-white transition-colors hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
            >
              Erneut registrieren
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
        {renderContent()}
      </div>
    </div>
  );
}
