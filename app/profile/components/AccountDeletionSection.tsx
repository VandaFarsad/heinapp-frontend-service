// app/profile/components/AccountDeletionSection.tsx
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { api, parseApiError } from "../../api/helpers";
import { LoadingSpinnerIcon } from "../../components/icons";
import AlertMessage from "../../components/ui/AlertMessage";

interface AccountDeletionSectionProps {
  session: Session;
}

export default function AccountDeletionSection({ session }: AccountDeletionSectionProps) {
  const [deleteError, setDeleteError] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      setDeleteError("Bitte gib dein aktuelles Passwort ein.");
      return;
    }
    setDeleteError("");
    setLoading(true);

    try {
      const res = await api.delete("users/me/", session?.access_token, {
        current_password: deletePassword,
      });

      if (res.ok) {
        await signOut({ callbackUrl: "/" });
      } else {
        const errorData = await res.json();
        setDeleteError(parseApiError(errorData, "Dein Account konnte nicht gelöscht werden."));
      }
    } catch (error) {
      setDeleteError("Ein Netzwerkfehler ist aufgetreten.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="rounded-2xl bg-red-50/50 p-6 ring-1 ring-red-200/50">
          <h3 className="mb-2 text-lg font-semibold text-red-900">Account löschen</h3>
          <p className="text-sm text-red-700">
            Diese Aktion ist endgültig und kann nicht rückgängig gemacht werden. Alle deine Daten werden dauerhaft
            entfernt.
          </p>
        </div>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="flex w-full transform justify-center rounded-2xl bg-red-600 px-4 py-3.5 text-sm leading-6 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Account endgültig löschen
        </button>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="m-4 w-full max-w-md rounded-3xl border border-white/20 bg-white p-10 shadow-2xl ring-1 ring-black/5">
            <h2 className="text-2xl font-bold text-zinc-900">Account wirklich löschen?</h2>
            <p className="mt-4 text-zinc-600">
              Diese Aktion kann nicht rückgängig gemacht werden. Um fortzufahren, gib bitte dein Passwort zur
              Bestätigung ein.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="delete-password" className="block text-sm leading-6 font-medium text-zinc-900">
                  Dein aktuelles Passwort
                </label>
                <input
                  type="password"
                  id="delete-password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="mt-2 block w-full rounded-2xl border-0 bg-zinc-50/50 px-4 py-3 text-zinc-900 shadow-sm ring-1 ring-zinc-200 transition-all duration-200 ring-inset placeholder:text-zinc-400 focus:bg-white focus:ring-2 focus:ring-red-500 focus:ring-inset sm:text-sm sm:leading-6"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <AlertMessage type="error" message={deleteError} />

            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeleteError("");
                  setDeletePassword("");
                }}
                className="rounded-2xl bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm transition-all duration-200 hover:bg-zinc-200"
                disabled={loading}
              >
                Abbrechen
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={loading || !deletePassword}
                className="flex justify-center rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center">
                    <LoadingSpinnerIcon className="mr-3 -ml-1 h-4 w-4 animate-spin text-white" />
                    Wird gelöscht...
                  </div>
                ) : (
                  "Account endgültig löschen"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
