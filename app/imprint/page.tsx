// app/imprint/page.tsx
import Link from "next/link";
import { ArrowLeftIcon } from "../components/icons";

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-white/20 bg-white/70 p-10 shadow-lg ring-1 ring-black/5 backdrop-blur-sm">
          <h1 className="mb-8 text-4xl font-bold tracking-tight text-zinc-900">Impressum</h1>

          <div className="prose prose-lg max-w-none space-y-8 text-zinc-700">
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-zinc-900">Angaben gemäß § 5 TMG</h2>
              <div className="space-y-2">
                <p>
                  <strong>HeiNa Baugemeinschaft e.V.</strong>
                </p>
                <p>Musterstraße 123</p>
                <p>21109 Hamburg</p>
                <p>Deutschland</p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-zinc-900">Vertreten durch</h2>
              <p>Vorstand des HeiNa Baugemeinschaft e.V.</p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-zinc-900">Kontakt</h2>
              <div className="space-y-2">
                <p>
                  <strong>E-Mail:</strong> info@heina-baugemeinschaft.de
                </p>
                <p>
                  <strong>Telefon:</strong> +49 (0) 40 123456789
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-zinc-900">Registereintrag</h2>
              <div className="space-y-2">
                <p>
                  <strong>Eintragung im Vereinsregister:</strong>
                </p>
                <p>Registergericht: Amtsgericht Hamburg</p>
                <p>Registernummer: VR 12345</p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-zinc-900">
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
              </h2>
              <div className="space-y-2">
                <p>HeiNa Baugemeinschaft e.V.</p>
                <p>Musterstraße 123</p>
                <p>21109 Hamburg</p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-zinc-900">Haftungsausschluss</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-medium text-zinc-900">Haftung für Inhalte</h3>
                  <p>
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                    allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                    unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach
                    Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium text-zinc-900">Haftung für Links</h3>
                  <p>
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss
                    haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte
                    der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium text-zinc-900">Urheberrecht</h3>
                  <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
                    deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
                    außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors
                    bzw. Erstellers.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-12 border-t border-zinc-200 pt-8 text-center">
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
    </div>
  );
}
