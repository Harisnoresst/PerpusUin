import type { AccessType } from '../types/collection'

type AccessBadgeProps = {
  type: AccessType
}

export default function AccessBadge({ type }: AccessBadgeProps) {
  const label =
    type === 'open'
      ? 'Open Access'
      : type === 'local'
        ? 'Akses Lokal'
        : 'Request Access'

  return (
    <span className={`access-badge access-${type}`}>
      {label}
    </span>
  )
}
