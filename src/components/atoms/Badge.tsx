interface BadgeProps {
  label: string
  color?: 'primary' | 'success' | 'warning' | 'danger'
}

export function Badge({ label, color = 'primary' }: BadgeProps) {
  return (
    <span className={`badge badge-${color}`}>
      {label}
    </span>
  )
}
