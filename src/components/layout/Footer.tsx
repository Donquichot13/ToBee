import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/70 py-16 px-8 md:px-12 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-forest rounded-full flex items-center justify-center font-serif font-semibold italic text-gold-light text-xl">
                T
              </div>
              <span className="font-serif text-lg text-cream tracking-wide">ToBee</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Le banquier, maintenant c'est vous. Un outil de conseil patrimonial interactif pour
              guider chaque étape de votre vie financière.
            </p>
          </div>

          <div>
            <h4 className="text-2xs font-semibold tracking-widest uppercase text-gold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                ['/', 'Accueil'],
                ['/matrice', 'La Matrice'],
                ['/solutions', 'Solutions'],
                ['/prevoyance', 'Prévoyance'],
                ['/dashboard', 'Mon Patrimoine'],
                ['/contact', 'Rendez-vous'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-cream transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-2xs font-semibold tracking-widest uppercase text-gold mb-4">
              Informations
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-cream transition-colors">
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cream transition-colors">
                  Politique RGPD
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cream transition-colors">
                  Conditions d'utilisation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs">
            © {new Date().getFullYear()} ToBee — Outil d'information patrimoniale, non une
            recommendation d'investissement.
          </p>
          <p className="text-xs text-moss">Les calculs sont fournis à titre indicatif.</p>
        </div>
      </div>
    </footer>
  )
}
