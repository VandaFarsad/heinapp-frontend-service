// app/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto bg-gray-800 p-4 text-center text-white">
      <div className="flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6">
        <p>© {new Date().getFullYear()} HeiNa Baugemeinschaft</p>
        <div className="flex space-x-4 text-sm">
          <Link href="/about" className="transition-colors hover:text-gray-300">
            Über uns
          </Link>
          <Link href="/imprint" className="transition-colors hover:text-gray-300">
            Impressum
          </Link>
          <Link href="/privacy-policy" className="transition-colors hover:text-gray-300">
            Datenschutz
          </Link>
        </div>
      </div>
    </footer>
  );
}
