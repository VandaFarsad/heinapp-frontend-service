"use client";

import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { LogoutIcon, UserIcon } from "../../icons";

interface ProfileDropdownProps {
  session: Session;
}

export default function ProfileDropdown({ session }: ProfileDropdownProps) {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div
      className={cn(
        "invisible absolute top-full right-0 z-50 mt-3 w-64",
        "translate-y-2 transform rounded-xl border border-gray-100",
        "bg-white py-2 opacity-0 shadow-lg transition-all delay-150 duration-300",
        "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-0",
      )}
    >
      <div className="border-b border-gray-100 px-4 py-3">
        <p className="font-semibold text-gray-900">{`${session.user.first_name} ${session.user.last_name}`}</p>
        <p className="truncate text-sm text-gray-500">{session.user.email}</p>
        <span className="mt-1 inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 capitalize">
          {session.user.role}
        </span>
      </div>
      <div className="px-2 py-2">
        <Link href="/profile" className="flex items-center rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
          <UserIcon className="mr-3 h-4 w-4" />
          Profil verwalten
        </Link>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <LogoutIcon className="mr-3 h-4 w-4" />
          Abmelden
        </button>
      </div>
    </div>
  );
}
