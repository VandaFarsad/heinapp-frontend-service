"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackUrl");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", {
      email,
      password,
      callbackUrl: callbackUrl || "/",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">Login</h2>
        {error && (
          <div className="mb-4 rounded-md bg-red-100 p-4 text-red-800">
            Anmeldedaten sind ungültig. Bitte versuchen Sie es erneut.
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-Mail-Adresse
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Passwort
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
          >
            Anmelden
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/password-reset" className="text-sm text-green-600 hover:text-green-800">
            Passwort vergessen?
          </Link>
        </div>
        <div className="mt-2 text-center text-sm text-gray-600">
          Noch keinen Account?{" "}
          <Link href="/register" className="font-medium text-green-600 hover:text-green-800">
            Hier registrieren
          </Link>
        </div>
      </div>
    </div>
  );
}
