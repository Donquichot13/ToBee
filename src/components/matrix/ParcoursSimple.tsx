import { useState } from 'react'
import {
  calcRetraite,
  calcEtudes,
  calcSuccession,
  calcImpots,
  calcDependance,
  formatEuro,
} from '../../utils/calculations'
import type { Pilier } from '../../types'

interface Props {
  onSwitchExpert: () => void
}

interface SimpleData {
  age: number
  situation: 'seul' | 'couple'
  revenus: number
  revenusConjoint: number
  objectif: Pilier | null
}

const OBJECTIFS: { id: Pilier; icon: string; label: string }[] = [
  { id: 'retraite', icon: '🏖️', label: 'Retraite' },
  { id: 'etudes', icon: '🎓', label: "Études" },
  { id: 'projet', icon: '💼', label: 'Projet' },
  { id: 'dependance', icon: '🏥', label: "Dépendance" },
  { id: 'succession', icon: '📜', label: 'Succession' },
  { id: 'impots', icon: '💰', label: "Impôts" },
]

export default function ParcoursSimple({ onSwitchExpert }: Props) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<SimpleData>({
    age: 35,
    situation: 'seul',
    revenus: 3000,
    revenusConjoint: 0,
    objectif: null,
  })

  const totalRevenus = data.situation === 'couple'
    ? data.revenus + data.revenusConjoint
    : data.revenus

  return (
    <div className="max-w-xl mx-auto animate-fade-up">
      {/* Progress */}
      {step < 4 && (
        <div className="mb-10">
          <div className="flex gap-2 mb-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-forest' : 'bg-line'}`} />
            ))}
          </div>
          <p className="text-xs text-moss">Étape {step} sur 3</p>
        </div>
      )}

      {/* ÉTAPE 1 — Âge */}
      {step === 1 && (
        <div className="animate-fade-up">
          <h2 className="font-serif text-4xl text-ink tracking-tight mb-3">Quel âge avez-vous ?</h2>
          <p className="text-sm text-moss mb-8">Nous adaptons nos recommandations à votre étape de vie.</p>

          <div className="bg-paper border border-line rounded-2xl p-8 mb-8 text-center">
            <span className="font-serif text-8xl text-forest font-bold">{data.age}</span>
            <span className="text-2xl text-moss ml-2">ans</span>
            <div className="mt-6">
              <input
                type="range"
                min={18}
                max={80}
                value={data.age}
                onChange={(e) => setData((d) => ({ ...d, age: +e.target.value }))}
                className="w-full accent-forest h-2"
              />
              <div className="flex justify-between text-xs text-moss mt-2"><span>18 ans</span><span>80 ans</span></div>
            </div>
          </div>

          <button onClick={() => setStep(2)} className="w-full bg-forest text-cream py-4 rounded-2xl font-semibold hover:bg-ink transition-colors text-base">
            Continuer →
          </button>
        </div>
      )}

      {/* ÉTAPE 2 — Situation & Revenus */}
      {step === 2 && (
        <div className="animate-fade-up">
          <h2 className="font-serif text-4xl text-ink tracking-tight mb-3">Votre situation ?</h2>
          <p className="text-sm text-moss mb-8">Cela nous aide à calculer vos revenus du foyer.</p>

          {/* Situation */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { v: 'seul' as const, icon: '👤', label: "Seul(e)" },
              { v: 'couple' as const, icon: '👫', label: "En couple" },
            ].map(({ v, icon, label }) => (
              <button
                key={v}
                onClick={() => setData((d) => ({ ...d, situation: v, revenusConjoint: 0 }))}
                className={`p-5 rounded-2xl border-2 text-center transition-all ${
                  data.situation === v ? 'border-forest bg-forest/5' : 'border-line bg-paper hover:border-forest/40'
                }`}
              >
                <span className="text-3xl block mb-2">{icon}</span>
                <p className={`font-semibold ${data.situation === v ? 'text-forest' : 'text-ink'}`}>{label}</p>
              </button>
            ))}
          </div>

          {/* Revenus */}
          {data.situation === 'seul' ? (
            <div className="bg-paper border border-line rounded-2xl p-6 mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-moss mb-4">
                Revenus mensuels — <span className="font-mono text-gold-deep">{data.revenus.toLocaleString('fr-FR')} €</span>
              </p>
              <input
                type="range" min={500} max={15000} step={100}
                value={data.revenus}
                onChange={(e) => setData((d) => ({ ...d, revenus: +e.target.value }))}
                className="w-full accent-forest h-2"
              />
              <div className="flex justify-between text-xs text-moss mt-2"><span>500 €</span><span>15 000 €</span></div>
            </div>
          ) : (
            <div className="space-y-4 mb-8">
              <div className="bg-paper border border-line rounded-2xl p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-moss mb-3">
                  Conjoint 1 — <span className="font-mono text-gold-deep">{data.revenus.toLocaleString('fr-FR')} €/mois</span>
                </p>
                <input
                  type="range" min={0} max={15000} step={100}
                  value={data.revenus}
                  onChange={(e) => setData((d) => ({ ...d, revenus: +e.target.value }))}
                  className="w-full accent-forest h-2"
                />
                <div className="flex justify-between text-xs text-moss mt-2"><span>0 €</span><span>15 000 €</span></div>
              </div>
              <div className="bg-paper border border-line rounded-2xl p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-moss mb-3">
                  Conjoint 2 — <span className="font-mono text-gold-deep">{data.revenusConjoint.toLocaleString('fr-FR')} €/mois</span>
                </p>
                <input
                  type="range" min={0} max={15000} step={100}
                  value={data.revenusConjoint}
                  onChange={(e) => setData((d) => ({ ...d, revenusConjoint: +e.target.value }))}
                  className="w-full accent-forest h-2"
                />
                <div className="flex justify-between text-xs text-moss mt-2"><span>0 €</span><span>15 000 €</span></div>
              </div>
              <div className="text-center text-sm text-moss">
                Total foyer : <span className="font-mono font-semibold text-forest">{totalRevenus.toLocaleString('fr-FR')} €/mois</span>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="px-6 py-4 rounded-2xl border border-line text-ink hover:bg-ivory transition-colors">←</button>
            <button onClick={() => setStep(3)} className="flex-1 bg-forest text-cream py-4 rounded-2xl font-semibold hover:bg-ink transition-colors text-base">Continuer →</button>
          </div>
        </div>
      )}

      {/* ÉTAPE 3 — Objectif */}
      {step === 3 && (
        <div className="animate-fade-up">
          <h2 className="font-serif text-4xl text-ink tracking-tight mb-3">Votre priorité ?</h2>
          <p className="text-sm text-moss mb-8">Choisissez le sujet qui vous préoccupe le plus en ce moment.</p>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {OBJECTIFS.map((o) => (
              <button
                key={o.id}
                onClick={() => setData((d) => ({ ...d, objectif: o.id }))}
                className={`p-5 rounded-2xl border-2 text-left transition-all ${
                  data.objectif === o.id ? 'border-forest bg-forest/5' : 'border-line bg-paper hover:border-forest/40'
                }`}
              >
                <span className="text-3xl block mb-2">{o.icon}</span>
                <p className={`font-serif text-lg ${data.objectif === o.id ? 'text-forest' : 'text-ink'}`}>{o.label}</p>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="px-6 py-4 rounded-2xl border border-line text-ink hover:bg-ivory transition-colors">←</button>
            <button
              onClick={() => setStep(4)}
              disabled={!data.objectif}
              className="flex-1 bg-forest text-cream py-4 rounded-2xl font-semibold hover:bg-ink transition-colors text-base disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Voir ma recommandation →
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 4 — Résultats simples */}
      {step === 4 && data.objectif && (
        <SimpleResults
          data={data}
          totalRevenus={totalRevenus}
          onBack={() => setStep(3)}
          onSwitchExpert={onSwitchExpert}
        />
      )}
    </div>
  )
}

function SimpleResults({
  data,
  totalRevenus,
  onBack,
  onSwitchExpert,
}: {
  data: SimpleData
  totalRevenus: number
  onBack: () => void
  onSwitchExpert: () => void
}) {
  const info = OBJECTIFS.find((o) => o.id === data.objectif)!
  const rec = getRecommendation(data, totalRevenus)

  return (
    <div className="animate-fade-up">
      {/* En-tête discret */}
      <div className="mb-8">
        <span className="text-3xl">{info.icon}</span>
        <p className="text-xs font-semibold uppercase tracking-widest text-moss mt-3 mb-1">Votre recommandation — {info.label}</p>
        <h2 className="font-serif text-3xl text-ink tracking-tight">{rec.titre}</h2>
      </div>

      {/* Chiffre clé — sobre */}
      <div className="border-l-4 border-forest pl-5 mb-8">
        <p className="text-xs text-moss mb-1">{rec.kpiLabel}</p>
        <p className="font-serif text-4xl text-forest">{rec.kpiValue}</p>
        {rec.kpiSub && <p className="text-xs text-moss mt-1">{rec.kpiSub}</p>}
      </div>

      {/* Solution recommandée — une seule */}
      <div className="bg-paper border border-line rounded-2xl p-6 mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold-deep mb-4">Solution recommandée</p>
        <div className="flex gap-3 items-start">
          <span className="text-gold text-lg mt-0.5">★</span>
          <div>
            <p className="font-semibold text-ink mb-1">{rec.solution.nom}</p>
            <p className="text-xs text-moss leading-relaxed">{rec.solution.desc}</p>
          </div>
        </div>
      </div>

      {/* CTA Expert */}
      <button
        onClick={onSwitchExpert}
        className="w-full bg-forest text-cream py-4 rounded-2xl font-semibold hover:bg-ink transition-colors mb-3 text-sm"
      >
        Simulation complète → Parcours Expert
      </button>
      <button
        onClick={onBack}
        className="w-full py-3 rounded-2xl border border-line text-moss hover:bg-ivory transition-colors text-sm"
      >
        ← Modifier
      </button>

      <p className="text-center text-xs text-moss/60 mt-6">
        Estimation indicative — consultez un conseiller pour un bilan personnalisé.
      </p>
    </div>
  )
}

interface Rec {
  titre: string
  kpiLabel: string
  kpiValue: string
  kpiSub: string
  solution: { nom: string; desc: string }
}

function getRecommendation(data: SimpleData, revenus: number): Rec {
  const age = data.age

  switch (data.objectif) {
    case 'retraite': {
      const r = calcRetraite(age, 67, revenus)
      return {
        titre: "Préparez votre retraite dès maintenant",
        kpiLabel: "Effort mensuel recommandé",
        kpiValue: `${formatEuro(r.mensuel)}/mois`,
        kpiSub: `pendant ${r.duree} ans pour viser ${formatEuro(r.capitalCible)}`,
        solution: {
          nom: "Plan d'Épargne Retraite (PER)",
          desc: "Déduction fiscale immédiate sur vos versements + capital disponible à la retraite. Solution prioritaire pour optimiser effort et fiscalité.",
        },
      }
    }

    case 'etudes': {
      const r = calcEtudes(10, 50000, 5000)
      return {
        titre: "Anticipez les études de vos enfants",
        kpiLabel: "Épargne mensuelle indicative",
        kpiValue: `${formatEuro(r.mensuel)}/mois`,
        kpiSub: "pour constituer 50 000 € sur 8 ans",
        solution: {
          nom: "Assurance-Vie",
          desc: "Enveloppe souple et fiscalement avantageuse, transmissible à votre enfant. Idéal pour un horizon de 5 à 18 ans.",
        },
      }
    }

    case 'projet': {
      const epargne = Math.round(revenus * 0.1)
      return {
        titre: "Épargnez pour concrétiser votre projet",
        kpiLabel: "Capacité mensuelle estimée",
        kpiValue: `${formatEuro(epargne)}/mois`,
        kpiSub: "soit environ 10 % de vos revenus nets",
        solution: {
          nom: "Plan d'Épargne Logement (PEL)",
          desc: "Taux garanti, accès à un prêt immobilier à taux préférentiel. Solution idéale pour un projet immobilier à 2-5 ans.",
        },
      }
    }

    case 'dependance': {
      const r = calcDependance(age)
      return {
        titre: "Anticipez la perte d'autonomie",
        kpiLabel: "Coût moyen de la dépendance",
        kpiValue: `${formatEuro(r.coutMoyen)}/an`,
        kpiSub: r.urgence === 'haute' ? "Souscription urgente recommandée" : `Il vous reste ${r.anneesAvant80} ans avant 80 ans`,
        solution: {
          nom: "Contrat Dépendance",
          desc: "Rente mensuelle versée en cas de perte d'autonomie. À souscrire impérativement avant 80 ans pour bénéficier des meilleures conditions.",
        },
      }
    }

    case 'succession': {
      const r = calcSuccession(revenus * 12 * 20, 2)
      return {
        titre: "Optimisez votre transmission",
        kpiLabel: "Droits de succession estimés",
        kpiValue: formatEuro(r.droitsEstimes),
        kpiSub: "sans optimisation — réductibles de 50 % avec les bons outils",
        solution: {
          nom: "Assurance-Vie",
          desc: "Exonération jusqu'à 152 500 € par bénéficiaire désigné, hors succession. Premier levier d'optimisation à activer.",
        },
      }
    }

    case 'impots': {
      const r = calcImpots(revenus, 30)
      return {
        titre: "Réduisez votre facture fiscale",
        kpiLabel: "Économie possible cette année",
        kpiValue: `${formatEuro(r.economiePer)}/an`,
        kpiSub: "en versant 10 % de vos revenus sur un PER",
        solution: {
          nom: "Plan d'Épargne Retraite (PER)",
          desc: "Réduction d'impôt immédiate proportionnelle à votre tranche. Double avantage : fiscalité réduite aujourd'hui + capital retraite demain.",
        },
      }
    }

    default:
      return { titre: '', kpiLabel: '', kpiValue: '', kpiSub: '', solution: { nom: '', desc: '' } }
  }
}
