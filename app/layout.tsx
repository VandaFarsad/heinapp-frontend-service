// app/layout.tsx
import { authOptions } from "@/lib/auth";
import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { Inter, Shadows_Into_Light } from "next/font/google";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import NextAuthProvider from "./components/NextAuthProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const shadowsIntoLight = Shadows_Into_Light({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-shadows",
});

export const metadata: Metadata = {
  title: "hein@pp",
  description: "HeiNa - Baugemeinschaft GbR in Wilhemsburg",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="de" className="scroll-smooth">
      {/* ES DÜRFEN KEINE LEERZEICHEN ODER KOMMENTARE DIREKT HIER STEHEN */}
      <head>
        {/* Next.js fügt hier automatisch die notwendigen Head-Elemente ein,
            basierend auf deinem `metadata`-Objekt und anderen Konventionen.
            Du musst hier normalerweise keine <title> oder <meta>-Tags manuell einfügen,
            es sei denn für sehr spezielle Anwendungsfälle. */}
      </head>
      <body
        className={`${inter.className} ${shadowsIntoLight.variable} flex min-h-screen flex-col bg-zinc-50 text-gray-800`}
      >
        <NextAuthProvider session={session}>
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
