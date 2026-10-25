import { useState, useRef, MouseEvent, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Bookmark, 
  BookmarkMinus,
  Check,
  Search, 
  ChevronRight, 
  Filter
} from 'lucide-react'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SortDropdown from '../../components/SortDropdown'
import DetailBukuSundaIslam from './DetailBukuSundaIslam'  

// Data mock (tetap)
const sundaIslamBooks = [
  {
    id: 'book-1',
    title: 'Sejarah Islam di Tatar Sunda',
    author: 'A. Hasan Muarif',
    description: 'Menelusuri jejak awal penyebaran Islam di wilayah Pasundan dan akulturasinya dengan budaya lokal.',
    source: 'Repository UIN',
    access: 'Open Access',
    accessClass: 'open',
    year: '2021',
    category: 'Sejarah',
    cover: '/images/landing/book-1.svg'
  },
  {
    id: 'book-2',
    title: 'Budaya Sunda dalam Perspektif Islam',
    author: 'R. Rachmat',
    description: 'Kajian komprehensif mengenai nilai-nilai keislaman yang tertanam dalam tradisi dan adat Sunda.',
    source: 'Otomasi UIN',
    access: 'Akses Lokal',
    accessClass: 'local',
    year: '2019',
    category: 'Budaya & Adat',
    cover: '/images/landing/book-2.svg'
  },
  {
    id: 'book-3',
    title: 'Naskah Kuno Sunda-Islam',
    author: 'Tim Peneliti',
    description: 'Digitalisasi dan terjemahan naskah-naskah kuno beraksara pegon peninggalan ulama Jawa Barat.',
    source: 'Digitalisasi',
    access: 'Akses Lokal',
    accessClass: 'local',
    year: '2023',
    category: 'Naskah Kuno',
    cover: '/images/landing/book-3.svg'
  },
  {
    id: 'book-4',
    title: 'Islam dan Kearifan Lokal Nusantara',
    author: 'Nurcholish Madjid',
    description: 'Membedah konsep Islam Nusantara dengan fokus pada kebijaksanaan lokal masyarakat Sunda.',
    source: 'E-book UIN',
    access: 'Open Access',
    accessClass: 'open',
    year: '2020',
    category: 'Budaya & Adat',
    cover: '/images/landing/book-4.svg'
  },
  {
    id: 'book-5',
    title: 'The History of Islam in West Java',
    author: 'Anthony Reid',
    description: 'Tinjauan historis dari peneliti barat mengenai perkembangan Islam di Jawa Barat era kolonial.',
    source: 'Universitas Indonesia',
    access: 'Request Access',
    accessClass: 'request',
    year: '2018',
    category: 'Sejarah',
    cover: '/images/landing/book-5.svg'
  },
  {
    id: 'book-6',
    title: 'Sufisme dan Tarekat di Priangan',
    author: 'Martin van Bruinessen',
    description: 'Perkembangan ajaran tasawuf dan peran tarekat dalam membentuk lanskap keagamaan Sunda.',
    source: 'Leiden University',
    access: 'Open Access',
    accessClass: 'open',
    year: '2022',
    category: 'Tasawuf / Tarekat',
    cover: '/images/landing/book-6.svg'
  }
]

const accessStyles = {
  open: { text: 'text-[#1b7448]', dot: 'bg-[#22a06b]' },
  local: { text: 'text-[#275f96]', dot: 'bg-[#2f7dd3]' },
  request: { text: 'text-[#a44751]', dot: 'bg-[#e95d6a]' }
}

type ToastState = {
  text: string
  tone: 'saved' | 'removed'
}

