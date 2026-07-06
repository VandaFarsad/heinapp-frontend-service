"use client";

import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserIcon } from "../../icons";
import ProfileDropdown from "./ProfileDropdown";

interface AuthSectionProps {
  session: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
}

export default function AuthSection({ session, status }: AuthSectionProps) {
  const pathname = usePathname();

  if (status === "loading") {
    return <div className="h-10 w-10 animate-pulse rounded-xl bg-gray-200"></div>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={() => signIn(undefined, { callbackUrl: pathname })}
          className="rounded-xl px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-900"
        >
          Anmelden
        </button>
        <Link
          href="/register"
          className="rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-green-700 hover:shadow-md"
        >
          Registrieren
        </Link>
      </div>
    );
  }

  if (status === "authenticated" && session?.user) {
    return (
      <div className="group relative">
        <div className="flex cursor-pointer items-center space-x-2 rounded-xl p-2 transition-all hover:bg-gray-50">
          <div className="radhaus-title-bold flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 font-bold text-white shadow-md ring-0 ring-green-200 transition-all duration-200 group-hover:ring-2">
            {session.user.first_name?.trim() ? (
              session.user.first_name.charAt(0).toUpperCase()
            ) : (
              <UserIcon className="h-5 w-5" />
            )}
          </div>
        </div>

        <ProfileDropdown session={session} />
      </div>
    );
  }

  return null;
}
