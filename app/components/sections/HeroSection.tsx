"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { AnimatedBicycleIcon } from "../icons";

export default function HeroSection() {
  const scrollToRadhaus = () => {
    const radhausSection = document.getElementById("radhaus");
    if (radhausSection) {
      radhausSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="radhaus-gradient relative min-h-screen overflow-hidden">
      {/* Backdrop Blur Overlay - liegt unter dem Bild */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        className="pointer-events-none absolute inset-0 z-20 bg-black/40 backdrop-blur-lg"
        id="backdrop-overlay"
      />

      <div className="relative z-30 px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* RADhaus Illustration - Prominente Platzierung oben */}
          <div className="mb-8 text-center lg:mb-12">
            <div className="relative inline-block">
              {/* RADhaus Bild */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.2,
                }}
                whileHover={{
                  scale: 1.8,
                  transformOrigin: "center top",
                  zIndex: 50,
                  transition: { duration: 0.5, ease: "easeOut" },
                }}
                onHoverStart={() => {
                  const overlay = document.getElementById("backdrop-overlay");
                  if (overlay) {
                    overlay.style.opacity = "1";
                    overlay.style.transition = "opacity 0.5s ease-out";
                  }
                }}
                onHoverEnd={() => {
                  const overlay = document.getElementById("backdrop-overlay");
                  if (overlay) {
                    overlay.style.opacity = "0";
                    overlay.style.transition = "opacity 0.5s ease-out";
                  }
                }}
                style={{ transformOrigin: "center top" }}
                className="relative z-50 mx-auto mb-4 h-64 w-64 cursor-pointer sm:h-80 sm:w-80 lg:h-[320px] lg:w-[400px]"
              >
                <div className="flex h-full w-full items-center justify-center rounded-3xl border border-lime-200/60 bg-lime-50/90 shadow-2xl">
                  <Image
                    src="/images/radhaus-building.png"
                    alt="HeiNa RADhaus - Architekturvisualisierung"
                    fill
                    className="object-contain p-8"
                    priority
                  />
                </div>
              </motion.div>

              {/* Architekten-Credit */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="radhaus-subtitle mb-6 text-sm font-medium text-gray-600 italic"
              >
                Entwurf: Scharabi Architekten
              </motion.p>
            </div>
          </div>

          {/* Text-Bereich zentriert unter dem Bild */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto max-w-5xl text-center"
          >
            <h1 className="radhaus-title mb-4 text-3xl leading-tight font-bold tracking-tight text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              HeiNa lebt im <span className="text-green-800">RADhaus</span>
            </h1>
            <p className="mx-auto mb-8 max-w-4xl text-base leading-relaxed font-light text-gray-700 sm:text-lg md:text-xl lg:text-2xl">
              <strong className="font-semibold text-green-800">Hei</strong>tere{" "}
              <strong className="font-semibold text-green-800">Na</strong>
              chbarschaft in Wilhelmsburg. Nachhaltig unterwegs. Gemeinsam. Mit dem Fahrrad.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex justify-center"
            >
              <motion.button
                onClick={scrollToRadhaus}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-green-700 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:bg-green-800 hover:shadow-xl"
              >
                Mehr über unser RADhaus
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Zentrales animiertes Fahrrad - jetzt im Vordergrund und neu positioniert */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
          delay: 1.2,
        }}
        className="absolute right-8 bottom-8 z-20 text-green-600/70"
      >
        <AnimatedBicycleIcon className="h-32 w-32 md:h-40 md:w-40" />
      </motion.div>
    </section>
  );
}
