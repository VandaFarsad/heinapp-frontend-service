"use client";

import Link from "next/link";
import { useState } from "react";
import { registerUser, RegisterUserDetails } from "./actions";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Passwörter stimmen nicht überein.");
      setIsLoading(false);
      return;
    }

    const userDetails: RegisterUserDetails = {
      email,
      password,
      re_password: confirmPassword,
      first_name: firstName || undefined,
      last_name: lastName || undefined,
    };

    const result = await registerUser(userDetails);
    setIsLoading(false);

    if (result.success) {
      setSuccess(result.message);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
        {success ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-500">Erfolgreich!</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{success}</p>
            <Link
              href="/login"
              className="mt-6 inline-block w-full rounded-lg bg-green-600 px-4 py-3 text-center font-bold text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
            >
              Zum Login
            </Link>
          </div>
        ) : (
          <div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Account erstellen</h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Bereits einen Account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300"
                >
                  Hier einloggen
                </Link>
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <p className="rounded-lg bg-red-100 p-3 text-center text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  {error}
                </p>
              )}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="sr-only">
                    Vorname
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    placeholder="Vorname (Optional)"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={isLoading}
                    className="w-full rounded-lg border-gray-200 bg-gray-100 px-4 py-3 text-gray-800 focus:border-green-500 focus:ring-green-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-200"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="sr-only">
                    Nachname
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Nachname (Optional)"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={isLoading}
                    className="w-full rounded-lg border-gray-200 bg-gray-100 px-4 py-3 text-gray-800 focus:border-green-500 focus:ring-green-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-200"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  E-Mail Adresse
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="E-Mail Adresse"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full rounded-lg border-gray-200 bg-gray-100 px-4 py-3 text-gray-800 focus:border-green-500 focus:ring-green-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-200"
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Passwort
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="Passwort"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full rounded-lg border-gray-200 bg-gray-100 px-4 py-3 text-gray-800 focus:border-green-500 focus:ring-green-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-200"
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Passwort bestätigen
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="Passwort bestätigen"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full rounded-lg border-gray-200 bg-gray-100 px-4 py-3 text-gray-800 focus:border-green-500 focus:ring-green-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-200"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-lg bg-green-600 px-4 py-3 font-bold text-white transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                >
                  {isLoading ? "Wird erstellt..." : "Account erstellen"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
