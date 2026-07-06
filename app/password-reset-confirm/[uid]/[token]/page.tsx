"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "../../../api/helpers";

export default function PasswordResetConfirmPage() {
  const { uid, token } = useParams();
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError("Die Passwörter stimmen nicht überein.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await api.post("users/reset_password_confirm/", {
        uid,
        token,
        new_password: newPassword,
        re_new_password: confirmPassword,
      });

      if (res.ok) {
        setSuccess(
          "Dein Passwort wurde erfolgreich zurückgesetzt. Du kannst dich jetzt mit deinem neuen Passwort anmelden.",
        );
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      } else {
        const errorData = await res.json();
        let errorMessage = "Ein Fehler ist aufgetreten. Der Link ist möglicherweise abgelaufen.";
        if (errorData && typeof errorData === "object") {
          const messages = Object.values(errorData).flat();
          if (messages.length > 0) {
            errorMessage = messages.join(" ");
          }
        }
        setError(errorMessage);
      }
    } catch (err) {
      setError("Ein Netzwerkfehler ist aufgetreten. Bitte überprüfe deine Verbindung.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black">
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
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                Neues Passwort festlegen
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Bitte gib dein neues Passwort ein.</p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <p className="rounded-lg bg-red-100 p-3 text-center text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  {error}
                </p>
              )}

              <div>
                <label htmlFor="new-password" className="sr-only">
                  Neues Passwort
                </label>
                <input
                  id="new-password"
                  name="new-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="Neues Passwort"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full rounded-lg border-gray-200 bg-gray-100 px-4 py-3 text-gray-800 focus:border-green-500 focus:ring-green-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-200"
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Neues Passwort bestätigen
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="Neues Passwort bestätigen"
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
                  {isLoading ? "Wird gespeichert..." : "Passwort zurücksetzen"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
