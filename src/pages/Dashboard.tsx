import { useState } from 'react'
import { useProfileStore } from '../store/profileStore'
import { formatEuro } from '../utils/calculations'
import { useNavigate } from 'react-router-dom'

const alertes = [
  { icon: '🏥', message: 'Pensez à souscrire votre contrat dépendance avant 80 ans', urgence: 'info', minAge: 55 },
  { icon: '📜', message: 'Art. 757b : les versements AV après 70 ans sont soumis aux droits de succession', urgence: 'warning', minAge: 68 },
  { icon: '💰', message: 'Vérifiez votre plafond PER non utilisé pour optimiser votre TMI', urgence: 'info', minAge: 0 },
  { icon: '🎓', message: 'Votre enfant approche l\'âge des études — vérifiez votre épargne dédiée', urgence: 'info', minAge: 0 },
]

const objectifs = [
  { label: '🎓 Fonds études enfant', actuel: 18000, cible: 36000 },
  { label: '🏖️ Capital retraite', actuel: 45000, cible: 200000 },
  { label: '💼 Apport immobilier', actuel: 12000, cible: 40000 },
  { label: '🛡️ Fonds d\'urgence', actuel: 15000, cible: 20000 },
]

export default function Dashboard() {
  const { profile, setProfile } = useProfileStore()
  const navigate = useNavigate()

  const totalPatrimoine = Object.values(profile.patrimoine).reduce((a, b) => a + b, 0)

  const updatePatrimoine = (key: keyof typeof profile.patrimoine, value: number) => {
    setProfile({ patrimoine: { ...profile.patrimoine, [key]: value } })
  }

  const items = [
    { key: 'epargne' as const, label: 'Épargne de précaution', color: 'bg-gold', icon: '💰' },
    { key: 'immobilier' as const, label: 'Immobilier', color: 'bg-forest', icon: '🏠' },
    { key: 'valeursMob' as const, label: 'Valeurs mobilières', color: 'bg-moss', icon: '📈' },
    { key: 'retraite' as const, label: 'Épargne retraite (PER/AV)', color: 'bg-gold-deep', icon: '🏖️' },
  ]

  const activeAlertes = alertes.filter((a) => profile.age >= a.minAge)

  return (
    <main className="py-16 px-8 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-2xs font-semibold tracking-widest uppercase text-gold-deep mb-3">Espace personnel</p>
            <h1 className="font-serif text-ink tracking-tight" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
              Mon Patrimoine
            </h1>
          </div>
          <div className="text-right">
            <p className="text-2xs text-moss uppercase tracking-widest mb-1">Total estimé</p>
            <p className="font-serif text-4xl text-ink tracking-tight">{formatEuro(totalPatrimoine)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — Patrimoine overview */}
          <div className="lg:col-span-2 space-y-8">
            {/* Patrimoine cards */}
            <div className="bg-paper border border-line-soft rounded-3xl p-8">
              <h2 className="font-serif text-xl text-ink mb-6">Vue d'ensemble</h2>
              <div className="space-y-5">
                {items.map(({ key, label, color, icon }) => {
                  const val = profile.patrimoine[key]
                  const pct = totalPatrimoine > 0 ? Math.round((val / totalPatrimoine) * 100) : 0
                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-ink flex gap-2 items-center">
                          <span>{icon}</span>{label}
                        </span>
                        <div className="flex items-center gap-3">
                          <input
                            type="number"
                            value={val}
                            onChange={(e) => updatePatrimoine(key, Math.max(0, +e.target.value))}
                            className="w-28 text-right font-mono text-sm bg-transparent border-b border-line focus:border-forest outline-none text-ink"
                          />
                          <span className="text-xs text-moss w-8 text-right font-mono">{pct}%</span>
                        </div>
                      </div>
                      <div className="h-2 bg-cream-deep rounded-full overflow-hidden">
                        <div
                          className={`h-full ${color} rounded-full transition-all duration-500`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Objectifs */}
            <div className="bg-paper border border-line-soft rounded-3xl p-8">
              <h2 className="font-serif text-xl text-ink mb-6">Mes objectifs</h2>
              <div className="space-y-6">
                {objectifs.map(({ label, actuel, cible }) => {
                  const pct = Math.min(100, Math.round((actuel / cible) * 100))
                  return (
                    <div key={label}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-ink">{label}</span>
                        <span className="text-xs text-moss font-mono">
                          {formatEuro(actuel)} / {formatEuro(cible)}
                        </span>
                      </div>
                      <div className="h-2.5 bg-cream-deep rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${pct >= 100 ? 'bg-gold' : 'bg-forest'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <p className="text-2xs text-moss mt-1 text-right">{pct}% atteint</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right — Alerts + CTA */}
          <div className="space-y-6">
            {/* Alertes */}
            <div className="bg-paper border border-line-soft rounded-3xl p-6">
              <h2 className="font-serif text-lg text-ink mb-5">Alertes patrimoniales</h2>
              <div className="space-y-4">
                {activeAlertes.map((a, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl text-sm ${a.urgence === 'warning' ? 'bg-rust/10 border border-rust/20 text-rust' : 'bg-gold/10 border border-gold/20 text-gold-deep'}`}
                  >
                    <span className="block text-lg mb-1">{a.icon}</span>
                    {a.message}
                  </div>
                ))}
                {activeAlertes.length === 0 && (
                  <p className="text-sm text-moss">Aucune alerte pour le moment. ✓</p>
                )}
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-forest rounded-3xl p-6 space-y-3">
              <h2 className="font-serif text-lg text-cream mb-4">Actions rapides</h2>
              <button
                onClick={() => navigate('/matrice')}
                className="w-full bg-gold text-ink py-3 rounded-full text-sm font-semibold hover:bg-gold-light transition-colors"
              >
                Relancer le diagnostic
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="w-full border border-cream/30 text-cream py-3 rounded-full text-sm hover:bg-cream/10 transition-colors"
              >
                Prendre rendez-vous
              </button>
              <button
                onClick={() => navigate('/solutions')}
                className="w-full border border-cream/30 text-cream py-3 rounded-full text-sm hover:bg-cream/10 transition-colors"
              >
                Voir mes solutions
              </button>
            </div>

            {/* Profile summary */}
            <div className="bg-cream-deep border border-line rounded-3xl p-6 text-sm">
              <h3 className="font-serif text-base text-ink mb-4">Votre profil</h3>
              <dl className="space-y-2">
                {[
                  ['Âge', `${profile.age} ans`],
                  ['Situation', profile.situation],
                  ['Profession', profile.profession],
                  ['Revenus', `${profile.revenus.toLocaleString('fr-FR')} €/mois`],
                  ['TMI', `${profile.tmi}%`],
                  ['Enfants', `${profile.enfants.length}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <dt className="text-moss">{k}</dt>
                    <dd className="font-medium text-ink capitalize">{v}</dd>
                  </div>
                ))}
              </dl>
              <button onClick={() => navigate('/matrice')} className="text-xs text-forest mt-4 hover:text-forest-light underline underline-offset-2">
                Modifier mon profil →
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
