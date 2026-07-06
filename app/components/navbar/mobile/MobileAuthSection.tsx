"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { LogoutIcon, UserIcon } from "../../icons";

interface MobileAuthSectionProps {
  session: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
  onClose: () => void;
}

export default function MobileAuthSection({ session, status, onClose }: MobileAuthSectionProps) {
  return (
    <div className="border-t border-gray-100 pt-4">
      {status === "unauthenticated" && (
        <div className="space-y-2">
          <button
            onClick={() => {
              signIn();
              onClose();
            }}
            className="w-full rounded-xl px-3 py-3 text-center text-sm font-medium text-gray-700 transition-all hover:bg-gray-50"
          >
            Anmelden
          </button>
          <Link
            href="/register"
            className="block w-full rounded-xl bg-green-600 px-3 py-3 text-center text-sm font-medium text-white transition-all hover:bg-green-700"
            onClick={onClose}
          >
            Registrieren
          </Link>
        </div>
      )}

      {status === "authenticated" && session?.user && (
        <div className="space-y-3">
          <div className="flex items-center space-x-3 px-3 py-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 font-semibold text-white">
              {session.user.first_name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{`${session.user.first_name} ${session.user.last_name}`}</p>
              <p className="text-sm text-gray-500">{session.user.email}</p>
            </div>
          </div>
          <div className="space-y-1">
            <Link
              href="/profile"
              className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              onClick={onClose}
            >
              <UserIcon className="mr-3 h-5 w-5" />
              Profil
            </Link>
            <button
              onClick={() => {
                signOut({ callbackUrl: "/" });
                onClose();
              }}
              className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              <LogoutIcon className="mr-3 h-5 w-5" />
              Abmelden
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
