import { useState } from 'react'
import { useProfileStore } from '../../store/profileStore'
import { calcSuccession, formatEuro } from '../../utils/calculations'

export default function SuccessionCalc() {
  const { profile } = useProfileStore()
  const [patrimoine, setPatrimoine] = useState(300000)
  const nbEnfants = profile.enfants.length || 2
  const r = calcSuccession(patrimoine, nbEnfants)

  const art757b = profile.age >= 70

  return (
    <div className="bg-paper border border-line rounded-2xl p-7">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">📜</span>
        <div>
          <h3 className="font-serif text-xl text-ink">Succession</h3>
          <p className="text-xs text-moss">Simulation de la transmission patrimoniale</p>
        </div>
      </div>

      {art757b && (
        <div className="bg-rust/10 border border-rust/30 rounded-xl p-4 mb-6 text-sm text-rust">
          ⚠️ Art. 757b CGI : les versements d'assurance-vie après 70 ans sont soumis aux droits de succession au-delà de 30 500 €.
        </div>
      )}

      <div className="mb-6">
        <label className="text-2xs font-semibold uppercase tracking-widest text-moss block mb-2">
          Patrimoine transmis — <span className="font-mono text-gold-deep">{formatEuro(patrimoine)}</span>
        </label>
        <input type="range" min={50000} max={2000000} step={10000} value={patrimoine} onChange={e => setPatrimoine(+e.target.value)} className="w-full accent-forest" />
        <div className="flex justify-between text-xs text-moss mt-1"><span>50 000 €</span><span>2 000 000 €</span></div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-ivory rounded-xl p-4">
          <p className="text-2xs text-moss mb-1">Abattement total</p>
          <p className="font-mono font-semibold text-forest">{formatEuro(r.abattementTotal)}</p>
          <p className="text-2xs text-moss">{nbEnfants} enfant(s) × 100 000 €</p>
        </div>
        <div className="bg-ivory rounded-xl p-4">
          <p className="text-2xs text-moss mb-1">Base imposable</p>
          <p className="font-mono font-semibold text-ink">{formatEuro(r.baseImposable)}</p>
        </div>
        <div className="bg-ivory rounded-xl p-4">
          <p className="text-2xs text-moss mb-1">Droits estimés</p>
          <p className="font-mono font-semibold text-rust">{formatEuro(r.droitsEstimes)}</p>
          <p className="text-2xs text-moss">estimation indicative</p>
        </div>
      </div>

      <div className="bg-forest rounded-xl p-5">
        <p className="text-2xs text-gold-light uppercase tracking-widest mb-3">Optimisation possible</p>
        <ul className="space-y-2 text-sm text-cream/80">
          <li className="flex gap-2"><span className="text-gold">★</span> Assurance-Vie : exonération jusqu'à 152 500 € par bénéficiaire (avant 70 ans)</li>
          <li className="flex gap-2"><span className="text-gold">→</span> Donation de son vivant pour anticiper la transmission</li>
          <li className="flex gap-2"><span className="text-gold">→</span> Démembrement de propriété (usufruit / nue-propriété)</li>
        </ul>
      </div>
    </div>
  )
}
