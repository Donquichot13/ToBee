import { useProfileStore } from '../../store/profileStore'
import EtudesCalc from '../calculators/EtudesCalc'
import RetraiteCalc from '../calculators/RetraiteCalc'
import ProjetCalc from '../calculators/ProjetCalc'
import DependanceCalc from '../calculators/DependanceCalc'
import SuccessionCalc from '../calculators/SuccessionCalc'
import ImpotsCalc from '../calculators/ImpotsCalc'
import Button from '../ui/Button'

export default function StepCalculators({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { profile } = useProfileStore()
  const obj = profile.objectifs

  const all = obj.length === 0
  const show = (p: string) => all || obj.includes(p as never)

  return (
    <div className="max-w-3xl mx-auto animate-fade-up">
      <h2 className="font-serif text-3xl text-ink mb-2">Vos simulateurs</h2>
      <p className="text-sm text-moss mb-10">
        Chaque module calcule en temps réel selon votre profil.
        {obj.length > 0 && ` Affichage filtré sur vos ${obj.length} objectif(s) sélectionné(s).`}
      </p>

      <div className="space-y-6">
        {show('etudes') && profile.enfants.length > 0 && (
          <EtudesCalc />
        )}
        {show('etudes') && profile.enfants.length === 0 && (
          <div className="bg-cream-deep border border-line rounded-2xl p-6 text-sm text-moss text-center">
            Ajoutez un enfant à l'étape Profil pour activer le simulateur Études.
          </div>
        )}
        {show('retraite') && <RetraiteCalc />}
        {show('projet') && <ProjetCalc />}
        {show('dependance') && <DependanceCalc />}
        {show('succession') && <SuccessionCalc />}
        {show('impots') && <ImpotsCalc />}
      </div>

      <div className="mt-12 flex justify-between">
        <Button variant="ghost" onClick={onBack}>← Retour</Button>
        <Button onClick={onNext} size="lg">Voir mes solutions →</Button>
      </div>
    </div>
  )
}
