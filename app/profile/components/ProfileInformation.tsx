// app/profile/components/ProfileInformation.tsx
"use client";

import type { Session } from "next-auth";
import { useState } from "react";
import { api, parseApiError } from "../../api/helpers";
import AlertMessage from "../../components/ui/AlertMessage";
import LoadingButton from "./LoadingButton";

interface ProfileInformationProps {
  session: Session;
  update: (data?: any) => Promise<Session | null>;
}

export default function ProfileInformation({ session, update }: ProfileInformationProps) {
  const user = session.user;

  const [firstName, setFirstName] = useState(user.first_name || "");
  const [lastName, setLastName] = useState(user.last_name || "");
  const [editSuccess, setEditSuccess] = useState("");
  const [editError, setEditError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditError("");
    setEditSuccess("");
    setLoading(true);

    try {
      const res = await api.patch(
        "users/me/",
        {
          first_name: firstName,
          last_name: lastName,
        },
        session?.access_token,
      );

      if (res.ok) {
        const updatedUser = await res.json();
        await update({
          ...session,
          user: {
            ...session.user,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
          },
        });
        setEditSuccess("Profil erfolgreich aktualisiert!");
      } else {
        const errorData = await res.json();
        setEditError(parseApiError(errorData, "Ein Fehler ist aufgetreten."));
      }
    } catch (error) {
      setEditError("Ein Netzwerkfehler ist aufgetreten.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/20 bg-white/70 p-10 shadow-lg ring-1 ring-black/5 backdrop-blur-sm">
      <form onSubmit={handleProfileUpdate} className="space-y-8">
        <div className="pb-2">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">Persönliche Informationen</h2>
          <p className="mt-2 text-sm font-medium text-zinc-500">
            Aktualisiere deine grundlegenden Profilinformationen.
          </p>
        </div>

        <AlertMessage type="success" message={editSuccess} />
        <AlertMessage type="error" message={editError} />

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="firstName" className="block text-sm leading-6 font-medium text-zinc-900">
              Vorname
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="block w-full rounded-2xl border-0 bg-zinc-50/50 px-4 py-3 text-zinc-900 shadow-sm ring-1 ring-zinc-200 transition-all duration-200 ring-inset placeholder:text-zinc-400 focus:bg-white focus:ring-2 focus:ring-green-500 focus:ring-inset disabled:opacity-50 sm:text-sm sm:leading-6"
                disabled={loading}
                placeholder="Dein Vorname"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="lastName" className="block text-sm leading-6 font-medium text-zinc-900">
              Nachname
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="block w-full rounded-2xl border-0 bg-zinc-50/50 px-4 py-3 text-zinc-900 shadow-sm ring-1 ring-zinc-200 transition-all duration-200 ring-inset placeholder:text-zinc-400 focus:bg-white focus:ring-2 focus:ring-green-500 focus:ring-inset disabled:opacity-50 sm:text-sm sm:leading-6"
                disabled={loading}
                placeholder="Dein Nachname"
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <LoadingButton
            loading={loading}
            loadingText="Speichern..."
            type="submit"
            className="flex w-full transform justify-center rounded-2xl bg-green-600 px-4 py-3.5 text-sm leading-6 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Profil aktualisieren
          </LoadingButton>
        </div>
      </form>
    </div>
  );
}
