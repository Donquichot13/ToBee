import { useProfileStore } from '../store/profileStore'
import WizardProgress from '../components/matrix/WizardProgress'
import StepProfile from '../components/matrix/StepProfile'
import StepTimeline from '../components/matrix/StepTimeline'
import StepCalculators from '../components/matrix/StepCalculators'
import StepSolutions from '../components/matrix/StepSolutions'
import ChoixParcours from '../components/matrix/ChoixParcours'
import ParcoursSimple from '../components/matrix/ParcoursSimple'

export default function Matrix() {
  const { wizardStep, setWizardStep, parcours, setParcours } = useProfileStore()

  return (
    <main className="min-h-screen py-16 px-8 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* En-tête — masqué en mode sélection */}
        {!!parcours && (
          <div className="mb-12">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xs font-semibold tracking-widest uppercase text-gold-deep mb-1">
                  La Matrice Patrimoniale
                </p>
                <h1 className="font-serif text-ink tracking-tight" style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}>
                  Votre diagnostic personnalisé
                </h1>
              </div>
              <button
                onClick={() => setParcours(null)}
                className="text-xs text-moss hover:text-forest border border-line hover:border-forest rounded-xl px-4 py-2 transition-colors flex items-center gap-2"
              >
                ↺ Changer de parcours
              </button>
            </div>

            {/* Badge parcours actif */}
            <div className="mt-4">
              {parcours === 'simple' ? (
                <span className="inline-flex items-center gap-2 bg-forest/10 border border-forest/30 text-forest px-3 py-1.5 rounded-full text-xs font-semibold">
                  ⚡ Parcours Simple
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold-deep px-3 py-1.5 rounded-full text-xs font-semibold">
                  🎯 Parcours Expert
                </span>
              )}
            </div>
          </div>
        )}

        {/* SÉLECTION DU PARCOURS */}
        {!parcours && (
          <ChoixParcours onChoix={(p) => setParcours(p)} />
        )}

        {/* PARCOURS SIMPLE */}
        {parcours === 'simple' && (
          <ParcoursSimple
            onSwitchExpert={() => {
              setParcours('expert')
              setWizardStep(1)
            }}
          />
        )}

        {/* PARCOURS EXPERT */}
        {parcours === 'expert' && (
          <>
            <WizardProgress current={wizardStep} />

            {wizardStep === 1 && (
              <StepProfile onNext={() => setWizardStep(2)} />
            )}
            {wizardStep === 2 && (
              <StepTimeline onNext={() => setWizardStep(3)} onBack={() => setWizardStep(1)} />
            )}
            {wizardStep === 3 && (
              <StepCalculators onNext={() => setWizardStep(4)} onBack={() => setWizardStep(2)} />
            )}
            {wizardStep === 4 && (
              <StepSolutions onBack={() => setWizardStep(3)} />
            )}
          </>
        )}
      </div>
    </main>
  )
}
