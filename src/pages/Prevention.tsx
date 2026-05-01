import { useState } from 'react'
import { formatEuro } from '../utils/calculations'

const produits = [
  {
    id: 'gav',
    icone: '🛡️',
    titre: 'GAV — Garantie Accidents de la Vie',
    description: 'Couvre les accidents de la vie quotidienne non pris en charge par les assurances classiques. Complémentaire à votre mutuelle santé.',
    garanties: [
      'Accidents corporels (domestiques, loisirs)',
      'Invalidité permanente totale ou partielle',
      'Décès accidentel',
      'Préjudice moral et esthétique',
    ],
    tarif: 'À partir de 10 €/mois',
  },
  {
    id: 'pj',
    icone: '⚖️',
    titre: 'Protection Juridique',
    description: 'Défend vos droits et prend en charge les frais de procédure en cas de litige (travail, consommation, immobilier, voisinage…).',
    garanties: [
      'Conseil juridique téléphonique',
      'Frais d\'avocat pris en charge',
      'Médiation amiable',
      'Litiges professionnels et personnels',
    ],
    tarif: 'À partir de 8 €/mois',
  },
  {
    id: 'deces',
    icone: '🌿',
    titre: 'Assurance Décès-Invalidité',
    description: 'Protège vos proches en cas de décès ou d\'invalidité. Capital versé aux bénéficiaires désignés.',
    garanties: [
      'Capital décès toutes causes',
      'Invalidité absolue et définitive',
      'Choix entre prime unique et périodique',
      'Bénéficiaires librement désignés',
    ],
    tarif: 'Selon profil & capital',
  },
]

export default function Prevention() {
  const [capitalDeces, setCapitalDeces] = useState(200000)
  const [age, setAge] = useState(35)
  const primeMensuelle = Math.round((capitalDeces / 100000) * (age / 35) * 15)

  return (
    <main className="py-16 px-8 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-2xs font-semibold tracking-widest uppercase text-gold-deep mb-4">
            Prévoyance & Protection
          </p>
          <h1 className="font-serif text-ink tracking-tight mb-4" style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}>
            Protégez ce qui compte
          </h1>
          <p className="text-base text-forest-light max-w-2xl">
            La prévoyance protège votre famille et votre patrimoine contre les aléas de la vie.
            Trois solutions complémentaires pour une couverture complète.
          </p>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {produits.map((p) => (
            <div key={p.id} className="bg-paper border border-line rounded-3xl p-8 flex flex-col">
              <span className="text-4xl mb-5 block">{p.icone}</span>
              <h2 className="font-serif text-xl text-ink mb-3">{p.titre}</h2>
              <p className="text-sm text-forest-light leading-relaxed mb-5 flex-1">{p.description}</p>
              <ul className="space-y-2 mb-6">
                {p.garanties.map((g) => (
                  <li key={g} className="flex gap-2 text-xs text-forest-light">
                    <span className="text-gold-deep mt-0.5">✓</span>
                    {g}
                  </li>
                ))}
              </ul>
              <div className="border-t border-line-soft pt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-forest">{p.tarif}</span>
                <span className="text-2xs px-3 py-1 bg-gold/10 text-gold-deep rounded-full">Indicatif</span>
              </div>
            </div>
          ))}
        </div>

        {/* Simulator */}
        <div className="bg-forest rounded-3xl p-10">
          <p className="text-2xs font-semibold tracking-widest uppercase text-gold-light mb-4">
            Simulateur décès-invalidité
          </p>
          <h2 className="font-serif text-2xl text-cream mb-8">Estimez votre prime mensuelle</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="text-2xs font-semibold uppercase tracking-widest text-gold-light block mb-3">
                Capital souhaité — <span className="font-mono text-cream">{formatEuro(capitalDeces)}</span>
              </label>
              <input
                type="range"
                min={50000}
                max={1000000}
                step={10000}
                value={capitalDeces}
                onChange={(e) => setCapitalDeces(+e.target.value)}
                className="w-full accent-gold"
              />
              <div className="flex justify-between text-xs text-gold-light mt-1">
                <span>50 000 €</span><span>1 000 000 €</span>
              </div>
            </div>
            <div>
              <label className="text-2xs font-semibold uppercase tracking-widest text-gold-light block mb-3">
                Votre âge — <span className="font-mono text-cream">{age} ans</span>
              </label>
              <input
                type="range"
                min={18}
                max={70}
                value={age}
                onChange={(e) => setAge(+e.target.value)}
                className="w-full accent-gold"
              />
              <div className="flex justify-between text-xs text-gold-light mt-1">
                <span>18</span><span>70</span>
              </div>
            </div>
          </div>

          <div className="bg-cream/10 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p className="text-2xs text-gold-light uppercase tracking-widest mb-1">Prime mensuelle estimée</p>
              <p className="font-serif text-4xl text-cream">{formatEuro(primeMensuelle)}<span className="text-xl text-gold-light">/mois</span></p>
              <p className="text-xs text-cream/60 mt-2">Estimation indicative — tarif selon questionnaire santé</p>
            </div>
            <a
              href="/contact"
              className="bg-gold text-ink px-6 py-3 rounded-full text-sm font-semibold hover:bg-gold-light transition-colors"
            >
              Obtenir un devis
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
