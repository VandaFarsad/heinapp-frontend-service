// app/privacy-policy/page.tsx
import Link from "next/link";
import { ArrowLeftIcon } from "../components/icons";

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-white/20 bg-white/70 p-10 shadow-lg ring-1 ring-black/5 backdrop-blur-sm">
          <h1 className="mb-8 text-4xl font-bold tracking-tight text-zinc-900">Datenschutzerklärung</h1>

          <div className="prose prose-lg max-w-none space-y-8 text-zinc-700">
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-zinc-900">1. Datenschutz auf einen Blick</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-medium text-zinc-900">Allgemeine Hinweise</h3>
                  <p>
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
                    Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen
                    Sie persönlich identifiziert werden können.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium text-zinc-900">Datenerfassung auf dieser Website</h3>
                  <p>
                    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
                    können Sie dem Impressum dieser Website entnehmen.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-zinc-900">
                2. Hosting und Content Delivery Networks (CDN)
              </h2>
              <p>
                Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden,
                werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen,
                Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und
                sonstige Daten, die über eine Website generiert werden, handeln.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-zinc-900">
                3. Allgemeine Hinweise und Pflichtinformationen
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-medium text-zinc-900">Datenschutz</h3>
                  <p>
                    Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln
                    Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften
                    sowie dieser Datenschutzerklärung.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium text-zinc-900">Hinweis zur verantwortlichen Stelle</h3>
                  <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                  <div className="mt-2 space-y-1">
                    <p>
                      <strong>HeiNa Baugemeinschaft e.V.</strong>
                    </p>
                    <p>Musterstraße 123</p>
                    <p>21109 Hamburg</p>
                    <p>E-Mail: info@heina-baugemeinschaft.de</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-zinc-900">4. Datenerfassung auf dieser Website</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-medium text-zinc-900">Server-Log-Dateien</h3>
                  <p>
                    Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten
                    Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
                  </p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>Browsertyp und Browserversion</li>
                    <li>verwendetes Betriebssystem</li>
                    <li>Referrer URL</li>
                    <li>Hostname des zugreifenden Rechners</li>
                    <li>Uhrzeit der Serveranfrage</li>
                    <li>IP-Adresse</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium text-zinc-900">Registrierung auf dieser Website</h3>
                  <p>
                    Sie können sich auf dieser Website registrieren, um zusätzliche Funktionen zu nutzen. Die dazu
                    eingegebenen Daten verwenden wir nur zum Zwecke der Nutzung des jeweiligen Angebotes oder Dienstes,
                    für den Sie sich registriert haben.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-zinc-900">5. Ihre Rechte</h2>
              <p>
                Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch
                gegen die Verarbeitung und Datenübertragbarkeit. Sofern Sie uns eine Einwilligung erteilt haben, können
                Sie diese jederzeit mit Wirkung für die Zukunft widerrufen.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-zinc-900">6. Kontakt</h2>
              <p>Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:</p>
              <div className="mt-2">
                <p>
                  <strong>E-Mail:</strong> info@heina-baugemeinschaft.de
                </p>
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
