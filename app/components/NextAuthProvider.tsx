"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";
import React from "react";

interface NextAuthProviderProps {
  children: React.ReactNode;
  session?: SessionProviderProps["session"]; // Übernehme den Typ aus SessionProviderProps
}

export default function NextAuthProvider({ children, session }: NextAuthProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
