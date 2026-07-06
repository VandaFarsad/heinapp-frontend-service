export default function AboutHeroSection() {
  return (
    <section className="radhaus-gradient relative flex min-h-screen items-start justify-center overflow-hidden pt-32 pb-12 md:pt-40">
      <div className="relative z-30 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="radhaus-title mb-6 text-4xl leading-tight font-bold tracking-tight text-gray-800 sm:text-5xl md:text-6xl">
            Über uns
          </h1>
          <p className="mx-auto mb-8 max-w-4xl text-lg leading-relaxed font-light text-gray-700 sm:text-xl md:text-2xl">
            Die Geschichte und Werte der HeiNa Baugemeinschaft
          </p>

          {/* Gruppenbild-Platzhalter */}
          <div className="mx-auto mt-8 flex max-w-2xl items-center justify-center rounded-2xl border-2 border-dashed border-gray-400/50 bg-white/30 px-12 py-24 backdrop-blur-sm md:py-32">
            <div className="text-center">
              <span className="mb-2 block text-4xl">📸</span>
              <p className="text-lg font-medium text-gray-600">Hier kommt bald unser Gruppenbild</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