export default function SundaIslamPage() {
  const [savedBooks, setSavedBooks] = useState<string[]>([])
  
  // State Filter & Sorting
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedYears, setSelectedYears] = useState<string[]>([])
  const [selectedAccess, setSelectedAccess] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('Terbaru')

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // Notifikasi simpan / batal simpan
  const [toast, setToast] = useState<ToastState>({ text: '', tone: 'saved' })
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

  const toggleSave = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault()

    const alreadySaved = savedBooks.includes(id)

    setSavedBooks(prev => alreadySaved ? prev.filter(bookId => bookId !== id) : [...prev, id])

    showToast(
      alreadySaved
        ? 'Dihapus dari Koleksi Tersimpan'
        : 'Berhasil disimpan ke Koleksi Tersimpan',
      alreadySaved ? 'removed' : 'saved'
    )
  }

  const toggleFilter = (setState: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setState(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value])
  }

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedYears, selectedAccess, selectedCategories, sortBy])

  // Logika Filter & Sorting
  const filteredAndSortedBooks = useMemo(() => {
    return sundaIslamBooks.filter(book => {
      const matchSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      
      const bookYear = parseInt(book.year)
      const matchYear = selectedYears.length === 0 || selectedYears.some(y => {
        if (y === '2023 - Sekarang') return bookYear >= 2023
        if (y === '2010 - 2022') return bookYear >= 2010 && bookYear <= 2022
        if (y === 'Sebelum 2010') return bookYear < 2010
        return false
      })

      const matchAccess = selectedAccess.length === 0 || selectedAccess.includes(book.access)
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(book.category)

      return matchSearch && matchYear && matchAccess && matchCategory
    }).sort((a, b) => {
      if (sortBy === 'Terbaru') return parseInt(b.year) - parseInt(a.year)
      if (sortBy === 'A - Z') return a.title.localeCompare(b.title)
      return 0 
    })
  }, [searchQuery, selectedYears, selectedAccess, selectedCategories, sortBy])

  // Pagination Logic
  const totalPages = Math.ceil(filteredAndSortedBooks.length / itemsPerPage)
  const currentBooks = filteredAndSortedBooks.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  )

  return (
    <>
      <Navbar />

      {/* NOTIFIKASI SIMPAN */}
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
              Koleksi Tematik
            </p>
            <h1 className="m-0 [font-family:'Lora',serif] text-[clamp(24px,2vw,30px)] leading-[1.1] text-[#6f1222]">
              Sunda Islam Corner
            </h1>
            <p className="mt-[8px] max-w-[600px] text-[11px] leading-[1.5] text-[#514641]">
              Eksplorasi khazanah keilmuan, sejarah, dan kebudayaan yang mengkaji perpaduan nilai-nilai Islam dengan kearifan lokal Tatar Sunda.
            </p>
          </div>
        </section>

        {/* MAIN LAYOUT */}
        <section className="mx-auto mt-6 flex w-[min(1320px,94%)] gap-6 max-[900px]:flex-col">
          
          {/* SIDEBAR FILTER */}
          <aside className="w-[220px] shrink-0 max-[900px]:w-full">
            <div className="rounded-[9px] border border-[#eadfce] bg-white p-[15px] shadow-[0_4px_12px_rgba(79,57,44,.03)]">
              <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-[#eadfce]">
                <Filter size={14} className="text-[#65111f]" />
                <h2 className="m-0 [font-family:'Lora',serif] text-[14px] text-[#65111f] font-semibold">
                  Filter Koleksi
                </h2>
              </div>

              {/* Pencarian */}
              <div className="mb-5 relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari judul, penulis..." 
                  className="w-full rounded-[5px] border border-[#dfd1c1] bg-[#fffaf2] py-1.5 pl-7 pr-2.5 text-[9px]! text-[#5f5550] outline-none focus:border-[#c18f47]"
                />
                <Search size={12} className="absolute left-2.5 top-[7px] text-[#ae8147]" />
              </div>

              {/* Filter: Tahun */}
              <div className="mb-5">
                <h3 className="mb-2.5 text-[10.5px] font-bold text-[#6e5b4e]">Tahun Terbit</h3>
                <div className="flex flex-col gap-1.5">
                  {['2023 - Sekarang', '2010 - 2022', 'Sebelum 2010'].map((year) => (
                    <label key={year} className="flex items-center gap-1.5 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedYears.includes(year)}
                        onChange={() => toggleFilter(setSelectedYears, year)}
                        className="accent-[#8d6a30] cursor-pointer w-3 h-3" 
                      />
                      <span className="text-[10px] text-[#70645f] group-hover:text-[#65111f]">{year}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter: Jenis Akses */}
              <div className="mb-5">
                <h3 className="mb-2.5 text-[10.5px] font-bold text-[#6e5b4e]">Jenis Akses</h3>
                <div className="flex flex-col gap-1.5">
                  {['Open Access', 'Akses Lokal', 'Request Access'].map((access) => (
                    <label key={access} className="flex items-center gap-1.5 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedAccess.includes(access)}
                        onChange={() => toggleFilter(setSelectedAccess, access)}
                        className="accent-[#8d6a30] cursor-pointer w-3 h-3" 
                      />
                      <span className="text-[10px] text-[#70645f] group-hover:text-[#65111f]">{access}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter: Kategori */}
              <div>
                <h3 className="mb-2.5 text-[10.5px] font-bold text-[#6e5b4e]">Kategori</h3>
                <div className="flex flex-col gap-1.5">
                  {['Sejarah', 'Budaya & Adat', 'Naskah Kuno', 'Tasawuf / Tarekat', 'Jurnal Ilmiah'].map((cat) => (
                    <label key={cat} className="flex items-center gap-1.5 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleFilter(setSelectedCategories, cat)}
                        className="accent-[#8d6a30] cursor-pointer w-3 h-3" 
                      />
                      <span className="text-[10px] text-[#70645f] group-hover:text-[#65111f]">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* CATALOG GRID */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[9.5px] text-[#70645f]">
                Menampilkan <strong className="text-[#65111f] font-semibold">{filteredAndSortedBooks.length}</strong> koleksi
              </p>
              
              {/* CUSTOM DROPDOWN */}
              <SortDropdown
                value={sortBy}
                options={['Terbaru', 'Terpopuler', 'A - Z']}
                onChange={setSortBy}
              />
            </div>

            {currentBooks.length > 0 ? (
              <div className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-3 max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">
                {currentBooks.map((item) => {
                  const access = accessStyles[item.accessClass as keyof typeof accessStyles]
                  const isSaved = savedBooks.includes(item.id)

                  return (
                    <Link
                      key={item.id}
                      to={`/sunda-islam/detail/${item.id}`}
                      className="
                        group relative flex flex-col rounded-[7px] border border-[#eee3d3] 
                        bg-white p-2.5 pb-3 shadow-[0_3px_10px_rgba(80,56,40,.025)] 
                        transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_6px_16px_rgba(80,56,40,.06)]
                      "
                    >
                      {/* BUTTON KOLEKSI */}
                      <button
                        type="button"
                        aria-label={isSaved ? `Hapus ${item.title} dari koleksi` : `Simpan ${item.title}`}
                        aria-pressed={isSaved}
                        onClick={(e) => toggleSave(e, item.id)}
                        className={`
                          absolute top-[15px] right-[15px] z-[3] grid h-[26px] w-[26px] place-items-center 
                          rounded-full backdrop-blur-md transition-all duration-200
                          ${isSaved 
                            ? 'bg-[#b27a24] text-white shadow-sm' 
                            : 'bg-[rgba(255,255,255,0.85)] text-[#b27a24] hover:bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08)]'
                          }
                        `}
                      >
                        <Bookmark size={13} fill={isSaved ? 'currentColor' : 'none'} />
                      </button>

                      {/* COVER */}
                      <div className="w-full h-[160px] bg-[#f8eccf] rounded-[4px] mb-2.5 overflow-hidden relative">
                        <img
                          src={item.cover}
                          alt={item.title}
                          className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* METADATA */}
                      <div className="flex-1 flex flex-col">
                        <div className="mb-1.5 flex items-center justify-between">
                          <span className="inline-block rounded-full bg-[#f3eadc] px-1.5 py-0.5 text-[8.5px] font-semibold text-[#6e5b4e]">
                            {item.year}
                          </span>
                          <div className={`flex items-center gap-[4px] text-[8.5px] font-semibold ${access.text}`}>
                            <span className={`h-[5px] w-[5px] rounded-full ${access.dot}`} />
                            {item.access}
                          </div>
                        </div>

                        <h3 className="m-0 mb-0.5 [font-family:'Lora',serif] text-[13px] leading-[1.25] text-[#302724] group-hover:text-[#6f1222] transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        
                        <p className="mb-2 text-[10px] font-medium text-[#8d6a30]">
                          {item.author}
                        </p>

                        <p className="mt-auto mb-3 text-[9.5px] leading-[1.4] text-[#766963] line-clamp-2">
                          {item.description}
                        </p>

                        <div className="mt-auto flex items-center justify-between border-t border-[#f0e8dc] pt-2">
                          <span className="text-[9px] text-[#766963] flex items-center gap-1">
                            <Filter size={10} /> {item.source}
                          </span>
                          
                          <span className="flex items-center text-[9px] font-semibold text-[#65111f] group-hover:translate-x-0.5 transition-transform">
                            Lihat Detail <ChevronRight size={12} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-[#70645f] text-[10px] bg-white rounded-[7px] border border-[#eadfce]">
                Tidak ada koleksi yang sesuai dengan filter Anda.
              </div>
            )}
            
            {/* PAGINATION DINAMIS */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button 
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`
                      h-6 w-6 rounded-[3px] border text-[9.5px]! transition-colors [font-family:'Lora',serif]
                      ${currentPage === page 
                        ? 'border-[#c18f47] bg-[#fbf3e7] text-[#65111f] font-bold!' 
                        : 'border-[#eadfce] bg-white text-[#70645f] hover:bg-[#fbf3e7]'
                      }
                    `}
                  >
                    {page}
                  </button>
                ))}
                
                {/* Tombol Selanjutnya (opsional, tampil jika bukan halaman terakhir) */}
                {currentPage < totalPages && (
                  <>
                    <span className="px-0.5 text-[#70645f] text-[9.5px] flex items-center">...</span>
                    <button 
                      type="button"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className="h-6 px-2 rounded-[3px] border border-[#eadfce] bg-white text-[#70645f] hover:bg-[#fbf3e7] text-[9px]! font-medium! transition-colors"
                    >
                      Selanjutnya
                    </button>
                  </>
                )}
              </div>
            )}

          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}