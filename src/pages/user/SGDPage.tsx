import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type MouseEvent,
  type SetStateAction
} from 'react'
import { Link } from 'react-router-dom'
import { 
  Bookmark, 
  BookmarkMinus,
  Check,
  Search, 
  ChevronRight, 
  Filter,
  FileText,
  GraduationCap
} from 'lucide-react'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SortDropdown from '../../components/SortDropdown'
import DetailSGDCorner from './DetailSGDCorner'

// Data mock untuk karya dosen
const lecturerWorks = [
  {
    id: 'work-1',
    title: 'Knowledge Management in Islamic Higher Education: A Case Study',
    author: 'Dr. Ahmad Fauzi, M.T.',
    faculty: 'Fakultas Sains dan Teknologi',
    type: 'Artikel Jurnal',
    description: 'Penelitian ini mengkaji penerapan manajemen pengetahuan di lingkungan perguruan tinggi Islam untuk meningkatkan efisiensi riset dan kolaborasi akademik.',
    source: 'DOAJ',
    access: 'Open Access',
    accessClass: 'open',
    year: '2025',
    cover: '/images/landing/work-1.svg'
  },
  {
    id: 'work-2',
    title: 'Pengembangan Model Pembelajaran Berbasis AI untuk Mahasiswa',
    author: 'Dr. Siti Nurjanah, M.Pd.',
    faculty: 'Fakultas Tarbiyah dan Keguruan',
    type: 'Prosiding',
    description: 'Makalah yang dipresentasikan dalam seminar internasional membahas efektivitas kecerdasan buatan dalam mempersonalisasi alur belajar mahasiswa.',
    source: 'E-book UIN',
    access: 'Open Access',
    accessClass: 'open',
    year: '2024',
    cover: '/images/landing/work-2.svg'
  },
  {
    id: 'work-3',
    title: 'Digital Preservation of Islamic Manuscripts in West Java',
    author: 'Dr. Muhammad Rizal, M.A.',
    faculty: 'Fakultas Ushuluddin',
    type: 'Buku',
    description: 'Buku referensi mengenai metodologi preservasi digital naskah-naskah keislaman di Jawa Barat menggunakan teknologi pencitraan multispektral.',
    source: 'Otomasi UIN',
    access: 'Akses Lokal',
    accessClass: 'local',
    year: '2024',
    cover: '/images/landing/work-3.svg'
  },
  {
    id: 'work-4',
    title: 'Pengaruh Literasi Digital terhadap Minat Baca Mahasiswa',
    author: 'Dr. Laila Rahma, M.I.Kom.',
    faculty: 'Fakultas Dakwah dan Komunikasi',
    type: 'Artikel Jurnal',
    description: 'Analisis kuantitatif mengenai korelasi antara tingginya akses media digital dengan kebiasaan membaca literatur akademik di kalangan mahasiswa.',
    source: 'Repository UIN',
    access: 'Open Access',
    accessClass: 'open',
    year: '2023',
    cover: '/images/landing/work-4.svg'
  },
  {
    id: 'work-5',
    title: 'Hukum Ekonomi Syariah dalam Ekosistem E-Commerce',
    author: 'Prof. Dr. H. Rahman, M.Ag.',
    faculty: 'Fakultas Syariah dan Hukum',
    type: 'Buku',
    description: 'Kajian mendalam mengenai regulasi transaksi digital, akad jual beli online, dan perlindungan konsumen dalam perspektif hukum Islam.',
    source: 'Perpustakaan UIN',
    access: 'Request Access',
    accessClass: 'request',
    year: '2023',
    cover: '/images/landing/work-5.svg'
  },
  {
    id: 'work-6',
    title: 'Sosiologi Masyarakat Urban: Tantangan Dakwah Kontemporer',
    author: 'Dr. Hasanuddin, M.Si.',
    faculty: 'Fakultas Ilmu Sosial dan Ilmu Politik',
    type: 'Artikel Jurnal',
    description: 'Menganalisis pergeseran nilai sosial di kawasan perkotaan dan merumuskan pendekatan dakwah yang relevan dengan psikologi masyarakat urban.',
    source: 'Jurnal Sosiologi Agama',
    access: 'Open Access',
    accessClass: 'open',
    year: '2022',
    cover: '/images/landing/work-6.svg'
  }
]

const accessStyles = {
  open: { text: 'text-[#1b7448]', dot: 'bg-[#22a06b]', bg: 'bg-[#e7f5ef]' },
  local: { text: 'text-[#275f96]', dot: 'bg-[#2f7dd3]', bg: 'bg-[#ebf3fa]' },
  request: { text: 'text-[#a44751]', dot: 'bg-[#e95d6a]', bg: 'bg-[#fcebed]' }
}

