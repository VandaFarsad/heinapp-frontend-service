"use client";

import { motion } from "motion/react";
import { ContactForm } from "../contact-form";

export default function ContactSection() {
  const email = "hello" + "@" + "heina.org";

  return (
    <section id="kontakt" className="flex min-h-screen flex-col justify-center bg-zinc-50 px-6 py-20 md:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-gray-800 md:text-5xl">
              Kontakt & <span className="text-green-600">Zusammenarbeit</span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
              Du hast Fragen zum das Repair-Café oder zu anderen Themen? Schreib uns per Formular oder direkt an{" "}
              <a href={`mailto:${email}`} className="text-green-600 hover:underline">
                {email}
              </a>
              .
            </p>
          </div>

          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
