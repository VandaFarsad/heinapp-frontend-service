"use client";

import type { Session } from "next-auth";
import AccountDeletionSection from "./AccountDeletionSection";
import EmailChangeSection from "./EmailChangeSection";
import PasswordResetSection from "./PasswordResetSection";

interface SecuritySectionProps {
  session: Session;
}

export default function SecuritySection({ session }: SecuritySectionProps) {
  return (
    <div className="space-y-12 rounded-3xl border border-white/20 bg-white/70 p-10 shadow-lg ring-1 ring-black/5 backdrop-blur-sm">
      <div className="pb-2">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">Sicherheit</h2>
        <p className="mt-2 text-sm font-medium text-zinc-500">
          Verwalte deine E-Mail-Adresse und dein Passwort sicher.
        </p>
      </div>

      <EmailChangeSection session={session} />

      <div className="border-t border-zinc-200/50" />

      <PasswordResetSection session={session} />

      <div className="border-t border-zinc-200/50" />

      <AccountDeletionSection session={session} />
    </div>
  );
}
