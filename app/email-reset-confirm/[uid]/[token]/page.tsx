"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "../../../api/helpers";

export default function EmailResetConfirmPage() {
  const { uid, token } = useParams();
  const router = useRouter();

  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newEmail !== confirmEmail) {
      setError("Die E-Mail-Adressen stimmen nicht überein.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await api.post("users/reset_email_confirm/", {
        uid,
        token,
        new_email: newEmail,
        re_new_email: confirmEmail,
      });

      if (res.ok) {
        setSuccess("Deine E-Mail-Adresse wurde erfolgreich geändert. Du wirst in Kürze zum Login weitergeleitet.");
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      } else {
        const errorData = await res.json();
        let errorMessage = "Ein Fehler ist aufgetreten. Der Link ist möglicherweise abgelaufen oder ungültig.";
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
                Neue E-Mail-Adresse festlegen
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Bitte gib deine neue E-Mail-Adresse ein.</p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <p className="rounded-lg bg-red-100 p-3 text-center text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  {error}
                </p>
              )}

              <div>
                <label htmlFor="new-email" className="sr-only">
                  Neue E-Mail-Adresse
                </label>
                <input
                  id="new-email"
                  name="new-email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Neue E-Mail-Adresse"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full rounded-lg border-gray-200 bg-gray-100 px-4 py-3 text-gray-800 focus:border-green-500 focus:ring-green-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-200"
                />
              </div>

              <div>
                <label htmlFor="confirm-email" className="sr-only">
                  Neue E-Mail-Adresse bestätigen
                </label>
                <input
                  id="confirm-email"
                  name="confirm-email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Neue E-Mail-Adresse bestätigen"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
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
                  {isLoading ? "Wird gespeichert..." : "E-Mail-Adresse ändern"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
