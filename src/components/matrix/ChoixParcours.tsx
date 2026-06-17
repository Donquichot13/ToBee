interface Props {
  onChoix: (parcours: 'simple' | 'expert') => void
}

export default function ChoixParcours({ onChoix }: Props) {
  return (
    <div className="max-w-3xl mx-auto animate-fade-up">
      <div className="text-center mb-14">
        <p className="text-2xs font-semibold tracking-widest uppercase text-gold-deep mb-3">
          Bienvenue sur la Matrice
        </p>
        <h1 className="font-serif text-ink tracking-tight mb-4" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
          Quel est votre parcours ?
        </h1>
        <p className="text-base text-forest-light">
          Choisissez le mode qui vous correspond.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Parcours Simple */}
        <button
          onClick={() => onChoix('simple')}
          className="group text-left bg-forest text-cream rounded-3xl p-10 flex flex-col justify-between min-h-80 hover:bg-ink transition-colors duration-300 hover:-translate-y-1 hover:shadow-2xl transform"
        >
          <div>
            <span className="text-5xl block mb-6">⚡</span>
            <p className="text-2xs font-semibold tracking-widest uppercase text-gold-light mb-3">
              Parcours Simple
            </p>
            <h2 className="font-serif text-3xl text-cream tracking-tight mb-4">
              Je veux une réponse rapide
            </h2>
            <p className="text-sm text-cream/70 leading-relaxed">
              Quelques questions simples et vous obtenez vos recommandations personnalisées
              en moins de 2 minutes. Aucune connaissance financière requise.
            </p>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-cream/60">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                3 questions essentielles
              </div>
              <div className="flex items-center gap-2 text-xs text-cream/60">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                Résultats immédiats
              </div>
              <div className="flex items-center gap-2 text-xs text-cream/60">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                {'< 2 minutes'}
              </div>
            </div>
            <span className="w-12 h-12 rounded-full border border-cream/30 flex items-center justify-center text-cream/70 group-hover:border-gold group-hover:text-gold transition-colors text-xl">
              →
            </span>
          </div>
        </button>

        {/* Parcours Expert */}
        <button
          onClick={() => onChoix('expert')}
          className="group text-left bg-paper border border-line rounded-3xl p-10 flex flex-col justify-between min-h-80 hover:bg-ivory hover:border-forest-light transition-colors duration-300 hover:-translate-y-1 hover:shadow-xl transform"
        >
          <div>
            <span className="text-5xl block mb-6">🎯</span>
            <p className="text-2xs font-semibold tracking-widest uppercase text-gold-deep mb-3">
              Parcours Expert
            </p>
            <h2 className="font-serif text-3xl text-ink tracking-tight mb-4">
              Je veux tout maîtriser
            </h2>
            <p className="text-sm text-forest-light leading-relaxed">
              Diagnostic complet avec timeline patrimoniale, simulateurs détaillés et matrice
              de solutions personnalisée. Pour aller au fond des choses.
            </p>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-moss">
                <span className="w-1.5 h-1.5 rounded-full bg-forest" />
                Profil complet
              </div>
              <div className="flex items-center gap-2 text-xs text-moss">
                <span className="w-1.5 h-1.5 rounded-full bg-forest" />
                6 simulateurs financiers
              </div>
              <div className="flex items-center gap-2 text-xs text-moss">
                <span className="w-1.5 h-1.5 rounded-full bg-forest" />
                Matrice de solutions complète
              </div>
            </div>
            <span className="w-12 h-12 rounded-full border border-line flex items-center justify-center text-ink group-hover:border-forest group-hover:text-forest transition-colors text-xl">
              →
            </span>
          </div>
        </button>
      </div>

      <p className="text-center text-xs text-moss mt-8">
        Vous pouvez changer de parcours à tout moment ↺
      </p>
    </div>
  )
}
