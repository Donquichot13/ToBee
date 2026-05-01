import clsx from 'clsx'

const steps = [
  { n: 1, label: 'Profil' },
  { n: 2, label: 'Timeline' },
  { n: 3, label: 'Calculateurs' },
  { n: 4, label: 'Solutions' },
]

export default function WizardProgress({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-12">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={clsx(
                'w-10 h-10 rounded-full flex items-center justify-center font-serif text-sm font-medium transition-all duration-300',
                current === s.n
                  ? 'bg-forest text-cream scale-110 shadow-lg'
                  : current > s.n
                  ? 'bg-gold text-ink'
                  : 'bg-cream-deep text-moss border border-line'
              )}
            >
              {current > s.n ? '✓' : s.n}
            </div>
            <span
              className={clsx(
                'text-2xs mt-2 tracking-wide font-medium',
                current === s.n ? 'text-forest' : 'text-moss'
              )}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={clsx(
                'w-24 h-px mx-3 mb-5 transition-colors duration-300',
                current > s.n ? 'bg-gold' : 'bg-line-soft'
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}
