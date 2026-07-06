// app/profile/page.tsx
"use client";

import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AuthGuard from "../components/AuthGuard";
import { ArrowLeftIcon } from "../components/icons";
import ProfileHeader from "./components/ProfileHeader";
import ProfileInformation from "./components/ProfileInformation";
import SecuritySection from "./components/SecuritySection";

function ProfilePageContent({
  session,
  update,
}: {
  session: Session;
  update: (data?: any) => Promise<Session | null>;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-12">
        <ProfileHeader user={session.user} />

        <ProfileInformation session={session} update={update} />

        <SecuritySection session={session} />

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-green-600 transition-colors duration-200 hover:text-green-500"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const {
    data: session,
    status,
    update,
  } = useSession({
    required: true,
    onUnauthenticated() {
      // Redirects to sign-in page
    },
  });

  if (status === "loading" || !session) {
    return (
      <AuthGuard
        status={status === "loading" ? "loading" : "unauthenticated"}
        messages={{
          unauthenticated: "Du musst angemeldet sein, um diese Seite zu sehen.",
        }}
      >
        {null}
      </AuthGuard>
    );
  }

  return <ProfilePageContent session={session} update={update} />;
}
