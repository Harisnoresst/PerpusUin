import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

type CornerCardProps = {
  title: string
  description: string
  to: string
  label: string
}

export default function CornerCard({
  title,
  description,
  to,
  label
}: CornerCardProps) {
  return (
    <Link to={to} className="corner-card">
      <span className="corner-label">{label}</span>
      <h2>{title}</h2>
      <p>{description}</p>
      <span className="corner-link">
        Jelajahi Corner
        <ChevronRight size={18} />
      </span>
    </Link>
  )
}
