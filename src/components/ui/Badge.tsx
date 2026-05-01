import clsx from 'clsx'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'green' | 'neutral'
  className?: string
}

export default function Badge({ children, variant = 'gold', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-3 py-1 rounded-full text-2xs font-semibold tracking-widest uppercase',
        {
          'bg-gold/10 text-gold-deep': variant === 'gold',
          'bg-forest/10 text-forest': variant === 'green',
          'bg-cream-deep text-moss': variant === 'neutral',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
