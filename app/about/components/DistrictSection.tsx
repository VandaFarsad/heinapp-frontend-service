"use client";

import { motion } from "motion/react";
import { Section } from "../../components/ui/Section";

export default function DistrictSection() {
  return (
    <Section
      id="quartier"
      title="Offen für Wilhelmsburg"
      className="radhaus-gradient relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-4xl text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 text-xl leading-relaxed text-gray-700"
        >
          Unser Haus ist ein offener Ort. Wir fördern bestehende Stadtteil-Netzwerke und schaffen einen Mehrwert für das
          gesamte Quartier.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 text-xl leading-relaxed text-gray-700"
        >
          Mit unserer <strong className="text-green-600">Food-Coop</strong> für verpackungsreduzierte, regionale
          Lebensmittel und unserem Gemeinschaftsraum, der auch anderen Initiativen zur Verfügung steht, leben wir eine
          aktive Nachbarschaft.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.a
            href="/#kontakt"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block rounded-full bg-green-700 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:bg-green-800 hover:shadow-xl"
          >
            Nimm Kontakt auf
          </motion.a>
        </motion.div>
      </motion.div>
    </Section>
  );
}
