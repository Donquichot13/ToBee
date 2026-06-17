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

type Step = 1 | 2 | 3 | 4 | 5

interface SimpleData {
  age: number
  revenus: number
  objectif: Pilier | null
  // contextuel selon objectif
  ageDepart: number
  ageEnfant: number
  patrimoine: number
  tmi: number
}

const OBJECTIFS: { id: Pilier; icon: string; label: string; desc: string }[] = [
  { id: 'retraite', icon: '🏖️', label: 'Retraite', desc: "Préparer ma retraite et maintenir mon niveau de vie" },
  { id: 'etudes', icon: '🎓', label: "Études", desc: "Financer les études de mes enfants" },
  { id: 'projet', icon: '💼', label: 'Projet', desc: "Financer un projet immobilier ou personnel" },
  { id: 'dependance', icon: '🏥', label: "Dépendance", desc: "Anticiper la perte d'autonomie" },
  { id: 'succession', icon: '📜', label: 'Succession', desc: "Optimiser la transmission de mon patrimoine" },
  { id: 'impots', icon: '💰', label: 'Impôts', desc: "Réduire ma fiscalité et mes impôts" },
]

const TMI_OPTIONS = [0, 11, 30, 41, 45]

function hasContextualStep(objectif: Pilier | null): boolean {
  return objectif === 'retraite' || objectif === 'etudes' || objectif === 'succession' || objectif === 'impots'
}

function totalSteps(objectif: Pilier | null): number {
  return hasContextualStep(objectif) ? 4 : 3
}

