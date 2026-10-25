import { Search } from 'lucide-react'

export default function SearchBar() {
  return (
    <div className="main-search">
      <Search size={18} />
      <input placeholder="Cari koleksi, karya dosen, penulis, atau topik..." />
      <button type="button">Cari</button>
    </div>
  )
}
