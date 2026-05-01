import { useProfileStore } from '../../store/profileStore'
import { calcRetraite, formatEuro } from '../../utils/calculations'

export default function RetraiteCalc() {
  const { profile, setProfile } = useProfileStore()
  const r = calcRetraite(profile.age, profile.ageDepart, profile.revenus)

  return (
    <div className="bg-paper border border-line rounded-2xl p-7">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">🏖️</span>
        <div>
          <h3 className="font-serif text-xl text-ink">Retraite</h3>
          <p className="text-xs text-moss">Simulation du capital et de l'effort mensuel</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-2xs font-semibold uppercase tracking-widest text-moss block mb-2">
            Âge de départ visé — <span className="font-mono text-gold-deep">{profile.ageDepart} ans</span>
          </label>
          <input
            type="range"
            min={55}
            max={75}
            value={profile.ageDepart}
            onChange={(e) => setProfile({ ageDepart: +e.target.value })}
            className="w-full accent-forest"
          />
          <div className="flex justify-between text-xs text-moss mt-1"><span>55</span><span>75</span></div>
        </div>
        <div>
          <label className="text-2xs font-semibold uppercase tracking-widest text-moss block mb-2">
            Revenus actuels — <span className="font-mono text-gold-deep">{profile.revenus.toLocaleString('fr-FR')} €/mois</span>
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
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Revenus retraite estimés', value: formatEuro(r.revenusRetraite), sub: '= revenus ÷ 2' },
          { label: 'Gap mensuel à combler', value: formatEuro(r.gap), sub: 'manque à gagner' },
          { label: "Durée d'épargne", value: `${r.duree} ans`, sub: `jusqu'à ${profile.ageDepart} ans` },
          { label: 'Capital cible', value: formatEuro(r.capitalCible), sub: '25 ans de retraite' },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-ivory rounded-xl p-4">
            <p className="text-2xs text-moss mb-2">{label}</p>
            <p className="font-mono font-semibold text-ink">{value}</p>
            <p className="text-2xs text-moss mt-1">{sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-forest rounded-xl p-5 flex items-center justify-between">
        <div>
          <p className="text-2xs text-gold-light uppercase tracking-widest mb-1">Effort mensuel recommandé</p>
          <p className="font-serif text-3xl text-cream">
            {formatEuro(r.mensuel)}<span className="text-lg text-gold-light">/mois</span>
          </p>
        </div>
        <div className="text-right text-xs text-gold-light">
          <p>Pendant</p>
          <p className="font-mono font-semibold text-cream mt-1">{r.duree} ans</p>
        </div>
      </div>
    </div>
  )
}
