// app/profile/components/EmailChangeSection.tsx
"use client";

import type { Session } from "next-auth";
import { useState } from "react";
import { api, parseApiError } from "../../api/helpers";
import AlertMessage from "../../components/ui/AlertMessage";
import LoadingButton from "./LoadingButton";

interface EmailChangeSectionProps {
  session: Session;
}

export default function EmailChangeSection({ session }: EmailChangeSectionProps) {
  const [emailChangeSuccess, setEmailChangeSuccess] = useState("");
  const [emailChangeError, setEmailChangeError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = async () => {
    setEmailChangeError("");
    setEmailChangeSuccess("");
    setLoading(true);

    try {
      const res = await api.post(
        "users/reset_email/",
        {
          email: session.user.email,
        },
        session?.access_token,
      );

      if (res.ok) {
        setEmailChangeSuccess(
          "Eine E-Mail zur Bestätigung der Änderung wurde an deine hinterlegte E-Mail-Adresse gesendet.",
        );
      } else {
        const errorData = await res.json();
        setEmailChangeError(parseApiError(errorData, "E-Mail konnte nicht geändert werden."));
      }
    } catch (error) {
      setEmailChangeError("Ein Netzwerkfehler ist aufgetreten.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-zinc-50/50 p-6 ring-1 ring-zinc-200/50">
        <h3 className="mb-2 text-lg font-semibold text-zinc-900">E-Mail-Adresse</h3>
        <p className="mb-1 text-sm text-zinc-600">
          Aktuelle Adresse:{" "}
          <span className="rounded-lg bg-white px-2 py-1 font-mono font-medium text-zinc-900">
            {session.user.email}
          </span>
        </p>
        <p className="text-sm text-zinc-500">
          Zur Änderung deiner E-Mail-Adresse senden wir dir einen sicheren Bestätigungslink.
        </p>
      </div>

      <AlertMessage type="success" message={emailChangeSuccess} />
      <AlertMessage type="error" message={emailChangeError} />

      <LoadingButton
        loading={loading}
        loadingText="E-Mail wird gesendet..."
        onClick={handleEmailChange}
        className="flex w-full transform justify-center rounded-2xl bg-zinc-900 px-4 py-3.5 text-sm leading-6 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        E-Mail-Änderung anfordern
      </LoadingButton>
    </div>
  );
}
