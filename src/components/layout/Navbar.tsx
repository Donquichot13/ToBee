import { NavLink, useNavigate } from 'react-router-dom'
import clsx from 'clsx'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/matrice', label: 'La Matrice' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/prevoyance', label: 'Prévoyance' },
  { to: '/dashboard', label: 'Mon Patrimoine' },
  { to: '/contact', label: 'Rendez-vous' },
]

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 z-50 bg-cream/85 backdrop-blur-xl border-b border-line-soft px-8 md:px-12 py-4 flex items-center justify-between">
      <button onClick={() => navigate('/')} className="flex items-center gap-3">
        <div className="w-9 h-9 bg-forest rounded-full flex items-center justify-center font-serif font-semibold italic text-gold-light text-xl">
          T
        </div>
        <div className="text-left">
          <span className="font-serif font-medium text-lg text-ink tracking-wide block leading-none">
            ToBee
          </span>
          <span className="text-2xs font-sans font-semibold tracking-widest uppercase text-moss">
            Gestion Patrimoniale
          </span>
        </div>
      </button>

      <ul className="hidden lg:flex items-center gap-8 text-sm font-medium">
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                clsx(
                  'relative pb-1 transition-colors duration-200',
                  isActive
                    ? 'text-forest after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:bg-gold'
                    : 'text-ink hover:text-gold-deep'
                )
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate('/matrice')}
        className="bg-forest text-cream text-sm font-medium px-5 py-2.5 rounded-full hover:bg-ink transition-all duration-200 hover:-translate-y-px hover:shadow-lg"
      >
        Démarrer
      </button>
    </nav>
  )
}
