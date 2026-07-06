"use client";

import Link from "next/link";
import { useState } from "react";
import { api } from "../api/helpers";

export default function PasswordResetPage() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await api.post("users/reset_password/", { email });
      if (res.ok) {
        setSuccess(
          "Wenn ein Konto mit dieser E-Mail-Adresse existiert, wurde eine E-Mail zum Zurücksetzen des Passworts gesendet.",
        );
      } else {
        setError("Fehler beim Senden der E-Mail zum Zurücksetzen des Passworts.");
      }
    } catch (err) {
      setError("Ein Netzwerkfehler ist aufgetreten.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">Passwort zurücksetzen</h2>
        {success && <div className="mb-4 rounded-md bg-green-100 p-4 text-green-800">{success}</div>}
        {error && <div className="mb-4 rounded-md bg-red-100 p-4 text-red-800">{error}</div>}
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
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
          >
            Link zum Zurücksetzen senden
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/login" className="text-sm text-green-600 hover:text-green-800">
            Zurück zum Login
          </Link>
        </div>
      </div>
    </div>
  );
}
