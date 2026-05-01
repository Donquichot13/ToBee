import { useNavigate } from 'react-router-dom'

const solutions = [
  {
    id: 'immobilier',
    icone: '🏠',
    titre: 'Immobilier',
    piliers: ['Études', 'Retraite', 'Projet', 'Dépendance'],
    avantages: ['Effet de levier crédit', 'Revenus locatifs', 'Valorisation long terme', 'Transmission patrimoniale'],
    description: 'L\'immobilier reste le placement préféré des Français. Que ce soit en résidence principale, investissement locatif ou SCPI, il répond à de nombreux objectifs patrimoniaux.',
    tag: 'Versatile',
  },
  {
    id: 'scpi',
    icone: '📊',
    titre: 'SCPI',
    piliers: ['Retraite', 'Projet', 'Dépendance'],
    avantages: ['Revenus réguliers', 'Ticket d\'entrée accessible', 'Gestion déléguée', 'Mutualisation des risques'],
    description: 'Les Sociétés Civiles de Placement Immobilier offrent les avantages de l\'immobilier sans les contraintes de gestion. Rendement moyen : 4 à 6% par an.',
    tag: 'Rendement',
  },
  {
    id: 'assurance-vie',
    icone: '🛡️',
    titre: 'Assurance Vie',
    piliers: ['Études', 'Retraite', 'Dépendance', 'Succession'],
    avantages: ['Fiscalité avantageuse après 8 ans', 'Transmission hors succession', '0% droits d\'entrée (NETLIFE)', 'Souplesse des rachats'],
    description: 'L\'assurance vie est le couteau suisse de la gestion patrimoniale. Contrats NETLIFE et VIE-PLUS disponibles : 0% frais d\'entrée, 0% frais d\'arbitrage.',
    tag: 'Incontournable',
    highlight: true,
  },
  {
    id: 'per',
    icone: '📈',
    titre: 'PER — Plan Épargne Retraite',
    piliers: ['Retraite', 'Dépendance', 'Impôts'],
    avantages: ['Déduction fiscale à l\'entrée', 'Capital disponible à la retraite', 'Transfert d\'anciens contrats', 'Déblocage anticipé possible'],
    description: 'Le PER permet de déduire vos versements de votre revenu imposable. Idéal si votre TMI est de 30% ou plus. Économie d\'impôt immédiate et capital pour la retraite.',
    tag: 'Fiscal',
  },
  {
    id: 'pea',
    icone: '📉',
    titre: 'PEA — Plan Épargne Actions',
    piliers: ['Retraite', 'Impôts'],
    avantages: ['Exonération d\'impôt après 5 ans', 'Prise de date dès 18 ans', 'Plafond 150 000 €', 'Dividendes réinvestis'],
    description: 'Le PEA est idéal pour investir en bourse avec une fiscalité allégée. Recommandation : ouvrir dès 18 ans pour démarrer le compte à rebours fiscal.',
    tag: 'Long terme',
  },
  {
    id: 'prevoyance',
    icone: '🔒',
    titre: 'Prévoyance & Protection',
    piliers: ['Dépendance'],
    avantages: ['GAV — Garantie Accidents de la Vie', 'Protection Juridique', 'Assurance Décès-Invalidité', 'Couverture complète'],
    description: 'La prévoyance protège votre famille contre les aléas de la vie. GAV, PJ, décès-invalidité : une couverture complète pour dormir sereinement.',
    tag: 'Protection',
  },
]

export default function Solutions() {
  const navigate = useNavigate()

  return (
    <main className="py-16 px-8 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-2xs font-semibold tracking-widest uppercase text-gold-deep mb-4">
            Fiches solutions
          </p>
          <h1 className="font-serif text-ink tracking-tight mb-4" style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}>
            Les solutions patrimoniales
          </h1>
          <p className="text-base text-forest-light max-w-2xl">
            Chaque solution est adaptée à des objectifs spécifiques. La Matrice vous indique lesquelles correspondent à votre profil.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s) => (
            <div
              key={s.id}
              className={`rounded-3xl border p-8 flex flex-col ${s.highlight ? 'bg-forest text-cream border-forest' : 'bg-paper border-line hover:border-forest-light transition-colors'}`}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-4xl">{s.icone}</span>
                <span className={`text-2xs font-semibold px-3 py-1 rounded-full ${s.highlight ? 'bg-gold/20 text-gold-light' : 'bg-gold/10 text-gold-deep'}`}>
                  {s.tag}
                </span>
              </div>

              <h2 className={`font-serif text-2xl mb-3 tracking-tight ${s.highlight ? 'text-cream' : 'text-ink'}`}>
                {s.titre}
              </h2>

              <p className={`text-sm mb-5 leading-relaxed flex-1 ${s.highlight ? 'text-cream/80' : 'text-forest-light'}`}>
                {s.description}
              </p>

              <div className="mb-5">
                <p className={`text-2xs font-semibold uppercase tracking-widest mb-2 ${s.highlight ? 'text-gold-light' : 'text-moss'}`}>
                  Objectifs couverts
                </p>
                <div className="flex flex-wrap gap-2">
                  {s.piliers.map((p) => (
                    <span key={p} className={`text-xs px-2 py-1 rounded-full ${s.highlight ? 'bg-cream/10 text-cream' : 'bg-cream-deep text-forest'}`}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <ul className="space-y-1.5 mb-6">
                {s.avantages.map((a) => (
                  <li key={a} className={`text-xs flex gap-2 ${s.highlight ? 'text-cream/80' : 'text-forest-light'}`}>
                    <span className={s.highlight ? 'text-gold' : 'text-gold-deep'}>✓</span>
                    {a}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate('/contact')}
                className={`w-full py-3 rounded-full text-sm font-medium transition-all duration-200 ${s.highlight ? 'bg-gold text-ink hover:bg-gold-light' : 'border border-forest text-forest hover:bg-forest hover:text-cream'}`}
              >
                En savoir plus — Prendre RDV
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-cream-deep rounded-3xl p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-2xs font-semibold uppercase tracking-widest text-gold-deep mb-2">Pas sûr de votre choix ?</p>
            <h3 className="font-serif text-2xl text-ink">Faites votre diagnostic pour voir les solutions adaptées à votre profil.</h3>
          </div>
          <button
            onClick={() => navigate('/matrice')}
            className="bg-forest text-cream px-8 py-4 rounded-full text-sm font-semibold hover:bg-ink transition-colors flex-shrink-0"
          >
            Démarrer la Matrice
          </button>
        </div>
      </div>
    </main>
  )
}
