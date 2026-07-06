"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="max-w-md text-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Etwas ist schiefgelaufen</h2>
        <p className="mb-6 text-gray-600">Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.</p>
        <button
          onClick={reset}
          className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Erneut versuchen
        </button>
      </div>
    </div>
  );
}