const SORT_OPTIONS = ['Tahun Terbaru', 'Nama Dosen (A - Z)', 'Judul (A - Z)']

/* ---------- Opsi filter ---------- */

const FACULTY_OPTIONS = [
  'Sains dan Teknologi', 
  'Tarbiyah dan Keguruan', 
  'Ushuluddin', 
  'Dakwah dan Komunikasi', 
  'Syariah dan Hukum', 
  'Ilmu Sosial dan Ilmu Politik',
  'Adab dan Humaniora',
  'Ekonomi dan Bisnis Islam'
]

// label di sidebar → nilai `type` pada data
const WORK_TYPE_OPTIONS = [
  { label: 'Artikel Jurnal', match: 'Artikel Jurnal' },
  { label: 'Buku Referensi', match: 'Buku' },
  { label: 'Prosiding Seminar', match: 'Prosiding' },
  { label: 'Laporan Penelitian', match: 'Laporan Penelitian' },
  { label: 'Paten / HAKI', match: 'Paten / HAKI' }
]

const YEAR_OPTIONS = [
  { label: '2024 - 2025', min: 2024, max: 9999 },
  { label: '2020 - 2023', min: 2020, max: 2023 },
  { label: '2015 - 2019', min: 2015, max: 2019 },
  { label: 'Sebelum 2015', min: 0, max: 2014 }
]

const ACCESS_OPTIONS = ['Open Access', 'Akses Lokal', 'Request Access']

// Scrollbar tipis bertema krem-emas untuk daftar fakultas
const slimScrollbar = [
  '[scrollbar-width:thin] [scrollbar-color:#dcc8a8_transparent]',
  '[&::-webkit-scrollbar]:w-1',
  '[&::-webkit-scrollbar-track]:bg-transparent',
  '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#dcc8a8]',
  'hover:[&::-webkit-scrollbar-thumb]:bg-[#b17b2c]'
].join(' ')

type ToastState = {
  text: string
  tone: 'saved' | 'removed'
}

