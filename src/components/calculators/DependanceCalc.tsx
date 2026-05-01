import { useProfileStore } from '../../store/profileStore'
import { calcDependance, formatEuro } from '../../utils/calculations'

export default function DependanceCalc() {
  const { profile } = useProfileStore()
  const r = calcDependance(profile.age)

  const urgenceColor = r.urgence === 'haute' ? 'text-rust bg-rust/10' : r.urgence === 'moyenne' ? 'text-gold-deep bg-gold/10' : 'text-moss bg-cream-deep'

  return (
    <div className="bg-paper border border-line rounded-2xl p-7">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏥</span>
          <div>
            <h3 className="font-serif text-xl text-ink">Dépendance</h3>
            <p className="text-xs text-moss">Anticipation de la perte d'autonomie</p>
          </div>
        </div>
        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${urgenceColor}`}>
          Urgence {r.urgence}
        </span>
      </div>

      {profile.age < 55 && (
        <div className="bg-gold/10 border border-gold/30 rounded-xl p-4 mb-6 text-sm text-gold-deep">
          ℹ️ Ce module s'active automatiquement dès 55 ans. Vous avez {r.anneesAvant80} ans pour anticiper avant la limite de souscription.
        </div>
      )}

      {profile.age >= 55 && (
        <div className="bg-rust/10 border border-rust/30 rounded-xl p-4 mb-6 text-sm text-rust">
          ⚠️ Souscription recommandée avant 80 ans. Il vous reste {Math.max(0, 80 - profile.age)} ans.
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-ivory rounded-xl p-4">
          <p className="text-2xs text-moss mb-1">Coût minimum</p>
          <p className="font-mono font-semibold text-ink">{formatEuro(r.coutMin)}<span className="text-xs text-moss">/an</span></p>
        </div>
        <div className="bg-ivory rounded-xl p-4">
          <p className="text-2xs text-moss mb-1">Coût moyen</p>
          <p className="font-mono font-semibold text-gold-deep">{formatEuro(r.coutMoyen)}<span className="text-xs text-moss">/an</span></p>
        </div>
        <div className="bg-ivory rounded-xl p-4">
          <p className="text-2xs text-moss mb-1">Coût maximum</p>
          <p className="font-mono font-semibold text-ink">{formatEuro(r.coutMax)}<span className="text-xs text-moss">/an</span></p>
        </div>
      </div>

      <div className="bg-forest rounded-xl p-5">
        <p className="text-2xs text-gold-light uppercase tracking-widest mb-3">Recommandation</p>
        <ul className="space-y-2 text-sm text-cream/80">
          <li className="flex gap-2"><span className="text-gold">→</span> Contrat dépendance avec rente mensuelle</li>
          <li className="flex gap-2"><span className="text-gold">→</span> Assurance-Vie comme capital de précaution</li>
          <li className="flex gap-2"><span className="text-gold">→</span> SCPI pour revenus passifs complémentaires</li>
        </ul>
      </div>
    </div>
  )
}
