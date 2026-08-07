import { useProfileStore } from '../../store/profileStore'
import type { Situation, Profession } from '../../types'
import Button from '../ui/Button'

const situations: { v: Situation; l: string }[] = [
  { v: 'celibataire', l: 'Célibataire' },
  { v: 'marie', l: 'Marié(e)' },
  { v: 'pacse', l: 'Pacsé(e)' },
  { v: 'divorce', l: 'Divorcé(e)' },
  { v: 'veuf', l: 'Veuf/Veuve' },
]

const professions: { v: Profession; l: string }[] = [
  { v: 'salarie', l: 'Salarié(e)' },
  { v: 'fonctionnaire', l: 'Fonctionnaire' },
  { v: 'independant', l: 'Indépendant(e)' },
  { v: 'retraite', l: 'Retraité(e)' },
  { v: 'autre', l: 'Autre' },
]

export default function StepProfile({ onNext }: { onNext: () => void }) {
  const { profile, setProfile } = useProfileStore()

  const addEnfant = () =>
    setProfile({
      enfants: [
        ...profile.enfants,
        { id: Date.now().toString(), age: 5, budgetEtudes: 30000, apportDisponible: 5000 },
      ],
    })

  const removeEnfant = (id: string) =>
    setProfile({ enfants: profile.enfants.filter((e) => e.id !== id) })

  const updateEnfant = (id: string, key: string, value: number) =>
    setProfile({
      enfants: profile.enfants.map((e) => (e.id === id ? { ...e, [key]: value } : e)),
    })

  return (
    <div className="max-w-2xl mx-auto animate-fade-up">
      <h2 className="font-serif text-3xl text-ink mb-2">Votre profil</h2>
      <p className="text-sm text-moss mb-10">Ces informations personnalisent votre diagnostic patrimonial.</p>

      <div className="space-y-8">
        {/* Âge */}
        <div>
          <label className="text-xs font-semibold tracking-widest uppercase text-moss block mb-3">
            Âge — <span className="font-mono text-gold-deep">{profile.age} ans</span>
          </label>
          <input
            type="range"
            min={18}
            max={90}
            value={profile.age}
            onChange={(e) => setProfile({ age: +e.target.value })}
            className="w-full accent-forest"
          />
          <div className="flex justify-between text-xs text-moss mt-1">
            <span>18</span>
            <span>90</span>
          </div>
        </div>

        {/* Situation familiale */}
        <div>
          <label className="text-xs font-semibold tracking-widest uppercase text-moss block mb-3">
            Situation familiale
          </label>
          <div className="flex flex-wrap gap-2">
            {situations.map(({ v, l }) => (
              <button
                key={v}
                onClick={() => setProfile({ situation: v })}
                className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 ${
                  profile.situation === v
                    ? 'bg-forest text-cream border-forest'
                    : 'bg-paper text-ink border-line hover:border-forest'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Profession */}
        <div>
          <label className="text-xs font-semibold tracking-widest uppercase text-moss block mb-3">
            Situation professionnelle
          </label>
          <div className="flex flex-wrap gap-2">
            {professions.map(({ v, l }) => (
              <button
                key={v}
                onClick={() => setProfile({ profession: v })}
                className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 ${
                  profile.profession === v
                    ? 'bg-forest text-cream border-forest'
                    : 'bg-paper text-ink border-line hover:border-forest'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Revenus */}
        {(profile.situation === 'marie' || profile.situation === 'pacse') ? (
          <div className="space-y-5">
            <p className="text-xs font-semibold tracking-widest uppercase text-moss">
              Revenus mensuels nets — <span className="text-gold-deep font-mono">
                {(profile.revenus + profile.revenusConjoint).toLocaleString('fr-FR')} € total
              </span>
            </p>
            <div className="bg-paper border border-line rounded-2xl p-5">
              <label className="text-xs text-moss block mb-2">
                Conjoint 1 — <span className="font-mono text-ink">{profile.revenus.toLocaleString('fr-FR')} €/mois</span>
              </label>
              <input
                type="range"
                min={500}
                max={20000}
                step={100}
                value={profile.revenus}
                onChange={(e) => setProfile({ revenus: +e.target.value })}
                className="w-full accent-forest"
              />
              <div className="flex justify-between text-xs text-moss mt-1"><span>500 €</span><span>20 000 €</span></div>
            </div>
            <div className="bg-paper border border-line rounded-2xl p-5">
              <label className="text-xs text-moss block mb-2">
                Conjoint 2 — <span className="font-mono text-ink">{profile.revenusConjoint.toLocaleString('fr-FR')} €/mois</span>
              </label>
              <input
                type="range"
                min={0}
                max={20000}
                step={100}
                value={profile.revenusConjoint}
                onChange={(e) => setProfile({ revenusConjoint: +e.target.value })}
                className="w-full accent-forest"
              />
              <div className="flex justify-between text-xs text-moss mt-1"><span>0 €</span><span>20 000 €</span></div>
            </div>
          </div>
        ) : (
          <div>
            <label className="text-xs font-semibold tracking-widest uppercase text-moss block mb-3">
              Revenus mensuels nets — <span className="font-mono text-gold-deep">{profile.revenus.toLocaleString('fr-FR')} €</span>
            </label>
            <input
              type="range"
              min={500}
              max={20000}
              step={100}
              value={profile.revenus}
              onChange={(e) => setProfile({ revenus: +e.target.value })}
              className="w-full accent-forest"
            />
            <div className="flex justify-between text-xs text-moss mt-1">
              <span>500 €</span>
              <span>20 000 €</span>
            </div>
          </div>
        )}

        {/* TMI */}
        <div>
          <label className="text-xs font-semibold tracking-widest uppercase text-moss block mb-3">
            Tranche marginale d'imposition — <span className="font-mono text-gold-deep">{profile.tmi}%</span>
          </label>
          <div className="flex gap-2">
            {[0, 11, 30, 41, 45].map((t) => (
              <button
                key={t}
                onClick={() => setProfile({ tmi: t })}
                className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 font-mono ${
                  profile.tmi === t
                    ? 'bg-forest text-cream border-forest'
                    : 'bg-paper text-ink border-line hover:border-forest'
                }`}
              >
                {t}%
              </button>
            ))}
          </div>
        </div>

        {/* Enfants */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold tracking-widest uppercase text-moss">
              Enfants ({profile.enfants.length})
            </label>
            <button
              onClick={addEnfant}
              className="text-xs text-forest border border-forest px-3 py-1 rounded-full hover:bg-forest hover:text-cream transition-all"
            >
              + Ajouter
            </button>
          </div>
          <div className="space-y-4">
            {profile.enfants.map((e) => (
              <div key={e.id} className="bg-paper border border-line rounded-2xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-ink">Enfant</span>
                  <button onClick={() => removeEnfant(e.id)} className="text-xs text-moss hover:text-rust">
                    Supprimer
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs text-moss">
                  <div>
                    <p className="mb-1">Âge : <span className="font-mono text-ink">{e.age} ans</span></p>
                    <input type="range" min={0} max={17} value={e.age} onChange={(ev) => updateEnfant(e.id, 'age', +ev.target.value)} className="w-full accent-forest" />
                  </div>
                  <div>
                    <p className="mb-1">Budget études : <span className="font-mono text-ink">{e.budgetEtudes.toLocaleString('fr-FR')} €</span></p>
                    <input type="range" min={5000} max={100000} step={1000} value={e.budgetEtudes} onChange={(ev) => updateEnfant(e.id, 'budgetEtudes', +ev.target.value)} className="w-full accent-forest" />
                  </div>
                  <div>
                    <p className="mb-1">Apport : <span className="font-mono text-ink">{e.apportDisponible.toLocaleString('fr-FR')} €</span></p>
                    <input type="range" min={0} max={30000} step={500} value={e.apportDisponible} onChange={(ev) => updateEnfant(e.id, 'apportDisponible', +ev.target.value)} className="w-full accent-forest" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-end">
        <Button onClick={onNext} size="lg">
          Continuer — Timeline patrimoniale →
        </Button>
      </div>
    </div>
  )
}
