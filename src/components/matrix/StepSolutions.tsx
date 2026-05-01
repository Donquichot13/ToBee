import { useProfileStore } from '../../store/profileStore'
import { useNavigate } from 'react-router-dom'
import type { Pilier, SolutionId } from '../../types'
import Button from '../ui/Button'
import clsx from 'clsx'

type MatrixRow = {
  pilier: Pilier
  label: string
  icone: string
  solutions: Record<SolutionId, 'star' | 'check' | 'no'>
}

const matrix: MatrixRow[] = [
  {
    pilier: 'etudes',
    label: 'Études',
    icone: '🎓',
    solutions: { 'immobilier': 'check', 'scpi': 'check', 'assurance-vie': 'star', 'per': 'no', 'pea': 'no', 'gav': 'no', 'prevoyance': 'no' },
  },
  {
    pilier: 'retraite',
    label: 'Retraite',
    icone: '🏖️',
    solutions: { 'immobilier': 'check', 'scpi': 'star', 'assurance-vie': 'star', 'per': 'star', 'pea': 'check', 'gav': 'no', 'prevoyance': 'no' },
  },
  {
    pilier: 'projet',
    label: 'Projet',
    icone: '💼',
    solutions: { 'immobilier': 'star', 'scpi': 'check', 'assurance-vie': 'check', 'per': 'no', 'pea': 'no', 'gav': 'no', 'prevoyance': 'no' },
  },
  {
    pilier: 'dependance',
    label: 'Dépendance',
    icone: '🏥',
    solutions: { 'immobilier': 'check', 'scpi': 'check', 'assurance-vie': 'check', 'per': 'check', 'pea': 'no', 'gav': 'no', 'prevoyance': 'star' },
  },
  {
    pilier: 'succession',
    label: 'Succession',
    icone: '📜',
    solutions: { 'immobilier': 'check', 'scpi': 'no', 'assurance-vie': 'star', 'per': 'no', 'pea': 'no', 'gav': 'no', 'prevoyance': 'no' },
  },
  {
    pilier: 'impots',
    label: 'Impôts',
    icone: '💰',
    solutions: { 'immobilier': 'no', 'scpi': 'no', 'assurance-vie': 'no', 'per': 'star', 'pea': 'check', 'gav': 'no', 'prevoyance': 'no' },
  },
]

const cols: { id: SolutionId; label: string }[] = [
  { id: 'immobilier', label: 'Immobilier' },
  { id: 'scpi', label: 'SCPI' },
  { id: 'assurance-vie', label: 'Ass-Vie' },
  { id: 'per', label: 'PER' },
  { id: 'pea', label: 'PEA' },
  { id: 'prevoyance', label: 'Prévoyance' },
]

export default function StepSolutions({ onBack }: { onBack: () => void }) {
  const { profile } = useProfileStore()
  const navigate = useNavigate()
  const obj = profile.objectifs.length > 0 ? profile.objectifs : matrix.map((r) => r.pilier)
  const activeRows = matrix.filter((r) => obj.includes(r.pilier))

  return (
    <div className="max-w-4xl mx-auto animate-fade-up">
      <h2 className="font-serif text-3xl text-ink mb-2">Votre matrice de solutions</h2>
      <p className="text-sm text-moss mb-10">
        Les solutions <span className="text-gold-deep font-semibold">★ prioritaires</span> sont recommandées en premier selon votre profil.
      </p>

      <div className="overflow-x-auto rounded-3xl border border-line-soft">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="bg-paper border-b border-line-soft">
              <th className="text-left px-6 py-4 text-xs font-semibold tracking-widest uppercase text-moss">
                Objectif
              </th>
              {cols.map((c) => (
                <th key={c.id} className="px-4 py-4 text-xs font-semibold tracking-widest uppercase text-moss text-center">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activeRows.map((row, i) => (
              <tr key={row.pilier} className={clsx('border-b border-line-soft', i % 2 === 0 ? 'bg-ivory' : 'bg-paper')}>
                <td className="px-6 py-5 font-medium text-sm text-ink">
                  <span className="mr-2">{row.icone}</span>
                  {row.label}
                </td>
                {cols.map((c) => {
                  const val = row.solutions[c.id]
                  return (
                    <td key={c.id} className="px-4 py-5 text-center">
                      {val === 'star' && (
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gold/20 text-gold-deep font-bold text-sm">
                          ★
                        </span>
                      )}
                      {val === 'check' && (
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-forest/10 text-forest font-bold text-sm">
                          ✓
                        </span>
                      )}
                      {val === 'no' && (
                        <span className="text-line font-light text-sm">—</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-6 mt-6 text-xs text-moss">
        <span className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-gold/20 text-gold-deep flex items-center justify-center text-xs">★</span>
          Solution prioritaire
        </span>
        <span className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-forest/10 text-forest flex items-center justify-center text-xs">✓</span>
          Compatible
        </span>
      </div>

      <div className="mt-10 bg-forest rounded-3xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-2xs font-semibold tracking-widest uppercase text-gold-light mb-2">
            Prochaine étape
          </p>
          <h3 className="font-serif text-cream text-xl">
            Consultez les fiches détaillées ou prenez rendez-vous.
          </h3>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/solutions')}
            className="bg-gold text-ink px-6 py-3 rounded-full text-sm font-semibold hover:bg-gold-light transition-colors"
          >
            Voir les solutions
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="border border-cream/30 text-cream px-6 py-3 rounded-full text-sm hover:bg-cream/10 transition-colors"
          >
            Prendre RDV
          </button>
        </div>
      </div>

      <div className="mt-8 flex justify-start">
        <Button variant="ghost" onClick={onBack}>← Retour aux calculateurs</Button>
      </div>
    </div>
  )
}
