import { useEffect, useMemo, useRef, useState, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { 
  BookmarkMinus, 
  Check,
  Search, 
  Filter,
  Book,
  GraduationCap,
  FileText,
  ChevronRight
} from 'lucide-react'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

// Data mock koleksi gabungan (Buku & Karya Dosen)
const initialSavedItems = [
  {
    id: 'book-1',
    category: 'book',
    title: 'Sejarah Islam di Tatar Sunda',
    author: 'A. Hasan Muarif',
    description: 'Menelusuri jejak awal penyebaran Islam di wilayah Pasundan dan akulturasinya dengan budaya lokal.',
    source: 'Repository UIN',
    access: 'Open Access',
    accessClass: 'open',
    year: '2021',
    cover: '/images/landing/book-1.svg'
  },
  {
    id: 'work-1',
    category: 'lecturer_work',
    title: 'Knowledge Management in Islamic Higher Education',
    author: 'Dr. Ahmad Fauzi, M.T.',
    faculty: 'Fakultas Sains dan Teknologi',
    type: 'Artikel Jurnal',
    description: 'Penelitian ini mengkaji penerapan manajemen pengetahuan di lingkungan perguruan tinggi Islam.',
    source: 'DOAJ',
    access: 'Open Access',
    accessClass: 'open',
    year: '2025'
  },
  {
    id: 'book-2',
    category: 'book',
    title: 'Budaya Sunda dalam Perspektif Islam',
    author: 'R. Rachmat',
    description: 'Kajian komprehensif mengenai nilai-nilai keislaman yang tertanam dalam tradisi dan adat Sunda.',
    source: 'Otomasi UIN',
    access: 'Akses Lokal',
    accessClass: 'local',
    year: '2019',
    cover: '/images/landing/book-2.svg'
  },
  {
    id: 'work-3',
    category: 'lecturer_work',
    title: 'Digital Preservation of Islamic Manuscripts',
    author: 'Dr. Muhammad Rizal, M.A.',
    faculty: 'Fakultas Ushuluddin',
    type: 'Buku',
    description: 'Buku referensi mengenai metodologi preservasi digital naskah-naskah keislaman di Jawa Barat.',
    source: 'Otomasi UIN',
    access: 'Akses Lokal',
    accessClass: 'local',
    year: '2024'
  }
]

const accessStyles = {
  open: { text: 'text-[#1b7448]', dot: 'bg-[#22a06b]', bg: 'bg-[#e7f5ef]' },
  local: { text: 'text-[#275f96]', dot: 'bg-[#2f7dd3]', bg: 'bg-[#ebf3fa]' },
  request: { text: 'text-[#a44751]', dot: 'bg-[#e95d6a]', bg: 'bg-[#fcebed]' }
}

// Tombol kategori: tanda ! dipakai karena aturan global `button { font: inherit }`
// mengalahkan utility ukuran & ketebalan font Tailwind.
const categoryButtonClass = (active: boolean) =>
  `flex w-full items-center gap-2 rounded-[5px] border px-2.5 py-1.5 text-left text-[10px]! font-medium! transition-colors ${
    active
      ? 'border-[#c18f47] bg-[#fbf3e7] text-[#65111f]'
      : 'border-transparent bg-transparent text-[#70645f] hover:bg-[#fffaf2] hover:text-[#65111f]'
  }`

type ToastState = {
  text: string
  tone: 'saved' | 'removed'
}

export default function SavedCollectionsPage() {
  const [savedItems, setSavedItems] = useState(initialSavedItems)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<'all' | 'book' | 'lecturer_work'>('all')

  // Notifikasi
  const [toast, setToast] = useState<ToastState>({ text: '', tone: 'removed' })
  const [toastVisible, setToastVisible] = useState(false)
  const toastTimer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current)
    }
  }, [])

  const showToast = (text: string, tone: ToastState['tone']) => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current)

    setToast({ text, tone })
    setToastVisible(true)

    toastTimer.current = window.setTimeout(() => setToastVisible(false), 2200)
  }

  const handleRemove = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault()
    setSavedItems(prev => prev.filter(item => item.id !== id))
    showToast('Dihapus dari Koleksi Tersimpan', 'removed')
  }

  const filteredItems = useMemo(() => {
    return savedItems.filter(item => {
      const matchesFilter = activeFilter === 'all' || item.category === activeFilter
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.author.toLowerCase().includes(searchQuery.toLowerCase())
      
      return matchesFilter && matchesSearch
    })
  }, [savedItems, searchQuery, activeFilter])

  return (
    <>
      <Navbar />

      {/* NOTIFIKASI */}
      <div
        role="status"
        aria-live="polite"
        className={`
          pointer-events-none fixed bottom-6 left-1/2 z-[200]
          -translate-x-1/2 transition-all duration-300
          ${toastVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}
        `}
      >
        <div className="
          flex items-center gap-2.5 rounded-[10px]
          border border-[#eadfce] bg-[#fffdf9]
          px-4 py-2.5
          shadow-[0_10px_28px_rgba(65,42,30,.14)]
        ">
          <span className={`
            grid h-5 w-5 shrink-0 place-items-center rounded-full text-white
            ${toast.tone === 'saved' ? 'bg-[#8d6a30]' : 'bg-[#a44751]'}
          `}>
            {toast.tone === 'saved' ? (
              <Check size={12} strokeWidth={3} />
            ) : (
              <BookmarkMinus size={11} />
            )}
          </span>

          <span className="whitespace-nowrap text-[10.5px] font-semibold text-[#65111f]">
            {toast.text}
          </span>
        </div>
      </div>

      <main className="bg-[#fffdf8] min-h-screen pb-12">
        {/* PAGE HEADER */}
        <section className="bg-[#fbf3e7] border-b border-[#eadfce] pt-[30px] pb-[20px] px-[6%]">
          <div className="mx-auto w-[min(1320px,100%)] flex flex-col items-start">
            <p className="mb-[4px] text-[9px] font-bold tracking-[0.22em] text-[#ae8147] uppercase">
              Area Pengguna
            </p>
            <h1 className="m-0 [font-family:'Lora',serif] text-[clamp(24px,2vw,30px)] leading-[1.1] text-[#6f1222]">
              Koleksi Tersimpan
            </h1>
            <p className="mt-[8px] max-w-[600px] text-[11px] leading-[1.5] text-[#514641]">
              Akses cepat ke seluruh buku, jurnal, dan karya dosen yang telah Anda tandai sebelumnya untuk dibaca kembali.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-6 flex w-[min(1320px,94%)] gap-6 max-[900px]:flex-col">
          
          {/* SIDEBAR FILTER */}
          <aside className="w-[220px] shrink-0 max-[900px]:w-full">
            <div className="rounded-[9px] border border-[#eadfce] bg-white p-[15px] shadow-[0_4px_12px_rgba(79,57,44,.03)] sticky top-20">
              <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-[#eadfce]">
                <Filter size={14} className="text-[#65111f]" />
                <h2 className="m-0 [font-family:'Lora',serif] text-[14px] text-[#65111f] font-semibold">
                  Kelola Koleksi
                </h2>
              </div>

              {/* Pencarian */}
              <div className="mb-5 relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari judul..." 
                  className="w-full rounded-[5px] border border-[#dfd1c1] bg-[#fffaf2] py-1.5 pl-7 pr-2.5 text-[9px]! text-[#5f5550] outline-none focus:border-[#c18f47] transition-colors"
                />
                <Search size={12} className="absolute left-2.5 top-[7px] text-[#ae8147]" />
              </div>

              {/* Filter Kategori */}
              <div>
                <h3 className="mb-2.5 text-[10.5px] font-bold text-[#6e5b4e]">Kategori</h3>
                <div className="flex flex-col gap-1.5">
                  <button 
                    type="button"
                    onClick={() => setActiveFilter('all')}
                    className={categoryButtonClass(activeFilter === 'all')}
                  >
                    <BookmarkMinus size={12} /> Semua Koleksi
                  </button>
                  <button 
                    type="button"
                    onClick={() => setActiveFilter('book')}
                    className={categoryButtonClass(activeFilter === 'book')}
                  >
                    <Book size={12} /> Buku Sunda Islam
                  </button>
                  <button 
                    type="button"
                    onClick={() => setActiveFilter('lecturer_work')}
                    className={categoryButtonClass(activeFilter === 'lecturer_work')}
                  >
                    <GraduationCap size={12} /> Karya Dosen SGD
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* CATALOG GRID */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between border-b border-[#eadfce] pb-2">
              <p className="text-[9.5px] text-[#70645f]">
                Ditemukan <strong className="text-[#65111f] font-semibold">{filteredItems.length}</strong> item tersimpan
              </p>
            </div>

            {filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-[#dfd1c1] rounded-[8px] bg-[#fffaf2]">
                <BookmarkMinus size={28} className="text-[#c18f47] mb-2 opacity-50" />
                <h3 className="text-[13px] font-semibold text-[#6e5b4e] mb-1">Tidak ada koleksi ditemukan</h3>
                <p className="text-[10px] text-[#8d6a30]">Coba ubah kata kunci pencarian atau filter kategori.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 max-[1100px]:grid-cols-1">
                {filteredItems.map((item) => {
                  const access = accessStyles[item.accessClass as keyof typeof accessStyles]

                  return (
                    <Link
                      key={item.id}
                      to={item.category === 'book' ? `/sunda-islam/detail/${item.id}` : `/sgd-corner/detail/${item.id}`}
                      className={`
                        group relative flex rounded-[8px] border border-[#eee3d3] 
                        bg-white p-3 shadow-[0_2px_8px_rgba(80,56,40,.03)] 
                        transition-all duration-300 hover:-translate-y-0.5 hover:border-[#dfd1c1] hover:shadow-[0_6px_16px_rgba(80,56,40,.06)]
                        ${item.category === 'book' ? 'flex-row gap-3' : 'flex-col gap-0'}
                      `}
                    >
                      {/* BUTTON HAPUS KOLEKSI */}
                      <button
                        type="button"
                        title="Hapus dari koleksi"
                        aria-label={`Hapus ${item.title} dari koleksi`}
                        onClick={(e) => handleRemove(e, item.id)}
                        className="
                          absolute top-[10px] right-[10px] z-[3] grid h-[24px] w-[24px] place-items-center 
                          rounded-full bg-[#fcebed] text-[#a44751] opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-200 hover:bg-[#e95d6a] hover:text-white
                        "
                      >
                        <BookmarkMinus size={11} />
                      </button>

                      {/* RENDER KHUSUS BUKU */}
                      {item.category === 'book' && (
                        <>
                          <div className="w-[75px] h-[105px] shrink-0 bg-[#f8eccf] rounded-[4px] overflow-hidden relative">
                            <img src={item.cover} alt={item.title} className="w-full h-full object-cover mix-blend-multiply opacity-90" />
                          </div>
                          <div className="flex flex-col flex-1 py-0.5 pr-3">
                            <div className="mb-1.5 flex items-center gap-1.5">
                              <span className="rounded-full bg-[#f3eadc] px-1.5 py-0.5 text-[8.5px] font-semibold text-[#6e5b4e]">{item.year}</span>
                              <span className={`text-[8.5px] font-semibold flex items-center gap-1 ${access.text}`}>
                                <span className={`h-[4px] w-[4px] rounded-full ${access.dot}`} /> {item.access}
                              </span>
                            </div>
                            <h3 className="m-0 mb-1 [font-family:'Lora',serif] text-[13px] leading-[1.25] text-[#302724] group-hover:text-[#6f1222] line-clamp-2">{item.title}</h3>
                            <p className="mb-1.5 text-[10px] font-medium text-[#8d6a30]"><Book size={9} className="inline mr-1" /> {item.author}</p>
                            <p className="text-[9.5px] leading-[1.4] text-[#766963] line-clamp-2 mt-auto">{item.description}</p>
                          </div>
                        </>
                      )}

                      {/* RENDER KHUSUS KARYA DOSEN */}
                      {item.category === 'lecturer_work' && (
                        <>
                          <div className="mb-2 pr-6 flex flex-wrap items-center gap-1.5">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8.5px] font-semibold ${access.bg} ${access.text}`}>
                              <span className={`h-[4px] w-[4px] rounded-full ${access.dot}`} />{item.access}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full border border-[#e6d3b7] bg-[#fffaf2] px-2 py-0.5 text-[8.5px] text-[#6d5a48]">
                              <FileText size={9} /> {item.type}
                            </span>
                            <span className="inline-block rounded-full bg-[#f4ece1] px-2 py-0.5 text-[8.5px] font-semibold text-[#6e5b4e]">{item.year}</span>
                          </div>
                          
                          <h3 className="m-0 mb-1.5 [font-family:'Lora',serif] text-[14px] leading-[1.3] text-[#302724] group-hover:text-[#6f1222] line-clamp-2 pr-5">{item.title}</h3>
                          
                          <div className="mb-2 flex items-center gap-1.5 text-[#8d6a30]">
                            <GraduationCap size={12} />
                            <p className="text-[10px] font-bold m-0">{item.author}</p>
                          </div>
                          
                          <p className="mb-3 text-[10px] leading-[1.5] text-[#766963] line-clamp-2">{item.description}</p>
                          
                          <div className="mt-auto pt-2 border-t border-[#f0e8dc] flex items-center justify-between">
                            <span className="text-[8.5px] font-semibold uppercase tracking-wider text-[#a97938]">{item.faculty}</span>
                            <ChevronRight size={12} className="text-[#65111f]" />
                          </div>
                        </>
                      )}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}