"use client";

import { motion } from "motion/react";
import { Section } from "../../components/ui/Section";

export default function CommunitySection() {
  return (
    <Section
      id="gemeinschaft"
      title="Unsere Gemeinschaft: Leben, Teilen, Zusammenwachsen"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-green-50 px-6 py-20 md:py-32"
    >
      {/* Subtile Dekoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/3 h-40 w-40 rotate-45 transform border-2 border-lime-400"></div>
        <div className="absolute right-1/3 bottom-1/4 h-32 w-32 -rotate-12 transform border-2 border-green-500"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 grid max-w-6xl gap-8 text-center sm:grid-cols-2 md:gap-12 lg:grid-cols-3"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ y: -5 }}
          className="flex flex-col items-center rounded-3xl border border-white/50 bg-white/70 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/80 hover:shadow-xl"
        >
          <div className="mb-4 text-5xl">🏠</div>
          <h3 className="mb-4 text-2xl font-semibold text-gray-900">Vielfältige Nachbarschaft</h3>
          <p className="leading-relaxed text-gray-700">
            Von Singles bis zu Familien leben wir hier zusammen und schaffen Raum für unterschiedliche Lebensphasen -
            gemeinsam unter einem Dach.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ y: -5 }}
          className="flex flex-col items-center rounded-3xl border border-white/50 bg-white/70 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/80 hover:shadow-xl"
        >
          <div className="mb-4 text-5xl">🤝</div>
          <h3 className="mb-4 text-2xl font-semibold text-gray-900">Weniger kann mehr sein</h3>
          <p className="leading-relaxed text-gray-700">
            Wir teilen Waschmaschinen, Werkzeug und Alltagsgegenstände. Unser 55m² Gemeinschaftsraum mit Küche ist unser
            erweitertes Wohnzimmer.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ y: -5 }}
          className="flex flex-col items-center rounded-3xl border border-white/50 bg-white/70 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/80 hover:shadow-xl"
        >
          <div className="mb-4 text-5xl">💪</div>
          <h3 className="mb-4 text-2xl font-semibold text-gray-900">Füreinander da sein</h3>
          <p className="leading-relaxed text-gray-700">
            Unser Haus ist barrierearm nach DIN 18040-2 gestaltet. Ein Bewohner:innenverein und Vorkaufsrecht schützen
            unsere Gemeinschaft langfristig.
          </p>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16 text-center"
      >
        <p className="text-xl leading-relaxed text-gray-800">
          Unsere Sharingplattform <strong className="text-green-600">hein@pp</strong> organisiert unser Zusammenleben –
          einfach und digital.
        </p>
      </motion.div>
    </Section>
  );
}