export default function ParcoursSimple({ onSwitchExpert }: Props) {
  const [step, setStep] = useState<Step>(1)
  const [data, setData] = useState<SimpleData>({
    age: 35,
    revenus: 3000,
    objectif: null,
    ageDepart: 67,
    ageEnfant: 10,
    patrimoine: 300000,
    tmi: 30,
  })

  function next() {
    if (step === 3) {
      if (hasContextualStep(data.objectif)) {
        setStep(4)
      } else {
        setStep(5)
      }
    } else {
      setStep((s) => (s + 1) as Step)
    }
  }

  function back() {
    if (step === 5 && !hasContextualStep(data.objectif)) {
      setStep(3)
    } else {
      setStep((s) => (s - 1) as Step)
    }
  }

  const progressSteps = totalSteps(data.objectif)
  const currentProgress = step === 5 ? progressSteps : Math.min(step, progressSteps)

  return (
    <div className="max-w-2xl mx-auto animate-fade-up">
      {/* Barre de progression */}
      {step < 5 && (
        <div className="mb-10">
          <div className="flex gap-2">
            {Array.from({ length: progressSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  i < currentProgress ? 'bg-forest' : 'bg-line'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-moss mt-2">
            Question {currentProgress} sur {progressSteps}
          </p>
        </div>
      )}

      {/* ÉTAPE 1 — Âge */}
      {step === 1 && (
        <div>
          <div className="mb-10">
            <p className="text-2xs font-semibold tracking-widest uppercase text-gold-deep mb-3">
              Question 1 / {progressSteps}
            </p>
            <h2 className="font-serif text-4xl text-ink tracking-tight mb-4">
              Quel est votre âge ?
            </h2>
            <p className="text-base text-forest-light">
              Nous adapterons nos recommandations à votre étape de vie.
            </p>
          </div>

          <div className="bg-paper border border-line rounded-2xl p-8 mb-8">
            <div className="text-center mb-8">
              <span className="font-serif text-7xl text-forest font-bold">{data.age}</span>
              <span className="text-2xl text-moss ml-2">ans</span>
            </div>
            <input
              type="range"
              min={18}
              max={80}
              value={data.age}
              onChange={(e) => setData((d) => ({ ...d, age: +e.target.value }))}
              className="w-full accent-forest h-2"
            />
            <div className="flex justify-between text-xs text-moss mt-3">
              <span>18 ans</span>
              <span>80 ans</span>
            </div>
          </div>

          <button
            onClick={next}
            className="w-full bg-forest text-cream py-4 rounded-2xl font-semibold hover:bg-ink transition-colors flex items-center justify-center gap-3 text-base"
          >
            Continuer <span>→</span>
          </button>
        </div>
      )}

      {/* ÉTAPE 2 — Revenus */}
      {step === 2 && (
        <div>
          <div className="mb-10">
            <p className="text-2xs font-semibold tracking-widest uppercase text-gold-deep mb-3">
              Question 2 / {progressSteps}
            </p>
            <h2 className="font-serif text-4xl text-ink tracking-tight mb-4">
              Vos revenus mensuels nets ?
            </h2>
            <p className="text-base text-forest-light">
              Pour estimer votre capacité de placement mensuelle.
            </p>
          </div>

          <div className="bg-paper border border-line rounded-2xl p-8 mb-8">
            <div className="text-center mb-8">
              <span className="font-serif text-6xl text-forest font-bold">
                {data.revenus.toLocaleString('fr-FR')}
              </span>
              <span className="text-2xl text-moss ml-2">€/mois</span>
            </div>
            <input
              type="range"
              min={500}
              max={20000}
              step={100}
              value={data.revenus}
              onChange={(e) => setData((d) => ({ ...d, revenus: +e.target.value }))}
              className="w-full accent-forest h-2"
            />
            <div className="flex justify-between text-xs text-moss mt-3">
              <span>500 €</span>
              <span>20 000 €</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={back}
              className="flex-none px-6 py-4 rounded-2xl border border-line text-ink hover:bg-ivory transition-colors"
            >
              ←
            </button>
            <button
              onClick={next}
              className="flex-1 bg-forest text-cream py-4 rounded-2xl font-semibold hover:bg-ink transition-colors flex items-center justify-center gap-3 text-base"
            >
              Continuer <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 3 — Objectif */}
      {step === 3 && (
        <div>
          <div className="mb-10">
            <p className="text-2xs font-semibold tracking-widest uppercase text-gold-deep mb-3">
              Question 3 / {progressSteps}
            </p>
            <h2 className="font-serif text-4xl text-ink tracking-tight mb-4">
              Votre priorité du moment ?
            </h2>
            <p className="text-base text-forest-light">
              Choisissez le sujet qui vous préoccupe le plus.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {OBJECTIFS.map((o) => (
              <button
                key={o.id}
                onClick={() => setData((d) => ({ ...d, objectif: o.id }))}
                className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                  data.objectif === o.id
                    ? 'border-forest bg-forest/5 shadow-md'
                    : 'border-line bg-paper hover:border-forest/40 hover:bg-ivory'
                }`}
              >
                <span className="text-3xl block mb-2">{o.icon}</span>
                <p className={`font-serif text-lg mb-1 ${data.objectif === o.id ? 'text-forest' : 'text-ink'}`}>
                  {o.label}
                </p>
                <p className="text-xs text-moss leading-snug">{o.desc}</p>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={back}
              className="flex-none px-6 py-4 rounded-2xl border border-line text-ink hover:bg-ivory transition-colors"
            >
              ←
            </button>
            <button
              onClick={next}
              disabled={!data.objectif}
              className="flex-1 bg-forest text-cream py-4 rounded-2xl font-semibold hover:bg-ink transition-colors flex items-center justify-center gap-3 text-base disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continuer <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 4 — Question contextuelle */}
      {step === 4 && hasContextualStep(data.objectif) && (
        <div>
          <div className="mb-10">
            <p className="text-2xs font-semibold tracking-widest uppercase text-gold-deep mb-3">
              Question 4 / 4
            </p>

            {data.objectif === 'retraite' && (
              <>
                <h2 className="font-serif text-4xl text-ink tracking-tight mb-4">
                  À quel âge souhaitez-vous partir à la retraite ?
                </h2>
                <div className="bg-paper border border-line rounded-2xl p-8 mb-8">
                  <div className="text-center mb-8">
                    <span className="font-serif text-7xl text-forest font-bold">{data.ageDepart}</span>
                    <span className="text-2xl text-moss ml-2">ans</span>
                  </div>
                  <input
                    type="range"
                    min={55}
                    max={75}
                    value={data.ageDepart}
                    onChange={(e) => setData((d) => ({ ...d, ageDepart: +e.target.value }))}
                    className="w-full accent-forest h-2"
                  />
                  <div className="flex justify-between text-xs text-moss mt-3">
                    <span>55 ans</span>
                    <span>75 ans</span>
                  </div>
                </div>
              </>
            )}

            {data.objectif === 'etudes' && (
              <>
                <h2 className="font-serif text-4xl text-ink tracking-tight mb-4">
                  Quel est l'âge de votre enfant ?
                </h2>
                <div className="bg-paper border border-line rounded-2xl p-8 mb-8">
                  <div className="text-center mb-8">
                    <span className="font-serif text-7xl text-forest font-bold">{data.ageEnfant}</span>
                    <span className="text-2xl text-moss ml-2">ans</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={17}
                    value={data.ageEnfant}
                    onChange={(e) => setData((d) => ({ ...d, ageEnfant: +e.target.value }))}
                    className="w-full accent-forest h-2"
                  />
                  <div className="flex justify-between text-xs text-moss mt-3">
                    <span>0 an</span>
                    <span>17 ans</span>
                  </div>
                </div>
              </>
            )}

            {data.objectif === 'succession' && (
              <>
                <h2 className="font-serif text-4xl text-ink tracking-tight mb-4">
                  Estimez votre patrimoine global
                </h2>
                <div className="bg-paper border border-line rounded-2xl p-8 mb-8">
                  <div className="text-center mb-8">
                    <span className="font-serif text-5xl text-forest font-bold">
                      {data.patrimoine.toLocaleString('fr-FR')}
                    </span>
                    <span className="text-xl text-moss ml-2">€</span>
                  </div>
                  <input
                    type="range"
                    min={50000}
                    max={2000000}
                    step={10000}
                    value={data.patrimoine}
                    onChange={(e) => setData((d) => ({ ...d, patrimoine: +e.target.value }))}
                    className="w-full accent-forest h-2"
                  />
                  <div className="flex justify-between text-xs text-moss mt-3">
                    <span>50 000 €</span>
                    <span>2 000 000 €</span>
                  </div>
                </div>
              </>
            )}

            {data.objectif === 'impots' && (
              <>
                <h2 className="font-serif text-4xl text-ink tracking-tight mb-4">
                  Votre tranche marginale d'imposition ?
                </h2>
                <div className="grid grid-cols-5 gap-3 mb-8">
                  {TMI_OPTIONS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setData((d) => ({ ...d, tmi: t }))}
                      className={`py-5 rounded-2xl border-2 font-mono font-semibold text-lg transition-all ${
                        data.tmi === t
                          ? 'border-forest bg-forest text-cream'
                          : 'border-line bg-paper text-ink hover:border-forest/40'
                      }`}
                    >
                      {t}%
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={back}
              className="flex-none px-6 py-4 rounded-2xl border border-line text-ink hover:bg-ivory transition-colors"
            >
              ←
            </button>
            <button
              onClick={next}
              className="flex-1 bg-forest text-cream py-4 rounded-2xl font-semibold hover:bg-ink transition-colors flex items-center justify-center gap-3 text-base"
            >
              Voir mes résultats <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 5 — Résultats */}
      {step === 5 && <Results data={data} onBack={back} onSwitchExpert={onSwitchExpert} />}
    </div>
  )
}

function Results({
  data,
  onBack,
  onSwitchExpert,
}: {
  data: SimpleData
  onBack: () => void
  onSwitchExpert: () => void
}) {
  const info = OBJECTIFS.find((o) => o.id === data.objectif)!

  const content = buildResults(data)

  return (
    <div className="animate-fade-up">
      {/* En-tête résultats */}
      <div className="text-center mb-10">
        <span className="text-5xl block mb-4">{info.icon}</span>
        <p className="text-2xs font-semibold tracking-widest uppercase text-gold-deep mb-2">
          Vos résultats — {info.label}
        </p>
        <h2 className="font-serif text-4xl text-ink tracking-tight mb-3">
          Votre diagnostic personnalisé
        </h2>
        <p className="text-sm text-moss">
          Basé sur vos réponses : {data.age} ans · {data.revenus.toLocaleString('fr-FR')} €/mois
        </p>
      </div>

      {/* Métrique principale */}
      <div className="bg-forest rounded-3xl p-8 mb-6 text-center">
        <p className="text-xs text-gold-light uppercase tracking-widest mb-3">{content.kpiLabel}</p>
        <p className="font-serif text-5xl text-cream mb-2">{content.kpiValue}</p>
        {content.kpiSub && (
          <p className="text-sm text-gold-light">{content.kpiSub}</p>
        )}
      </div>

      {/* Insights */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {content.insights.map((insight, i) => (
          <div key={i} className="bg-paper border border-line rounded-2xl p-5">
            <p className="text-xs text-moss mb-2">{insight.label}</p>
            <p className="font-mono font-semibold text-ink text-lg">{insight.value}</p>
          </div>
        ))}
      </div>

      {/* Solutions recommandées */}
      <div className="bg-paper border border-line rounded-2xl p-6 mb-8">
        <p className="text-2xs font-semibold tracking-widest uppercase text-gold-deep mb-5">
          Solutions recommandées
        </p>
        <div className="space-y-4">
          {content.solutions.map((sol, i) => (
            <div key={i} className="flex items-start gap-4">
              <span className={`mt-0.5 text-lg ${i === 0 ? 'text-gold' : 'text-moss'}`}>
                {i === 0 ? '★' : '→'}
              </span>
              <div>
                <p className={`font-semibold mb-1 ${i === 0 ? 'text-forest' : 'text-ink'}`}>
                  {sol.nom}
                </p>
                <p className="text-xs text-moss leading-relaxed">{sol.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Avertissement */}
      <div className="bg-gold/10 border border-gold/30 rounded-2xl p-4 mb-8 text-xs text-gold-deep text-center">
        Ces chiffres sont des estimations indicatives. Consultez un conseiller pour un diagnostic complet.
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          onClick={onSwitchExpert}
          className="w-full bg-forest text-cream py-4 rounded-2xl font-semibold hover:bg-ink transition-colors flex items-center justify-center gap-3 text-base"
        >
          Aller plus loin avec le Parcours Expert <span>→</span>
        </button>
        <button
          onClick={onBack}
          className="w-full py-3 rounded-2xl border border-line text-ink hover:bg-ivory transition-colors text-sm"
        >
          ← Modifier mes réponses
        </button>
      </div>
    </div>
  )
}

interface ResultContent {
  kpiLabel: string
  kpiValue: string
  kpiSub: string
  insights: { label: string; value: string }[]
  solutions: { nom: string; desc: string }[]
}

function buildResults(data: SimpleData): ResultContent {
  switch (data.objectif) {
    case 'retraite': {
      const r = calcRetraite(data.age, data.ageDepart, data.revenus)
      return {
        kpiLabel: "Effort mensuel recommandé",
        kpiValue: `${formatEuro(r.mensuel)}/mois`,
        kpiSub: `pendant ${r.duree} ans pour atteindre votre objectif`,
        insights: [
          { label: "Capital à constituer", value: formatEuro(r.capitalCible) },
          { label: "Retraite estimée", value: `${formatEuro(r.revenusRetraite)}/mois` },
          { label: "Gap mensuel à combler", value: formatEuro(r.gap) },
          { label: "Durée d'épargne", value: `${r.duree} ans` },
        ],
        solutions: [
          { nom: "PER — Plan d'Épargne Retraite", desc: "Déduction fiscale immédiate sur versements + sortie en capital ou rente à la retraite." },
          { nom: "Assurance-Vie", desc: "Fiscalité avantageuse après 8 ans, grande souplesse et transmission optimisée." },
          { nom: "PEA — Plan d'Épargne en Actions", desc: "Exonération d'impôt sur les plus-values après 5 ans pour dynamiser l'épargne." },
        ],
      }
    }

    case 'etudes': {
      const r = calcEtudes(data.ageEnfant, 50000, 5000)
      return {
        kpiLabel: "Épargne mensuelle recommandée",
        kpiValue: `${formatEuro(r.mensuel)}/mois`,
        kpiSub: `pendant ${r.annees} an${r.annees > 1 ? 's' : ''} pour constituer 50 000 €`,
        insights: [
          { label: "Budget études estimé", value: formatEuro(50000) },
          { label: "Durée d'épargne", value: `${r.annees} an${r.annees > 1 ? 's' : ''}` },
          { label: "Effort total", value: formatEuro(r.restant) },
          { label: "Âge de l'enfant", value: `${data.ageEnfant} ans` },
        ],
        solutions: [
          { nom: "Assurance-Vie", desc: "Enveloppe souple et fiscalement avantageuse, transmissible à l'enfant à sa majorité." },
          { nom: "PEA Junior / PEA", desc: "Exonération fiscale après 5 ans pour une épargne long terme dynamique." },
          { nom: "Livret A / LDDS", desc: "Sécurité et liquidité pour la partie à court terme, sans risque de perte." },
        ],
      }
    }

    case 'projet': {
      const epargneRecommandee = Math.round(data.revenus * 0.1)
      return {
        kpiLabel: "Capacité d'épargne mensuelle estimée",
        kpiValue: `${formatEuro(epargneRecommandee)}/mois`,
        kpiSub: "soit environ 10 % de vos revenus nets",
        insights: [
          { label: "En 1 an", value: formatEuro(epargneRecommandee * 12) },
          { label: "En 3 ans", value: formatEuro(epargneRecommandee * 36) },
          { label: "En 5 ans", value: formatEuro(epargneRecommandee * 60) },
          { label: "Votre âge", value: `${data.age} ans` },
        ],
        solutions: [
          { nom: "PEL — Plan d'Épargne Logement", desc: "Idéal pour un projet immobilier. Taux garanti et accès à un prêt à taux préférentiel." },
          { nom: "PEA — Plan d'Épargne en Actions", desc: "Pour les projets à +5 ans avec un rendement potentiel élevé et sans fiscalité à la sortie." },
          { nom: "Assurance-Vie", desc: "Souplesse maximale, accessible à tout moment et fiscalement efficace après 8 ans." },
        ],
      }
    }

    case 'dependance': {
      const r = calcDependance(data.age)
      const urgence = r.urgence
      return {
        kpiLabel: "Coût moyen de la dépendance",
        kpiValue: `${formatEuro(r.coutMoyen)}/an`,
        kpiSub: `Fourchette : ${formatEuro(r.coutMin)} à ${formatEuro(r.coutMax)}/an`,
        insights: [
          { label: "Urgence de souscription", value: urgence === 'haute' ? "Élevée" : urgence === 'moyenne' ? "Moyenne" : "Faible" },
          { label: "Délai avant 80 ans", value: `${r.anneesAvant80} ans` },
          { label: "Coût minimum", value: `${formatEuro(r.coutMin)}/an` },
          { label: "Coût maximum", value: `${formatEuro(r.coutMax)}/an` },
        ],
        solutions: [
          { nom: "Contrat Dépendance", desc: "Rente mensuelle versée en cas de perte d'autonomie. À souscrire avant 80 ans impérativement." },
          { nom: "Assurance-Vie", desc: "Capital de précaution accessible pour financer les frais de dépendance imprévus." },
          { nom: "SCPI", desc: "Revenus passifs réguliers pour compléter une rente en cas de perte d'autonomie." },
        ],
      }
    }

    case 'succession': {
      const r = calcSuccession(data.patrimoine, 2)
      const economiePossible = Math.round(r.droitsEstimes * 0.5)
      return {
        kpiLabel: "Droits de succession estimés",
        kpiValue: formatEuro(r.droitsEstimes),
        kpiSub: `Économie possible avec optimisation : ${formatEuro(economiePossible)}`,
        insights: [
          { label: "Patrimoine total", value: formatEuro(data.patrimoine) },
          { label: "Abattement (2 enfants)", value: formatEuro(r.abattementTotal) },
          { label: "Base imposable", value: formatEuro(r.baseImposable) },
          { label: "Économie estimée", value: formatEuro(economiePossible) },
        ],
        solutions: [
          { nom: "Assurance-Vie", desc: "Exonération jusqu'à 152 500 € par bénéficiaire désigné hors succession (avant 70 ans)." },
          { nom: "Donation de son vivant", desc: "Anticiper la transmission pour purger les plus-values et réduire les droits futurs." },
          { nom: "Démembrement de propriété", desc: "Transmettre la nue-propriété et conserver l'usufruit pour réduire la base taxable." },
        ],
      }
    }

    case 'impots': {
      const r = calcImpots(data.revenus, data.tmi)
      return {
        kpiLabel: "Économie d'impôt possible via PER",
        kpiValue: `${formatEuro(r.economiePer)}/an`,
        kpiSub: `avec une TMI de ${data.tmi}% et un versement de 10 % de vos revenus`,
        insights: [
          { label: "IRPP estimé", value: formatEuro(r.irppEstime) },
          { label: "Plafond niches fiscales", value: formatEuro(r.plafondNiches) },
          { label: "Économie PER", value: `${formatEuro(r.economiePer)}/an` },
          { label: "Votre TMI", value: `${data.tmi}%` },
        ],
        solutions: [
          { nom: "PER — Plan d'Épargne Retraite", desc: `Déduction immédiate sur vos revenus. Vous économisez ${formatEuro(r.economiePer)} cette année.` },
          { nom: "Loi Pinel / Denormandie", desc: "Réduction d'impôt de 12 à 21 % sur investissements locatifs dans le neuf." },
          { nom: "FCPI / FIP", desc: "Réduction d'impôt de 18 à 25 % en finançant des PME innovantes." },
        ],
      }
    }

    default:
      return {
        kpiLabel: '',
        kpiValue: '',
        kpiSub: '',
        insights: [],
        solutions: [],
      }
  }
}
