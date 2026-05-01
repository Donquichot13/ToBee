import { useProfileStore } from '../../store/profileStore'
import { calcEtudes, formatEuro } from '../../utils/calculations'

export default function EtudesCalc() {
  const { profile } = useProfileStore()

  return (
    <div className="bg-paper border border-line rounded-2xl p-7">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">🎓</span>
        <div>
          <h3 className="font-serif text-xl text-ink">Études enfants</h3>
          <p className="text-xs text-moss">Calcul de l'effort mensuel pour financer les études</p>
        </div>
      </div>

      <div className="space-y-6">
        {profile.enfants.map((enfant, i) => {
          const result = calcEtudes(enfant.age, enfant.budgetEtudes, enfant.apportDisponible)
          return (
            <div key={enfant.id} className="bg-ivory rounded-xl p-5">
              <p className="text-xs font-semibold tracking-widest uppercase text-moss mb-4">
                Enfant {i + 1} — {enfant.age} an{enfant.age > 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-3 gap-4 text-sm mb-5">
                <div>
                  <p className="text-2xs text-moss mb-1">Budget visé</p>
                  <p className="font-mono font-semibold text-ink">{formatEuro(enfant.budgetEtudes)}</p>
                </div>
                <div>
                  <p className="text-2xs text-moss mb-1">Apport disponible</p>
                  <p className="font-mono font-semibold text-ink">{formatEuro(enfant.apportDisponible)}</p>
                </div>
                <div>
                  <p className="text-2xs text-moss mb-1">Durée</p>
                  <p className="font-mono font-semibold text-ink">{result.annees} ans</p>
                </div>
              </div>

              <div className="bg-forest rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-2xs text-gold-light uppercase tracking-widest mb-1">Effort mensuel recommandé</p>
                  <p className="font-serif text-3xl text-cream">
                    {formatEuro(result.mensuel)}
                    <span className="text-lg text-gold-light">/mois</span>
                  </p>
                </div>
                <div className="text-right text-xs text-gold-light">
                  <p>Restant à financer</p>
                  <p className="font-mono font-semibold text-cream mt-1">{formatEuro(result.restant)}</p>
                </div>
              </div>

              <p className="text-xs text-moss mt-3">
                Formule : ({formatEuro(enfant.budgetEtudes)} − {formatEuro(enfant.apportDisponible)}) ÷ {result.annees} ans ÷ 12 mois
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