export default function SGDCornerPage() {
  const [savedWorks, setSavedWorks] = useState<string[]>([])
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0])

  // State filter
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFaculties, setSelectedFaculties] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedYears, setSelectedYears] = useState<string[]>([])
  const [selectedAccess, setSelectedAccess] = useState<string[]>([])

  // Notifikasi simpan / batal simpan
  const [toast, setToast] = useState<ToastState>({ text: '', tone: 'saved' })
  const [toastVisible, setToastVisible] = useState(false)
  const toastTimer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current)
    }
  }, [])

  // Pagination: 10 karya per halaman
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const showToast = (text: string, tone: ToastState['tone']) => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current)

    setToast({ text, tone })
    setToastVisible(true)

    toastTimer.current = window.setTimeout(() => setToastVisible(false), 2200)
  }

  const toggleSave = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault()

    const alreadySaved = savedWorks.includes(id)

    setSavedWorks(prev => 
      alreadySaved ? prev.filter(workId => workId !== id) : [...prev, id]
    )

    showToast(
      alreadySaved
        ? 'Dihapus dari Koleksi Tersimpan'
        : 'Berhasil disimpan ke Koleksi Tersimpan',
      alreadySaved ? 'removed' : 'saved'
    )
  }

  const toggleFilter = (setState: Dispatch<SetStateAction<string[]>>, value: string) => {
    setState(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value])
  }

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedFaculties.length > 0 ||
    selectedTypes.length > 0 ||
    selectedYears.length > 0 ||
    selectedAccess.length > 0

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedFaculties([])
    setSelectedTypes([])
    setSelectedYears([])
    setSelectedAccess([])
  }

  // Kembali ke halaman 1 setiap filter / urutan berubah
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedFaculties, selectedTypes, selectedYears, selectedAccess, sortBy])

  // Filter (OR di dalam satu grup, AND antar grup) lalu urutkan
  const filteredAndSortedWorks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return lecturerWorks
      .filter((item) => {
        const matchSearch =
          query === '' ||
          item.title.toLowerCase().includes(query) ||
          item.author.toLowerCase().includes(query) ||
          item.faculty.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)

        const matchFaculty =
          selectedFaculties.length === 0 ||
          selectedFaculties.some((f) => item.faculty.toLowerCase().includes(f.toLowerCase()))

        const matchType =
          selectedTypes.length === 0 ||
          WORK_TYPE_OPTIONS.some((opt) => selectedTypes.includes(opt.label) && opt.match === item.type)

        const year = parseInt(item.year)
        const matchYear =
          selectedYears.length === 0 ||
          YEAR_OPTIONS.some((opt) => selectedYears.includes(opt.label) && year >= opt.min && year <= opt.max)

        const matchAccess =
          selectedAccess.length === 0 || selectedAccess.includes(item.access)

        return matchSearch && matchFaculty && matchType && matchYear && matchAccess
      })
      .sort((a, b) => {
        if (sortBy === 'Tahun Terbaru') return parseInt(b.year) - parseInt(a.year)
        if (sortBy === 'Nama Dosen (A - Z)') return a.author.localeCompare(b.author)
        if (sortBy === 'Judul (A - Z)') return a.title.localeCompare(b.title)
        return 0
      })
  }, [searchQuery, selectedFaculties, selectedTypes, selectedYears, selectedAccess, sortBy])

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedWorks.length / itemsPerPage))
  const currentWorks = filteredAndSortedWorks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
              Direktori Karya Akademik
            </p>
            <h1 className="m-0 [font-family:'Lora',serif] text-[clamp(24px,2vw,30px)] leading-[1.1] text-[#6f1222]">
              Sunan Gunung Djati Corner
            </h1>
            <p className="mt-[8px] max-w-[600px] text-[11px] leading-[1.5] text-[#514641]">
              Pusat literatur dan publikasi ilmiah karya dosen UIN Sunan Gunung Djati Bandung. Temukan jurnal, buku, prosiding, dan laporan penelitian dari berbagai fakultas.
            </p>
          </div>
        </section>

        {/* MAIN LAYOUT: SIDEBAR & GRID */}
        <section className="mx-auto mt-6 flex w-[min(1320px,94%)] gap-6 max-[900px]:flex-col">
          
          {/* SIDEBAR FILTER */}
          <aside className="w-[220px] shrink-0 max-[900px]:w-full">
            <div className="rounded-[9px] border border-[#eadfce] bg-white p-[15px] shadow-[0_4px_12px_rgba(79,57,44,.03)] sticky top-20">
              <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-[#eadfce]">
                <Filter size={14} className="text-[#65111f]" />
                <h2 className="m-0 [font-family:'Lora',serif] text-[14px] text-[#65111f] font-semibold">
                  Saring Karya
                </h2>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="ml-auto border-0 bg-transparent p-0 text-[9px]! font-semibold! text-[#8d6a30] hover:text-[#65111f] hover:underline transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Pencarian */}
              <div className="mb-5 relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari judul karya, dosen..." 
                  className="w-full rounded-[5px] border border-[#dfd1c1] bg-[#fffaf2] py-1.5 pl-7 pr-2.5 text-[9px]! text-[#5f5550] outline-none focus:border-[#c18f47] transition-colors"
                />
                <Search size={12} className="absolute left-2.5 top-[7px] text-[#ae8147]" />
              </div>

              {/* Filter: Fakultas */}
              <div className="mb-5">
                <h3 className="mb-2.5 text-[10.5px] font-bold text-[#6e5b4e]">Fakultas</h3>
                <div className={`flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-2 ${slimScrollbar}`}>
                  {FACULTY_OPTIONS.map((fakultas) => (
                    <label key={fakultas} className="flex items-start gap-1.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedFaculties.includes(fakultas)}
                        onChange={() => toggleFilter(setSelectedFaculties, fakultas)}
                        className="accent-[#8d6a30] cursor-pointer mt-0.5 w-3 h-3"
                      />
                      <span className="text-[10px] leading-[1.4] text-[#70645f] group-hover:text-[#65111f]">{fakultas}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter: Bentuk Karya */}
              <div className="mb-5">
                <h3 className="mb-2.5 text-[10.5px] font-bold text-[#6e5b4e]">Bentuk Karya</h3>
                <div className="flex flex-col gap-1.5">
                  {WORK_TYPE_OPTIONS.map(({ label }) => (
                    <label key={label} className="flex items-center gap-1.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(label)}
                        onChange={() => toggleFilter(setSelectedTypes, label)}
                        className="accent-[#8d6a30] cursor-pointer w-3 h-3"
                      />
                      <span className="text-[10px] text-[#70645f] group-hover:text-[#65111f]">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter: Tahun */}
              <div className="mb-5">
                <h3 className="mb-2.5 text-[10.5px] font-bold text-[#6e5b4e]">Tahun Terbit</h3>
                <div className="flex flex-col gap-1.5">
                  {YEAR_OPTIONS.map(({ label }) => (
                    <label key={label} className="flex items-center gap-1.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedYears.includes(label)}
                        onChange={() => toggleFilter(setSelectedYears, label)}
                        className="accent-[#8d6a30] cursor-pointer w-3 h-3"
                      />
                      <span className="text-[10px] text-[#70645f] group-hover:text-[#65111f]">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter: Jenis Akses */}
              <div>
                <h3 className="mb-2.5 text-[10.5px] font-bold text-[#6e5b4e]">Status Akses</h3>
                <div className="flex flex-col gap-1.5">
                  {ACCESS_OPTIONS.map((access) => (
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
            </div>
          </aside>

          {/* CATALOG GRID */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[9.5px] text-[#70645f]">
                Menampilkan <strong className="text-[#65111f] font-semibold">{filteredAndSortedWorks.length}</strong> publikasi dosen
              </p>

              <SortDropdown
                value={sortBy}
                options={SORT_OPTIONS}
                onChange={setSortBy}
              />
            </div>

            {currentWorks.length > 0 ? (
              <div className="grid grid-cols-2 gap-5 max-[1100px]:grid-cols-1">
                {currentWorks.map((item) => {
                  const access = accessStyles[item.accessClass as keyof typeof accessStyles]
                  const isSaved = savedWorks.includes(item.id)

                  return (
                    <Link
                      key={item.id}
                      to={`/sgd-corner/detail/${item.id}`} // Halaman detail karya
                      className="
                        group relative flex flex-col rounded-[10px] border border-[#eee3d3] 
                        bg-white p-5 shadow-[0_4px_12px_rgba(80,56,40,.035)] 
                        transition-all duration-300 hover:-translate-y-1 hover:border-[#dfd1c1] hover:shadow-[0_8px_24px_rgba(80,56,40,.07)]
                      "
                    >
                      {/* BUTTON KOLEKSI */}
                      <button
                        type="button"
                        aria-label={isSaved ? `Hapus ${item.title} dari koleksi` : `Simpan ${item.title}`}
                        aria-pressed={isSaved}
                        onClick={(e) => toggleSave(e, item.id)}
                        className={`
                          absolute top-[18px] right-[18px] z-[3] grid h-[32px] w-[32px] place-items-center 
                          rounded-full transition-all duration-200
                          ${isSaved 
                            ? 'bg-[#b27a24] text-white shadow-md' 
                            : 'bg-[#fffaf2] text-[#b27a24] border border-[#eee3d3] hover:bg-[#f3eadc]'
                          }
                        `}
                      >
                        <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
                      </button>

                      {/* METADATA ATAS */}
                      <div className="mb-3 pr-10 flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-semibold ${access.bg} ${access.text}`}>
                          <span className={`h-[5px] w-[5px] rounded-full ${access.dot}`} />
                          {item.access}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-[#e6d3b7] bg-[#fffaf2] px-2.5 py-1 text-[9px] text-[#6d5a48]">
                          <FileText size={10} />
                          {item.type}
                        </span>
                        <span className="inline-block rounded-full bg-[#f4ece1] px-2.5 py-1 text-[9px] font-semibold text-[#6e5b4e]">
                          {item.year}
                        </span>
                      </div>

                      {/* JUDUL & DOSEN */}
                      <h3 className="m-0 mb-2.5 [font-family:'Lora',serif] text-[17px] leading-[1.35] text-[#302724] group-hover:text-[#6f1222] transition-colors line-clamp-2 pr-4">
                        {item.title}
                      </h3>
                      
                      <div className="mb-3 flex items-center gap-2 text-[#8d6a30]">
                        <GraduationCap size={16} />
                        <p className="text-[12px] font-bold m-0">
                          {item.author}
                        </p>
                      </div>

                      {/* ABSTRAK */}
                      <p className="mb-5 text-[11px] leading-[1.6] text-[#766963] line-clamp-3">
                        {item.description}
                      </p>

                      {/* FOOTER KARTU */}
                      <div className="mt-auto pt-4 border-t border-[#f0e8dc] flex items-center justify-between">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[9.5px] font-semibold uppercase tracking-wider text-[#a97938]">
                            {item.faculty}
                          </span>
                          <span className="text-[10px] text-[#766963]">
                            Sumber: {item.source}
                          </span>
                        </div>
                        
                        <div className="grid h-[30px] w-[30px] place-items-center rounded-full bg-[#fbf3e7] text-[#65111f] group-hover:bg-[#65111f] group-hover:text-white transition-colors duration-300">
                          <ChevronRight size={16} />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-[#70645f] text-[10px] bg-white rounded-[7px] border border-[#eadfce]">
                Tidak ada publikasi yang sesuai dengan filter Anda.
              </div>
            )}
            
            {/* PAGINATION: 10 karya per halaman, halaman berikutnya muncul setelahnya */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => goToPage(page)}
                    aria-current={currentPage === page ? 'page' : undefined}
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

                {currentPage < totalPages && (
                  <button
                    type="button"
                    onClick={() => goToPage(currentPage + 1)}
                    className="h-6 px-2 rounded-[3px] border border-[#eadfce] bg-white text-[#70645f] hover:bg-[#fbf3e7] text-[9px]! font-medium! transition-colors"
                  >
                    Selanjutnya
                  </button>
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