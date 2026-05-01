import { useProfileStore } from '../../store/profileStore'
import { calcImpots, formatEuro } from '../../utils/calculations'

export default function ImpotsCalc() {
  const { profile, setProfile } = useProfileStore()
  const r = calcImpots(profile.revenus, profile.tmi)

  return (
    <div className="bg-paper border border-line rounded-2xl p-7">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">💰</span>
        <div>
          <h3 className="font-serif text-xl text-ink">Optimisation fiscale</h3>
          <p className="text-xs text-moss">PER, niches fiscales et défiscalisation</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-2xs font-semibold uppercase tracking-widest text-moss block mb-2">
            Revenus mensuels — <span className="font-mono text-gold-deep">{profile.revenus.toLocaleString('fr-FR')} €</span>
          </label>
          <input type="range" min={500} max={20000} step={100} value={profile.revenus} onChange={e => setProfile({ revenus: +e.target.value })} className="w-full accent-forest" />
          <div className="flex justify-between text-xs text-moss mt-1"><span>500 €</span><span>20 000 €</span></div>
        </div>
        <div>
          <label className="text-2xs font-semibold uppercase tracking-widest text-moss block mb-2">
            TMI — <span className="font-mono text-gold-deep">{profile.tmi}%</span>
          </label>
          <div className="flex gap-2 mt-1 flex-wrap">
            {[0, 11, 30, 41, 45].map(t => (
              <button key={t} onClick={() => setProfile({ tmi: t })}
                className={`px-3 py-1.5 rounded-full text-xs font-mono border transition-all ${profile.tmi === t ? 'bg-forest text-cream border-forest' : 'border-line text-ink hover:border-forest'}`}>
                {t}%
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-ivory rounded-xl p-4">
          <p className="text-2xs text-moss mb-1">IRPP estimé</p>
          <p className="font-mono font-semibold text-rust">{formatEuro(r.irppEstime)}<span className="text-xs text-moss">/an</span></p>
        </div>
        <div className="bg-ivory rounded-xl p-4">
          <p className="text-2xs text-moss mb-1">Plafond niches fiscales</p>
          <p className="font-mono font-semibold text-ink">{formatEuro(r.plafondNiches)}<span className="text-xs text-moss">/an</span></p>
        </div>
        <div className="bg-ivory rounded-xl p-4">
          <p className="text-2xs text-moss mb-1">Économie PER estimée</p>
          <p className="font-mono font-semibold text-forest">{formatEuro(r.economiePer)}<span className="text-xs text-moss">/an</span></p>
        </div>
      </div>

      <div className="bg-forest rounded-xl p-5">
        <p className="text-2xs text-gold-light uppercase tracking-widest mb-3">Solutions recommandées</p>
        <ul className="space-y-2 text-sm text-cream/80">
          <li className="flex gap-2"><span className="text-gold">★</span> PER (Plan Épargne Retraite) : déduction fiscale à l'entrée</li>
          <li className="flex gap-2"><span className="text-gold">★</span> PEA : exonération d'impôt après 5 ans</li>
          {profile.tmi >= 30 && (
            <li className="flex gap-2"><span className="text-gold">→</span> Immobilier défiscalisant selon votre situation</li>
          )}
          {profile.tmi >= 41 && (
            <li className="flex gap-2"><span className="text-gold">→</span> IFI : pensez à l'optimisation de votre patrimoine immobilier</li>
          )}
        </ul>
      </div>
    </div>
  )
}
