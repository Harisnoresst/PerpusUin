import { Bookmark, ExternalLink } from 'lucide-react'
import type { CollectionItem } from '../types/collection'

type CollectionCardProps = {
  item: CollectionItem
}

export default function CollectionCard({ item }: CollectionCardProps) {
  return (
    <article className="collection-card">
      <button type="button" className="bookmark-button" aria-label="Simpan koleksi">
        <Bookmark size={18} />
      </button>

      <div className="collection-cover">
        {item.title}
      </div>

      <h3>{item.title}</h3>
      <p>{item.author}</p>

      <div className="collection-meta">
        <span>{item.sourceLabel}</span>
        <span className={`access-badge access-${item.accessType}`}>
          {item.accessType === 'open'
            ? 'Open Access'
            : item.accessType === 'local'
              ? 'Akses Lokal'
              : 'Request Access'}
        </span>
      </div>

      <a href={item.link ?? '#'} className="collection-link">
        Lihat Detail
        <ExternalLink size={14} />
      </a>
    </article>
  )
}
