// app/profile/components/PasswordResetSection.tsx
"use client";

import type { Session } from "next-auth";
import { useState } from "react";
import { api, parseApiError } from "../../api/helpers";
import AlertMessage from "../../components/ui/AlertMessage";
import LoadingButton from "./LoadingButton";

interface PasswordResetSectionProps {
  session: Session;
}

export default function PasswordResetSection({ session }: PasswordResetSectionProps) {
  const [resetSuccess, setResetSuccess] = useState("");
  const [resetError, setResetError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    setResetError("");
    setResetSuccess("");
    setLoading(true);

    try {
      const res = await api.post("users/reset_password/", {
        email: session.user.email,
      });

      if (res.ok) {
        setResetSuccess(
          "Eine E-Mail zum Zurücksetzen des Passworts wurde an deine hinterlegte E-Mail-Adresse gesendet.",
        );
      } else {
        const errorData = await res.json();
        setResetError(parseApiError(errorData, "Fehler beim Senden der E-Mail zum Zurücksetzen des Passworts."));
      }
    } catch (error) {
      setResetError("Ein Netzwerkfehler ist aufgetreten.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-zinc-50/50 p-6 ring-1 ring-zinc-200/50">
        <h3 className="mb-2 text-lg font-semibold text-zinc-900">Passwort</h3>
        <p className="text-sm text-zinc-500">
          Setze dein Passwort sicher zurück. Wir senden dir einen Link zum Erstellen eines neuen Passworts.
        </p>
      </div>

      <AlertMessage type="success" message={resetSuccess} />
      <AlertMessage type="error" message={resetError} />

      <LoadingButton
        loading={loading}
        loadingText="Passwort wird zurückgesetzt..."
        onClick={handlePasswordReset}
        className="flex w-full transform justify-center rounded-2xl bg-white px-4 py-3.5 text-sm leading-6 font-semibold text-zinc-900 shadow-lg ring-2 ring-zinc-200 transition-all duration-200 hover:scale-[1.02] hover:bg-zinc-50 hover:ring-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Passwort zurücksetzen
      </LoadingButton>
    </div>
  );
}
