import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-full font-sans font-medium transition-all duration-200',
        {
          'bg-forest text-cream hover:bg-ink hover:-translate-y-px hover:shadow-lg': variant === 'primary',
          'bg-transparent text-forest border border-forest hover:bg-forest hover:text-cream': variant === 'ghost',
          'bg-cream text-ink border border-line hover:border-forest': variant === 'outline',
          'px-4 py-2 text-xs tracking-wide': size === 'sm',
          'px-6 py-2.5 text-sm': size === 'md',
          'px-8 py-4 text-sm': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
