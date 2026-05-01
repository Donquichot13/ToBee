import { useProfileStore } from '../store/profileStore'
import WizardProgress from '../components/matrix/WizardProgress'
import StepProfile from '../components/matrix/StepProfile'
import StepTimeline from '../components/matrix/StepTimeline'
import StepCalculators from '../components/matrix/StepCalculators'
import StepSolutions from '../components/matrix/StepSolutions'

export default function Matrix() {
  const { wizardStep, setWizardStep } = useProfileStore()

  return (
    <main className="min-h-screen py-16 px-8 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-2xs font-semibold tracking-widest uppercase text-gold-deep mb-3">
            La Matrice Patrimoniale
          </p>
          <h1 className="font-serif text-ink tracking-tight" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
            Votre diagnostic personnalisé
          </h1>
        </div>

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
      </div>
    </main>
  )
}
