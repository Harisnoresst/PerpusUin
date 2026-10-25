type SourceBadgeProps = {
  label: string
}

export default function SourceBadge({ label }: SourceBadgeProps) {
  return <span className="source-badge">{label}</span>
}
