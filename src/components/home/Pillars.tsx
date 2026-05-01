import { useNavigate } from 'react-router-dom'

const piliers = [
  {
    num: '01',
    icon: '🎓',
    titre: 'Études',
    desc: 'Financer les études de vos enfants sans sacrifier votre épargne personnelle.',
    href: '/matrice',
  },
  {
    num: '02',
    icon: '🏖️',
    titre: 'Retraite',
    desc: 'Constituer un capital pour maintenir votre niveau de vie après 67 ans.',
    href: '/matrice',
  },
  {
    num: '03',
    icon: '💼',
    titre: 'Projet',
    desc: 'Financer vos projets immobiliers, professionnels ou personnels.',
    href: '/matrice',
  },
  {
    num: '04',
    icon: '🏥',
    titre: 'Dépendance',
    desc: 'Anticiper les coûts de perte d'autonomie (12 000 € à 42 000 €/an).',
    href: '/matrice',
  },
  {
    num: '05',
    icon: '📜',
    titre: 'Succession',
    desc: 'Optimiser la transmission de votre patrimoine dans le respect des abattements.',
    href: '/matrice',
  },
  {
    num: '06',
    icon: '💰',
    titre: 'Impôts',
    desc: 'Réduire votre fiscalité via PER, niches fiscales et stratégies adaptées.',
    href: '/matrice',
  },
]

export default function Pillars() {
  const navigate = useNavigate()

  return (
    <section className="px-8 md:px-12 py-24 bg-paper border-y border-line-soft">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end mb-16">
          <div>
            <p className="text-2xs font-semibold tracking-widest uppercase text-gold-deep mb-4">
              Les 6 piliers
            </p>
            <h2 className="font-serif text-ink leading-tight tracking-tight" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
              Chaque étape de vie,{' '}
              <em className="italic text-forest-light">une stratégie</em>
            </h2>
          </div>
          <p className="text-base text-forest-light leading-relaxed">
            La Matrice Patrimoniale analyse votre situation et active automatiquement les modules
            pertinents selon votre âge et vos objectifs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line-soft border border-line-soft rounded-3xl overflow-hidden">
          {piliers.map((p) => (
            <button
              key={p.num}
              onClick={() => navigate(p.href)}
              className="bg-paper hover:bg-ivory text-left p-10 flex flex-col justify-between min-h-60 group transition-colors duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-serif italic text-sm text-gold-deep mb-4">{p.num}</p>
                  <span className="text-4xl mb-5 block">{p.icon}</span>
                  <h3 className="font-serif text-2xl text-ink tracking-tight mb-2">{p.titre}</h3>
                  <p className="text-xs text-forest-light leading-relaxed">{p.desc}</p>
                </div>
                <div className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-ink group-hover:border-gold group-hover:text-gold transition-colors duration-200 flex-shrink-0 ml-4">
                  ↗
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
