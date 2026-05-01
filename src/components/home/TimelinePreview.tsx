import { useNavigate } from 'react-router-dom'

const milestones = [
  { age: '18', label: 'Prise de date PEA / AV', color: 'bg-gold' },
  { age: '30', label: 'Projet & apport immobilier', color: 'bg-forest' },
  { age: '45', label: 'Immo / SCPI / revenus passifs', color: 'bg-forest-light' },
  { age: '55', label: 'Retraite — revenus ÷ 2', color: 'bg-gold-deep' },
  { age: '65', label: 'Dépendance — anticipation', color: 'bg-rust' },
  { age: '80', label: 'Succession & transmission', color: 'bg-moss' },
  { age: '90+', label: 'Optimisation héritiers', color: 'bg-ink' },
]

export default function TimelinePreview() {
  const navigate = useNavigate()

  return (
    <section className="px-8 md:px-12 py-24 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-16">
        <div>
          <p className="text-2xs font-semibold tracking-widest uppercase text-gold-deep mb-4">
            Timeline patrimoniale
          </p>
          <h2 className="font-serif text-ink tracking-tight" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
            De 18 à 90 ans —<br />
            <em className="italic text-forest-light">votre parcours</em>
          </h2>
        </div>
        <button
          onClick={() => navigate('/matrice')}
          className="border border-forest text-forest px-6 py-3 rounded-full text-sm font-medium hover:bg-forest hover:text-cream transition-all duration-200 flex-shrink-0"
        >
          Me positionner sur la timeline →
        </button>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Line */}
        <div className="absolute top-5 left-0 right-0 h-px bg-line-soft" />

        <div className="grid grid-cols-7 gap-2 relative">
          {milestones.map((m, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className={`w-10 h-10 rounded-full ${m.color} flex items-center justify-center relative z-10 mb-4`}>
                <span className="font-mono text-2xs font-semibold text-cream">{m.age}</span>
              </div>
              <p className="text-xs text-forest-light leading-snug">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA band */}
      <div className="mt-16 bg-forest rounded-3xl p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-2xs font-semibold tracking-widest uppercase text-gold-light mb-3">
            Où êtes-vous ?
          </p>
          <h3 className="font-serif text-cream text-2xl tracking-tight">
            Positionnez-vous sur la timeline<br />et recevez vos recommandations.
          </h3>
        </div>
        <button
          onClick={() => navigate('/matrice')}
          className="bg-gold text-ink px-8 py-4 rounded-full text-sm font-semibold hover:bg-gold-light transition-colors duration-200 flex-shrink-0"
        >
          Démarrer — gratuit
        </button>
      </div>
    </section>
  )
}
