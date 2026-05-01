import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="px-8 md:px-12 pt-20 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-7xl mx-auto items-center min-h-[calc(100vh-75px)]">
      {/* Left */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 text-2xs font-semibold tracking-widest uppercase text-moss mb-7">
          <span className="w-8 h-px bg-gold" />
          Matrice Patrimoniale Digitale
        </div>

        <h1 className="font-serif text-ink leading-[0.98] tracking-tight mb-8" style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}>
          Le banquier,
          <br />
          <em className="not-italic text-forest">maintenant</em>
          <br />
          <span className="italic text-gold-deep relative">
            c'est vous.
            <span
              className="absolute left-0 right-0 bottom-2 h-1.5 bg-gold-light/40 -z-10"
              aria-hidden
            />
          </span>
        </h1>

        <p className="text-lg text-forest-light max-w-lg mb-10 leading-relaxed">
          Votre outil de conseil patrimonial personnalisé. Diagnostiquez, simulez et découvrez les
          solutions adaptées à chaque étape de votre vie — de 18 à 90 ans.
        </p>

        <div className="flex items-center gap-5">
          <button
            onClick={() => navigate('/matrice')}
            className="bg-forest text-cream px-8 py-4 rounded-full text-sm font-medium hover:bg-ink hover:-translate-y-px hover:shadow-xl transition-all duration-200"
          >
            Démarrer mon diagnostic gratuit
          </button>
          <span className="flex items-center gap-2 text-xs text-moss">
            <span className="w-2 h-2 rounded-full bg-gold" />
            Aucune inscription requise
          </span>
        </div>
      </div>

      {/* Right — floating cards */}
      <div className="relative h-[520px] hidden lg:block">
        {/* Decoration */}
        <span className="absolute -left-24 top-1/4 font-serif italic text-[240px] text-cream-deep font-extralight pointer-events-none select-none">
          B
        </span>

        {/* Card 1 — Simulation retraite */}
        <div className="absolute top-0 right-0 w-72 bg-ivory border border-line rounded-2xl p-6 shadow-xl animate-float z-30">
          <p className="text-2xs font-semibold tracking-widest uppercase text-moss mb-2">
            Simulation retraite
          </p>
          <p className="font-serif text-3xl text-ink tracking-tight">+1 240 €<span className="text-lg text-moss">/mois</span></p>
          <div className="flex justify-between mt-3 text-xs text-moss">
            <span>Effort mensuel</span>
            <span className="text-forest font-semibold">32 ans d'épargne</span>
          </div>
          <div className="mt-3 h-14 flex items-end gap-1">
            {[35, 48, 42, 60, 55, 72, 68, 85, 80, 100].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-gold to-gold-light"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* Card 2 — Études */}
        <div className="absolute top-36 left-0 w-64 bg-forest text-cream border border-forest-light rounded-2xl p-6 shadow-xl animate-float-delay z-20">
          <p className="text-2xs font-semibold tracking-widest uppercase text-gold-light mb-2">
            Études enfant (2 ans)
          </p>
          <p className="font-serif text-3xl text-cream tracking-tight">161 €<span className="text-lg text-gold-light">/mois</span></p>
          <div className="flex justify-between mt-3 text-xs text-gold-light">
            <span>Budget : 36 000 €</span>
            <span>16 ans</span>
          </div>
        </div>

        {/* Card 3 — Patrimoine */}
        <div className="absolute bottom-0 right-10 w-80 bg-ivory border border-line rounded-2xl p-6 shadow-xl animate-float-fast z-40">
          <p className="text-2xs font-semibold tracking-widest uppercase text-moss mb-3">
            Mon patrimoine global
          </p>
          <p className="font-serif text-4xl text-ink tracking-tight mb-4">284 500 €</p>
          <div className="space-y-2">
            {[
              { label: 'Épargne', pct: 40, color: 'bg-gold' },
              { label: 'Immobilier', pct: 45, color: 'bg-forest' },
              { label: 'Valeurs mob.', pct: 15, color: 'bg-moss' },
            ].map(({ label, pct, color }) => (
              <div key={label} className="flex items-center gap-3 text-xs text-moss">
                <span className="w-16">{label}</span>
                <div className="flex-1 h-1.5 bg-cream-deep rounded-full overflow-hidden">
                  <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                </div>
                <span className="font-mono w-8 text-right">{pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
