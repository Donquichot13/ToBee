import { useProfileStore } from '../../store/profileStore'
import type { Pilier } from '../../types'
import Button from '../ui/Button'
import clsx from 'clsx'

const milestones = [
  { age: 18, label: 'PEA / AV\nPrise de date', piliers: ['retraite', 'impots'] as Pilier[] },
  { age: 30, label: 'Projet\nApport', piliers: ['projet', 'retraite'] as Pilier[] },
  { age: 45, label: 'Immo / SCPI\nRevenus passifs', piliers: ['projet', 'retraite', 'dependance'] as Pilier[] },
  { age: 55, label: 'Retraite\nRevenus ÷ 2', piliers: ['retraite', 'dependance', 'succession'] as Pilier[] },
  { age: 65, label: 'Dépendance\nAnticipation', piliers: ['dependance', 'succession'] as Pilier[] },
  { age: 80, label: 'Succession\nTransmission', piliers: ['succession'] as Pilier[] },
  { age: 90, label: 'Optimisation\nhéritiers', piliers: ['succession'] as Pilier[] },
]

const objectifLabels: Record<Pilier, string> = {
  etudes: '🎓 Études',
  retraite: '🏖️ Retraite',
  projet: '💼 Projet',
  dependance: '🏥 Dépendance',
  succession: '📜 Succession',
  impots: '💰 Impôts',
}

export default function StepTimeline({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { profile, toggleObjectif } = useProfileStore()

  const currentZone = milestones.reduce((prev, m) => (profile.age >= m.age ? m : prev), milestones[0])
  const suggestedPiliers = Array.from(new Set(currentZone.piliers))
  if (profile.enfants.length > 0 && !suggestedPiliers.includes('etudes')) suggestedPiliers.unshift('etudes')

  return (
    <div className="max-w-3xl mx-auto animate-fade-up">
      <h2 className="font-serif text-3xl text-ink mb-2">Votre position sur la timeline</h2>
      <p className="text-sm text-moss mb-10">
        À <span className="font-mono font-semibold text-forest">{profile.age} ans</span>, voici votre zone patrimoniale et les objectifs recommandés.
      </p>

      {/* Timeline bar */}
      <div className="relative mb-16">
        <div className="absolute top-5 left-0 right-0 h-px bg-line-soft" />
        <div
          className="absolute top-4 left-0 h-0.5 bg-gradient-to-r from-gold to-forest transition-all duration-500"
          style={{ width: `${((profile.age - 18) / (90 - 18)) * 100}%` }}
        />
        <div className="grid grid-cols-7 gap-1 relative">
          {milestones.map((m) => {
            const active = profile.age >= m.age
            const current = profile.age >= m.age && (milestones.find(mx => mx.age > profile.age)?.age ?? 91) > m.age
            return (
              <div key={m.age} className="flex flex-col items-center text-center">
                <div className={clsx(
                  'w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-semibold z-10 transition-all duration-300',
                  current ? 'bg-forest text-cream scale-125 shadow-lg ring-4 ring-forest/20' :
                  active ? 'bg-gold text-ink' : 'bg-cream-deep text-moss border border-line'
                )}>
                  {m.age}
                </div>
                <p className="text-2xs text-forest-light mt-3 leading-tight whitespace-pre-line">{m.label}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Suggested objectives */}
      <div className="bg-paper border border-line-soft rounded-3xl p-8 mb-8">
        <p className="text-2xs font-semibold tracking-widest uppercase text-gold-deep mb-5">
          Objectifs recommandés à votre âge
        </p>
        <div className="flex flex-wrap gap-3 mb-6">
          {suggestedPiliers.map((p) => (
            <div key={p} className="flex items-center gap-2 bg-forest/10 text-forest px-4 py-2 rounded-full text-sm">
              <span>{objectifLabels[p]}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-moss">Sélectionnez vos objectifs personnels ci-dessous :</p>
      </div>

      {/* Objectif selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {(Object.keys(objectifLabels) as Pilier[]).map((p) => {
          const selected = profile.objectifs.includes(p)
          return (
            <button
              key={p}
              onClick={() => toggleObjectif(p)}
              className={clsx(
                'p-5 rounded-2xl border text-left transition-all duration-200',
                selected
                  ? 'bg-forest text-cream border-forest'
                  : 'bg-paper text-ink border-line hover:border-forest hover:bg-ivory'
              )}
            >
              <span className="text-xl block mb-2">
                {objectifLabels[p].split(' ')[0]}
              </span>
              <span className="text-sm font-medium">
                {objectifLabels[p].split(' ').slice(1).join(' ')}
              </span>
              {selected && <span className="block text-2xs mt-2 text-gold-light">✓ Sélectionné</span>}
            </button>
          )
        })}
      </div>

      <div className="mt-12 flex justify-between">
        <Button variant="ghost" onClick={onBack}>← Retour</Button>
        <Button onClick={onNext} size="lg">
          Calculateurs →
        </Button>
      </div>
    </div>
  )
}
