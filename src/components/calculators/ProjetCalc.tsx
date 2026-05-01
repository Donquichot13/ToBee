import { useState } from 'react'
import { formatEuro } from '../../utils/calculations'

export default function ProjetCalc() {
  const [coutProjet, setCoutProjet] = useState(150000)
  const [apport, setApport] = useState(20000)
  const [duree, setDuree] = useState(20)
  const taux = 0.035

  const emprunt = Math.max(0, coutProjet - apport)
  const mensuel = emprunt > 0
    ? Math.round((emprunt * (taux / 12)) / (1 - Math.pow(1 + taux / 12, -duree * 12)))
    : 0
  const coutTotal = mensuel * duree * 12
  const interets = coutTotal - emprunt

  return (
    <div className="bg-paper border border-line rounded-2xl p-7">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">💼</span>
        <div>
          <h3 className="font-serif text-xl text-ink">Projet immobilier / personnel</h3>
          <p className="text-xs text-moss">Simulation de financement</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="text-2xs font-semibold uppercase tracking-widest text-moss block mb-2">
            Coût du projet — <span className="font-mono text-gold-deep">{formatEuro(coutProjet)}</span>
          </label>
          <input type="range" min={10000} max={1000000} step={5000} value={coutProjet} onChange={e => setCoutProjet(+e.target.value)} className="w-full accent-forest" />
          <div className="flex justify-between text-xs text-moss mt-1"><span>10 000 €</span><span>1 000 000 €</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-2xs font-semibold uppercase tracking-widest text-moss block mb-2">
              Apport — <span className="font-mono text-gold-deep">{formatEuro(apport)}</span>
            </label>
            <input type="range" min={0} max={Math.min(coutProjet, 300000)} step={1000} value={apport} onChange={e => setApport(+e.target.value)} className="w-full accent-forest" />
          </div>
          <div>
            <label className="text-2xs font-semibold uppercase tracking-widest text-moss block mb-2">
              Durée — <span className="font-mono text-gold-deep">{duree} ans</span>
            </label>
            <input type="range" min={5} max={30} value={duree} onChange={e => setDuree(+e.target.value)} className="w-full accent-forest" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-ivory rounded-xl p-4">
          <p className="text-2xs text-moss mb-1">Emprunt</p>
          <p className="font-mono font-semibold text-ink">{formatEuro(emprunt)}</p>
        </div>
        <div className="bg-ivory rounded-xl p-4">
          <p className="text-2xs text-moss mb-1">Intérêts estimés</p>
          <p className="font-mono font-semibold text-ink">{formatEuro(interets)}</p>
          <p className="text-2xs text-moss">taux {(taux * 100).toFixed(1)}%</p>
        </div>
        <div className="bg-ivory rounded-xl p-4">
          <p className="text-2xs text-moss mb-1">Coût total</p>
          <p className="font-mono font-semibold text-ink">{formatEuro(coutTotal)}</p>
        </div>
      </div>

      <div className="bg-forest rounded-xl p-5 flex items-center justify-between">
        <div>
          <p className="text-2xs text-gold-light uppercase tracking-widest mb-1">Mensualité estimée</p>
          <p className="font-serif text-3xl text-cream">{formatEuro(mensuel)}<span className="text-lg text-gold-light">/mois</span></p>
        </div>
        <div className="text-right text-xs text-gold-light">
          <p>Sur {duree} ans</p>
          <p className="font-mono font-semibold text-cream mt-1">taux indicatif 3,5%</p>
        </div>
      </div>
    </div>
  )
}
