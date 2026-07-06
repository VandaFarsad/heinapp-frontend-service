"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthGuardProps {
  status: "loading" | "authenticated" | "unauthenticated";
  /** Current user role - required when allowedRoles is set */
  userRole?: string;
  /** If provided, only these roles may access the content */
  allowedRoles?: string[];
  /** Custom messages for each state */
  messages?: {
    loading?: string;
    unauthenticated?: string;
    accessDenied?: string;
  };
  children: React.ReactNode;
}

const defaultMessages = {
  loading: "Lädt...",
  unauthenticated: "Sie müssen angemeldet sein, um diese Seite zu sehen.",
  accessDenied: "Sie haben keinen Zugriff auf diese Seite.",
};

export default function AuthGuard({ status, userRole, allowedRoles, messages, children }: AuthGuardProps) {
  const pathname = usePathname();
  const msgs = { ...defaultMessages, ...messages };
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted || status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-green-600"></div>
          <p className="text-gray-600">{msgs.loading}</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="mx-auto max-w-md p-6 text-center">
          <h1 className="mb-4 text-2xl font-semibold text-gray-900">Anmeldung erforderlich</h1>
          <p className="mb-6 text-gray-600">{msgs.unauthenticated}</p>
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}
            className="inline-block rounded-lg bg-green-600 px-6 py-3 text-white transition-colors hover:bg-green-700"
          >
            Zur Anmeldung
          </Link>
        </div>
      </div>
    );
  }

  if (allowedRoles && !allowedRoles.includes(userRole ?? "")) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="mx-auto max-w-md p-6 text-center">
          <h1 className="mb-4 text-2xl font-semibold text-gray-900">Zugriff verweigert</h1>
          <p className="mb-6 text-gray-600">{msgs.accessDenied}</p>
          <Link
            href="/"
            className="inline-block rounded-lg bg-green-600 px-6 py-3 text-white transition-colors hover:bg-green-700"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
