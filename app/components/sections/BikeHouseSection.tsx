"use client";

import { motion } from "motion/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { BikeToolsIcon, BikeWheelIcon } from "../icons";
import { Section } from "../ui/Section";

export default function BikeHouseSection() {
  const { data: session } = useSession();

  return (
    <Section
      id="radhaus"
      title="Das RADhaus - Leuchtturm für Fahrradkultur"
      titleClassName="text-4xl md:text-5xl font-bold text-center text-lime-400 mb-16 tracking-tight"
      className="radhaus-gradient-medium relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20 md:py-32"
    >
      {/* RADhaus-thematische Dekoration mit modernem Fahrradrad */}
      <div className="absolute inset-0 opacity-15">
        {/* Hauptrad - thematisch passend für RADhaus (vergrößert) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/5 text-lime-400"
          style={{
            filter: "drop-shadow(0 0 2px #a3e635) drop-shadow(0 0 4px #84cc16)",
          }}
        >
          <BikeWheelIcon className="h-48 w-48 md:h-64 md:w-64 [&_g:has(line)]:text-lime-300" />
        </motion.div>

        {/* Zweites Rad für Balance (auch vergrößert) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/5 text-green-400"
          style={{
            filter: "drop-shadow(0 0 2px #a3e635) drop-shadow(0 0 4px #84cc16)",
          }}
        >
          <BikeWheelIcon className="h-40 w-40 md:h-52 md:w-52 [&_g:has(line)]:text-lime-300" />
        </motion.div>

        {/* Werkzeug-Icon für die Werkstatt - statisch */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 transform text-lime-400"
          style={{
            filter: "drop-shadow(0 0 3px #a3e635) drop-shadow(0 0 6px #84cc16)",
          }}
        >
          <BikeToolsIcon className="h-32 w-32 md:h-40 md:w-40" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 grid max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-lg lg:prose-xl max-w-none text-gray-200"
        >
          <p className="text-gray-100">
            Entlang des neuen Radschnellwegs haben wir mit dem RADhaus einen Leuchtturm für die Fahrradkultur in Hamburg
            geschaffen. Als leidenschaftliche Radfahrende leben wir hier räumlich und konzeptionell diese Vision.
          </p>
          <p className="text-gray-100">
            Herzstück ist die offene Fahrrad-Selbsthilfewerkstatt{" "}
            <strong className="text-lime-400">„Goldene Speiche"</strong>, die sich zum Quartier hin öffnet und als
            wöchentliches, nicht-gewerbliches Repair-Café zum zentralen Treffpunkt geworden ist. Ein Automat mit
            Fahrrad-Ersatzteilen versorgt auch spontan Vorbeiradelnde.
          </p>
          <p className="text-gray-100">
            Rund 90 Fahrradstellplätze, Plätze für Lastenräder und ein internes{" "}
            <strong className="text-lime-400">RADsharing</strong> ermöglichen ein autofreies Leben und decken
            vielfältige Mobilitätsbedürfnisse ab.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex justify-center text-center md:justify-start md:text-left"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={session?.user ? "/workshop" : "/register"}
                className="inline-flex items-center rounded-full bg-lime-500 px-6 py-3 font-medium text-gray-900 shadow-lg transition-all duration-200 hover:bg-lime-600 hover:shadow-xl"
              >
                <BikeToolsIcon className="mr-2 h-5 w-5" />
                {session?.user ? "Werkstatt-Slot buchen" : "Registrieren & Werkstatt buchen"}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-4"
        >
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-gray-600/30 bg-gray-800/50 shadow-2xl backdrop-blur-sm">
            <Image
              src="/images/repair-cafe.png"
              alt="Visualisierung der Fahrradwerkstatt Goldene Speiche"
              fill
              className="object-cover"
              priority={false}
            />
          </div>

          {/* Galerie-Platzhalter */}
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-gray-500/40 bg-gray-700/30"
              >
                <span className="text-2xl">🔧</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400">Weitere Bilder aus der Werkstatt folgen</p>
        </motion.div>
      </motion.div>
    </Section>
  );
}
