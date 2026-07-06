"use client";

import { motion } from "motion/react";
import { Section } from "../../components/ui/Section";

export default function SustainabilitySection() {
  return (
    <Section
      id="nachhaltigkeit"
      title="Nachhaltigkeit treibt uns an"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-green-800 to-green-900 px-6 py-20 text-white md:py-32"
      titleClassName="text-4xl md:text-5xl font-bold text-center text-green-400 mb-16 tracking-tight"
    >
      {/* Geometrische Dekoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-1/4 h-40 w-40 rotate-45 transform border-2 border-lime-400"></div>
        <div className="absolute bottom-1/3 left-1/3 h-32 w-32 -rotate-12 transform border-2 border-lime-400"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 grid max-w-6xl items-center gap-16 md:grid-cols-2"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          className="order-last overflow-hidden rounded-3xl shadow-2xl md:order-first"
        >
          <img src="/images/radhaus.png" alt="Nachhaltiges Bauen mit Holz" className="h-full w-full object-cover" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6 text-gray-300"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg leading-relaxed"
          >
            Wir leben autofrei und haben konsequent nachhaltig gebaut. Unser Haus ist in{" "}
            <strong className="text-green-400">Holzbauweise</strong> errichtet, und wir haben bewusst auf einen Keller
            verzichtet, um CO² zu minimieren.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg leading-relaxed"
          >
            Eine intensive <strong className="text-green-400">Dach- und Fassadenbegrünung</strong> überkompensiert die
            Flächenversiegelung. Wir verwenden regionale und recycelte Baustoffe und haben einen Energiestandard in
            Anlehnung an KFW-Effizienzhaus 40 erreicht.
          </motion.p>
        </motion.div>
      </motion.div>
    </Section>
  );
}
