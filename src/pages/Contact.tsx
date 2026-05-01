import { useState } from 'react'

const stats = [
  { value: '98%', label: 'Clients satisfaits' },
  { value: '< 48h', label: 'Délai de réponse' },
  { value: '15 ans', label: 'D\'expérience' },
  { value: 'Gratuit', label: 'Premier entretien' },
]

export default function Contact() {
  const [form, setForm] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: '',
    format: 'visio',
  })
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <main className="py-16 px-8 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left */}
          <div>
            <p className="text-2xs font-semibold tracking-widest uppercase text-gold-deep mb-4">
              Prise de rendez-vous
            </p>
            <h1 className="font-serif text-ink tracking-tight mb-6" style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}>
              Parlons de votre<br />
              <em className="italic text-forest">patrimoine</em>
            </h1>
            <p className="text-base text-forest-light leading-relaxed mb-10 max-w-lg">
              Premier entretien gratuit et sans engagement. Nous analysons votre situation et vous proposons
              des solutions personnalisées adaptées à vos objectifs de vie.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-12">
              {stats.map(({ value, label }) => (
                <div key={label} className="bg-paper border border-line-soft rounded-2xl p-6">
                  <p className="font-serif text-3xl text-ink mb-1 tracking-tight">{value}</p>
                  <p className="text-xs text-moss uppercase tracking-widest">{label}</p>
                </div>
              ))}
            </div>

            <div className="bg-forest rounded-3xl p-8">
              <h3 className="font-serif text-xl text-cream mb-4">Modes de consultation</h3>
              <div className="space-y-3">
                {[
                  { icon: '💻', label: 'Visioconférence', desc: 'Zoom / Teams — depuis chez vous' },
                  { icon: '🏢', label: 'Présentiel', desc: 'À notre cabinet — sur rendez-vous' },
                  { icon: '📞', label: 'Téléphone', desc: 'Rappel sous 24h ouvrées' },
                ].map(({ icon, label, desc }) => (
                  <div key={label} className="flex gap-4 items-start">
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <p className="text-sm font-medium text-cream">{label}</p>
                      <p className="text-xs text-cream/60">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-paper border border-line-soft rounded-3xl p-10">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center text-3xl mb-6">✓</div>
                <h2 className="font-serif text-2xl text-ink mb-3">Message envoyé !</h2>
                <p className="text-sm text-forest-light max-w-xs">
                  Nous vous recontacterons sous 48h pour planifier votre entretien. À bientôt !
                </p>
                <button onClick={() => setSent(false)} className="mt-8 text-sm text-forest hover:text-forest-light underline underline-offset-2">
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="font-serif text-2xl text-ink mb-6">Votre demande</h2>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'prenom', label: 'Prénom', placeholder: 'Jean' },
                    { name: 'nom', label: 'Nom', placeholder: 'Dupont' },
                  ].map(({ name, label, placeholder }) => (
                    <div key={name}>
                      <label className="text-2xs font-semibold uppercase tracking-widest text-moss block mb-2">{label}</label>
                      <input
                        type="text"
                        name={name}
                        value={form[name as keyof typeof form]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        required
                        className="w-full border border-line rounded-xl px-4 py-3 text-sm text-ink bg-ivory focus:border-forest focus:outline-none transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="text-2xs font-semibold uppercase tracking-widest text-moss block mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jean.dupont@email.com"
                    required
                    className="w-full border border-line rounded-xl px-4 py-3 text-sm text-ink bg-ivory focus:border-forest focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-2xs font-semibold uppercase tracking-widest text-moss block mb-2">Téléphone</label>
                  <input
                    type="tel"
                    name="telephone"
                    value={form.telephone}
                    onChange={handleChange}
                    placeholder="06 00 00 00 00"
                    className="w-full border border-line rounded-xl px-4 py-3 text-sm text-ink bg-ivory focus:border-forest focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-2xs font-semibold uppercase tracking-widest text-moss block mb-2">Format souhaité</label>
                  <select
                    name="format"
                    value={form.format}
                    onChange={handleChange}
                    className="w-full border border-line rounded-xl px-4 py-3 text-sm text-ink bg-ivory focus:border-forest focus:outline-none transition-colors"
                  >
                    <option value="visio">Visioconférence</option>
                    <option value="presentiel">Présentiel</option>
                    <option value="telephone">Téléphone</option>
                  </select>
                </div>

                <div>
                  <label className="text-2xs font-semibold uppercase tracking-widest text-moss block mb-2">Sujet principal</label>
                  <select
                    name="sujet"
                    value={form.sujet}
                    onChange={handleChange}
                    className="w-full border border-line rounded-xl px-4 py-3 text-sm text-ink bg-ivory focus:border-forest focus:outline-none transition-colors"
                  >
                    <option value="">Sélectionner…</option>
                    <option value="etudes">🎓 Études enfants</option>
                    <option value="retraite">🏖️ Retraite</option>
                    <option value="projet">💼 Projet immobilier</option>
                    <option value="dependance">🏥 Dépendance</option>
                    <option value="succession">📜 Succession</option>
                    <option value="impots">💰 Optimisation fiscale</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="text-2xs font-semibold uppercase tracking-widest text-moss block mb-2">Message (optionnel)</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Décrivez brièvement votre situation et vos objectifs…"
                    className="w-full border border-line rounded-xl px-4 py-3 text-sm text-ink bg-ivory focus:border-forest focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-forest text-cream py-4 rounded-full text-sm font-medium hover:bg-ink transition-colors duration-200 hover:-translate-y-px hover:shadow-lg"
                >
                  Envoyer ma demande de rendez-vous
                </button>

                <p className="text-2xs text-moss text-center">
                  Vos données sont traitées conformément au RGPD. Aucun démarchage.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
