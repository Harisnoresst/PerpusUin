import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Bookmark,
  BookmarkMinus,
  BookOpen,
  Building2,
  Check,
  FileText,
  UsersRound
} from 'lucide-react'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useAuth } from '../../Context/AuthContext'

const sundaCollections = [
  {
    id: 'book-1',
    title: 'Sejarah Islam di Tatar Sunda',
    author: 'A. Hasan Muarif',
    source: 'Repository UIN',
    access: 'Open Access',
    accessClass: 'open',
    cover: '/images/landing/book-1.svg'
  },
  {
    id: 'book-2',
    title: 'Budaya Sunda dalam Perspektif Islam',
    author: 'R. Rachmat',
    source: 'Otomasi UIN',
    access: 'Akses Lokal',
    accessClass: 'local',
    cover: '/images/landing/book-2.svg'
  },
  {
    id: 'book-3',
    title: 'Naskah Kuno Sunda-Islam',
    author: 'Tim Peneliti',
    source: 'Digitalisasi',
    access: 'Akses Lokal',
    accessClass: 'local',
    cover: '/images/landing/book-3.svg'
  },
  {
    id: 'book-4',
    title: 'Islam dan Kearifan Lokal Nusantara',
    author: 'Nurcholish Madjid',
    source: 'E-book UIN',
    access: 'Open Access',
    accessClass: 'open',
    cover: '/images/landing/book-4.svg'
  },
  {
    id: 'book-5',
    title: 'The History of Islam in Southeast Asia',
    author: 'Anthony Reid',
    source: 'Universitas Indonesia',
    access: 'Request Access',
    accessClass: 'request',
    cover: '/images/landing/book-5.svg'
  },
  {
    id: 'book-6',
    title: 'Islam Nusantara dalam Literatur Klasik',
    author: 'Martin van Bruinessen',
    source: 'Leiden University',
    access: 'Open Access',
    accessClass: 'open',
    cover: '/images/landing/book-6.svg'
  }
]

const lecturerWorks = [
  {
    id: 'work-1',
    title: 'Knowledge Management in Islamic Higher Education',
    author: 'Dr. Ahmad Fauzi, M.T.',
    faculty: 'Fakultas Sains dan Teknologi',
    type: 'Artikel Jurnal',
    year: '2025',
    source: 'Repository UIN',
    access: 'Open Access',
    accessClass: 'open',
    cover: '/images/landing/work-1.svg'
  },
  {
    id: 'work-2',
    title: 'Pengembangan Model Pembelajaran Berbasis AI',
    author: 'Dr. Siti Nurjanah, M.Pd.',
    faculty: 'Fakultas Tarbiyah dan Keguruan',
    type: 'Prosiding',
    year: '2024',
    source: 'E-book UIN',
    access: 'Open Access',
    accessClass: 'open',
    cover: '/images/landing/work-2.svg'
  },
  {
    id: 'work-3',
    title: 'Digital Preservation of Islamic Manuscripts',
    author: 'Dr. Muhammad Rizal, M.A.',
    faculty: 'Fakultas Ushuluddin',
    type: 'Buku',
    year: '2024',
    source: 'Otomasi UIN',
    access: 'Akses Lokal',
    accessClass: 'local',
    cover: '/images/landing/work-3.svg'
  },
  {
    id: 'work-4',
    title: 'Pengaruh Literasi Digital terhadap Minat Baca Mahasiswa',
    author: 'Dr. Laila Rahma, M.I.Kom.',
    faculty: 'Fakultas Dakwah dan Komunikasi',
    type: 'Artikel Jurnal',
    year: '2025',
    source: 'DOAJ',
    access: 'Open Access',
    accessClass: 'open',
    cover: '/images/landing/work-4.svg'
  }
]

const accessStyles = {
  open: {
    text: 'text-[#1b7448]',
    dot: 'bg-[#22a06b]'
  },
  local: {
    text: 'text-[#275f96]',
    dot: 'bg-[#2f7dd3]'
  },
  request: {
    text: 'text-[#a44751]',
    dot: 'bg-[#e95d6a]'
  }
}

// Tombol simpan: berubah warna & terisi saat sudah disimpan
const bookmarkClass = (saved: boolean) =>
  `absolute top-[11px] right-[10px] z-[3] grid h-7 w-7 cursor-pointer place-items-center rounded-full border-0 p-0 transition-all duration-200 ${
    saved
      ? 'bg-[#f8eccf] text-[#8d6a30] shadow-[0_2px_6px_rgba(141,106,48,.25)]'
      : 'bg-transparent text-[#b27a24] hover:bg-[#fbf3e7]'
  }`

type ToastState = {
  text: string
  tone: 'saved' | 'removed'
}

export default function LandingPage() {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  const [savedIds, setSavedIds] = useState<string[]>([])
  const [toast, setToast] = useState<ToastState>({ text: '', tone: 'saved' })
  const [toastVisible, setToastVisible] = useState(false)
  const toastTimer = useRef<number | null>(null)

  // Bersihkan timer saat halaman ditinggalkan
  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current)
    }
  }, [])

  // Guest selalu diarahkan ke halaman login
  const target = (path: string) => (isLoggedIn ? path : '/login')

  const showToast = (text: string, tone: ToastState['tone']) => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current)

    setToast({ text, tone })
    setToastVisible(true)

    toastTimer.current = window.setTimeout(() => setToastVisible(false), 2200)
  }

  const toggleSave = (id: string) => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }

    const alreadySaved = savedIds.includes(id)

    setSavedIds((prev) =>
      alreadySaved ? prev.filter((savedId) => savedId !== id) : [...prev, id]
    )

    showToast(
      alreadySaved
        ? 'Dihapus dari Koleksi Tersimpan'
        : 'Berhasil disimpan ke Koleksi Tersimpan',
      alreadySaved ? 'removed' : 'saved'
    )
  }

  const scrollToCorners = (
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault()

    if (!isLoggedIn) {
      navigate('/login')
      return
    }

    document
      .getElementById('corner-section')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
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

      <main className="bg-[#fffdf8]">
        {/* HERO */}
        <section className="
          grid h-[370px] min-h-[370px] grid-cols-[42%_58%]
          items-stretch overflow-hidden border-b border-[#eadfce]
          bg-[#fbf3e7]
          max-[760px]:h-auto max-[760px]:min-h-0 max-[760px]:grid-cols-1
        ">
          <div className="
            relative z-[2] flex flex-col items-start justify-center
            pt-7 pr-[30px] pb-[26px] pl-[4.2vw]
            max-[760px]:px-[6%] max-[760px]:py-11
          ">
            <p className="
              mb-[10px] text-[10px] font-bold tracking-[0.22em]
              text-[#ae8147]
            ">
              AKSES ILMU, MERAWAT WARISAN
            </p>

            <h1 className="
              m-0 [font-family:'Lora',serif] text-[clamp(34px,3.2vw,48px)]
              leading-[1.04] tracking-[-0.03em] text-[#6f1222]
              max-[620px]:text-[42px]
            ">
              Portal Layanan
              <br />
              Koleksi Khusus
            </h1>

            <p className="
              mt-[14px] mb-[18px] min-h-[86px] max-w-[540px]
              text-[13px] leading-[1.65] text-[#514641]
            ">
              Jelajahi koleksi khusus dan sumber daya akademik
              Perpustakaan UIN Sunan Gunung Djati Bandung untuk
              mendukung riset, pembelajaran, dan pelestarian
              khazanah keilmuan.
            </p>

            <a
              href={isLoggedIn ? '#corner-section' : '/login'}
              onClick={scrollToCorners}
              className="
                inline-flex min-h-[40px] w-fit items-center justify-center gap-[10px]
                rounded-[7px]
                bg-[rgb(114,19,35)]
                px-[17px]
                text-[11px] font-semibold
                !text-white
                shadow-[0_7px_16px_rgba(80,17,29,0.14)]
                transition-all duration-200
                hover:bg-[rgb(94,15,28)]
                hover:!text-white
                hover:-translate-y-px
              "
            >
              Mulai Jelajahi
              <ArrowRight size={17} />
            </a>

            <div className="
              mt-[22px] flex items-center gap-[11px]
              [font-family:'Lora',serif] text-[10px] tracking-[0.16em]
              text-[#72625a]
            ">
              <span className="h-px w-[38px] bg-[#c18f47]" />

              ILMU&nbsp;&nbsp;·&nbsp;&nbsp;IMAN&nbsp;&nbsp;·&nbsp;&nbsp;PERADABAN
            </div>
          </div>

          <div className="
            relative h-[370px] min-h-[370px] overflow-hidden
            max-[760px]:h-[280px] max-[760px]:min-h-[280px]
          ">
            <img
              src="/images/landing/hero.png"
              alt="Ruang Perpustakaan UIN Sunan Gunung Djati Bandung"
              className="
                block h-full w-full object-cover
                object-[center_38%]
              "
            />

            <div
              className="
                pointer-events-none absolute inset-0 z-[1]
                bg-[linear-gradient(90deg,#fbf3e7_0%,rgba(251,243,231,.98)_5%,rgba(251,243,231,.90)_12%,rgba(251,243,231,.74)_20%,rgba(251,243,231,.54)_29%,rgba(251,243,231,.34)_38%,rgba(251,243,231,.18)_47%,rgba(251,243,231,.07)_56%,transparent_68%),linear-gradient(180deg,transparent_74%,rgba(251,243,231,.18)_88%,rgba(251,243,231,.42)_100%)]
              "
            />

            <div className="
              absolute right-[6%] bottom-6 z-[3]
              w-[min(340px,82%)] rounded-[9px]
              border border-[rgba(255,255,255,.42)]
              bg-[rgba(255,250,242,.90)]
              px-[18px] py-[15px]
              shadow-[0_10px_28px_rgba(65,42,30,.08)]
              backdrop-blur-[5px]
              max-[700px]:right-[5%]
              max-[700px]:bottom-[18px]
              max-[700px]:w-[90%]
              max-[700px]:px-[15px]
              max-[700px]:py-[13px]
            ">
              <span className="
                mb-[6px] block text-[8px] font-bold
                tracking-[0.16em] text-[#a97938]
              ">
                PERPUSTAKAAN UIN SUNAN GUNUNG DJATI
              </span>

              <strong className="
                block [font-family:'Lora',serif] text-[12px]
                font-semibold leading-[1.45] text-[#5e1722]
                max-[700px]:text-[11px]
              ">
                “Perpustakaan adalah jembatan antara masa lalu,
                masa kini, dan masa depan.”
              </strong>
            </div>
          </div>
        </section>

        {/* TWO CORNERS */}
        <section
          id="corner-section"
          className="
            mx-auto grid w-[min(1320px,90%)]
            scroll-mt-[82px] grid-cols-2 gap-4
            pt-[18px] pb-[22px]
            max-[700px]:grid-cols-1
          "
        >
          {/* Seluruh kartu bisa diklik; guest diarahkan ke /login */}
          <Link
            to={target('/sunda-islam')}
            aria-label="Masuk Sunda Islam Corner"
            className="
              group grid min-h-[118px] grid-cols-[142px_1fr]
              overflow-hidden rounded-[11px]
              border border-[#eadfce] bg-white
              shadow-[0_6px_18px_rgba(79,57,44,.045)]
              transition-all duration-200
              hover:-translate-y-0.5 hover:border-[#dfd1c1]
              hover:shadow-[0_10px_24px_rgba(79,57,44,.08)]
              max-[760px]:grid-cols-[160px_1fr]
              max-[620px]:block
            "
          >
            <div className="
              min-h-[118px]
              max-[620px]:h-[170px]
            ">
              <img
                src="/images/landing/si-corner.jpg"
                alt="Sunda Islam Corner"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="
              relative grid grid-cols-[32px_1fr_28px]
              items-center gap-[9px]
              px-[14px] py-[13px]
              max-[620px]:grid-cols-[40px_1fr_34px]
            ">
              <div className="
                grid h-8 w-8 place-items-center
                rounded-full bg-[#8d6a30] text-white
              ">
                <BookOpen size={23} />
              </div>

              <div>
                <h2 className="
                  m-0 mb-[6px] [font-family:'Lora',serif]
                  text-[15px] text-[#65111f]
                ">
                  Sunda Islam Corner
                </h2>

                <p className="
                  max-w-[460px] text-[10.5px]
                  leading-[1.55] text-[#5f5550]
                ">
                  Koleksi tentang Sunda, Islam, budaya, dan sejarah
                  dalam berbagai format untuk memperkaya wawasan dan riset Anda.
                </p>

                <div className="mt-3 flex flex-wrap gap-[6px]">
                  {[
                    'Budaya Sunda',
                    'Islam Nusantara',
                    'Sejarah',
                    'Naskah Kuno'
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="
                        rounded-full border border-[#e6d3b7]
                        bg-[#fffaf2] px-2 py-1
                        text-[9px] text-[#6d5a48]
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div
                aria-hidden="true"
                className="
                  grid h-[34px] w-[34px] place-items-center
                  rounded-full border border-[#e0cda9]
                  bg-[#f8eccf] text-[#7b541f]
                  transition-[transform,background] duration-200
                  group-hover:translate-x-0.5 group-hover:bg-[#f1ddb7]
                "
              >
                <ArrowRight size={18} />
              </div>
            </div>
          </Link>

          <Link
            to={target('/sgd-corner')}
            aria-label="Masuk Sunan Gunung Djati Corner"
            className="
              group grid min-h-[118px] grid-cols-[142px_1fr]
              overflow-hidden rounded-[11px]
              border border-[#eadfce] bg-white
              shadow-[0_6px_18px_rgba(79,57,44,.045)]
              transition-all duration-200
              hover:-translate-y-0.5 hover:border-[#dfd1c1]
              hover:shadow-[0_10px_24px_rgba(79,57,44,.08)]
              max-[760px]:grid-cols-[160px_1fr]
              max-[620px]:block
            "
          >
            <div className="
              min-h-[118px]
              max-[620px]:h-[170px]
            ">
              <img
                src="/images/landing/sgd-corner.jpg"
                alt="Sunan Gunung Djati Corner"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="
              relative grid grid-cols-[32px_1fr_28px]
              items-center gap-[9px]
              px-[14px] py-[13px]
              max-[620px]:grid-cols-[40px_1fr_34px]
            ">
              <div className="
                grid h-8 w-8 place-items-center
                rounded-full bg-[#8d6a30] text-white
              ">
                <UsersRound size={23} />
              </div>

              <div>
                <h2 className="
                  m-0 mb-[6px] [font-family:'Lora',serif]
                  text-[15px] text-[#65111f]
                ">
                  Sunan Gunung Djati Corner
                </h2>

                <p className="
                  max-w-[460px] text-[10.5px]
                  leading-[1.55] text-[#5f5550]
                ">
                  Koleksi karya dosen, publikasi ilmiah, profil fakultas,
                  dan direktori akademik UIN Sunan Gunung Djati Bandung.
                </p>

                <div className="mt-3 flex flex-wrap gap-[6px]">
                  {[
                    'Karya Dosen',
                    'Publikasi',
                    'Fakultas',
                    'Direktori Akademik'
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="
                        rounded-full border border-[#e6d3b7]
                        bg-[#fffaf2] px-2 py-1
                        text-[9px] text-[#6d5a48]
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div
                aria-hidden="true"
                className="
                  grid h-[34px] w-[34px] place-items-center
                  rounded-full border border-[#e0cda9]
                  bg-[#f8eccf] text-[#7b541f]
                  transition-[transform,background] duration-200
                  group-hover:translate-x-0.5 group-hover:bg-[#f1ddb7]
                "
              >
                <ArrowRight size={18} />
              </div>
            </div>
          </Link>
        </section>

        {/* KOLEKSI PILIHAN */}
        <section className="
          mx-auto w-[min(1450px,92%)]
          pt-3 pb-6
        ">
          <div className="
            mb-[14px] flex items-end
            justify-between gap-6
            max-[620px]:flex-col
            max-[620px]:items-start
          ">
            <div>
              <h2 className="
                m-0 [font-family:'Lora',serif] text-[20px] text-[#69121f]
                after:ml-3 after:inline-block after:h-px
                after:w-7 after:align-middle after:bg-[#bb8540]
                after:content-['']
              ">
                Koleksi Pilihan Sunda Islam
              </h2>

              <p className="
                mt-[5px] mb-0 text-[11px]
                leading-[1.55] text-[#70645f]
              ">
                Jelajahi koleksi pilihan tentang Sunda, Islam, budaya, dan sejarah.
              </p>
            </div>

            <Link
              to={target('/sunda-islam')}  
              className="
                inline-flex items-center gap-[7px]
                whitespace-nowrap text-[10px]
                font-semibold text-[#6e1421]
              "
            >
              Lihat Semua Koleksi
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="
            grid grid-cols-6 gap-[10px]
            max-[900px]:grid-cols-3
            max-[620px]:grid-cols-1
          ">
            {sundaCollections.map((item) => {
              const access =
                accessStyles[
                  item.accessClass as keyof typeof accessStyles
                ]
              const isSaved = savedIds.includes(item.id)

              return (
                <article
                  key={item.id}
                  className="
                    relative min-h-[300px]
                    rounded-lg border border-[#eee3d3]
                    bg-white p-[10px]
                    shadow-[0_4px_12px_rgba(80,56,40,.035)]
                    max-[620px]:min-h-0
                  "
                >
                  <button
                    type="button"
                    aria-label={isSaved ? `Hapus ${item.title} dari koleksi` : `Simpan ${item.title}`}
                    aria-pressed={isSaved}
                    onClick={() => toggleSave(item.id)}
                    className={bookmarkClass(isSaved)}
                  >
                    <Bookmark size={17} fill={isSaved ? 'currentColor' : 'none'} />
                  </button>

                  <img
                    src={item.cover}
                    alt={`Cover ${item.title}`}
                    className="
                      mb-[10px] h-[126px] w-[86px]
                      rounded-[3px] object-cover
                      shadow-[0_4px_10px_rgba(55,38,27,.14)]
                    "
                  />

                  <h3 className="
                    m-0 mb-[5px] [font-family:'Lora',serif]
                    text-[12px] leading-[1.35]
                    text-[#302724]
                  ">
                    {item.title}
                  </h3>

                  <p className="
                    mb-[5px] text-[9px]
                    leading-[1.4] text-[#766963]
                  ">
                    {item.author}
                  </p>

                  <span className="
                    mt-[7px] inline-block
                    rounded-full bg-[#f3eadc]
                    px-2 py-[5px]
                    text-[9px] text-[#6e5b4e]
                  ">
                    {item.source}
                  </span>

                  <div className={`
                    mt-[7px] flex items-center gap-[6px]
                    text-[9px] font-semibold
                    ${access.text}
                  `}>
                    <span
                      className={`h-[7px] w-[7px] rounded-full ${access.dot}`}
                    />
                    {item.access}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* KARYA DOSEN */}
        <section className="
          mx-auto w-[min(1600px,96%)]
          pt-[6px] pb-6
        ">
          <div className="
            mb-[14px] flex items-end
            justify-between gap-6
            max-[620px]:flex-col
            max-[620px]:items-start
          ">
            <div>
              <h2 className="
                m-0 [font-family:'Lora',serif] text-[20px] text-[#69121f]
                after:ml-3 after:inline-block after:h-px
                after:w-7 after:align-middle after:bg-[#bb8540]
                after:content-['']
              ">
                Karya Dosen Terbaru
              </h2>

              <p className="
                mt-[5px] mb-0 text-[11px]
                leading-[1.55] text-[#70645f]
              ">
                Temukan publikasi dan karya terbaru dosen UIN Sunan Gunung Djati Bandung.
              </p>
            </div>

            <Link
              to={target('/sgd-corner')}
              className="
                inline-flex items-center gap-[7px]
                whitespace-nowrap text-[10px]
                font-semibold text-[#6e1421]
              "
            >
              Lihat Semua Karya
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="
            grid grid-cols-4 gap-[10px]
            max-[900px]:grid-cols-2
            max-[620px]:grid-cols-1
          ">
            {lecturerWorks.map((item) => {
              const access =
                accessStyles[
                  item.accessClass as keyof typeof accessStyles
                ]
              const isSaved = savedIds.includes(item.id)

              return (
                <article
                  key={item.id}
                  className="
                    relative grid min-h-[190px]
                    grid-cols-[64px_1fr] gap-[14px]
                    rounded-lg border border-[#eee3d3]
                    bg-white p-[14px]
                    shadow-[0_4px_12px_rgba(80,56,40,.035)]
                  "
                >
                  <button
                    type="button"
                    aria-label={isSaved ? `Hapus ${item.title} dari koleksi` : `Simpan ${item.title}`}
                    aria-pressed={isSaved}
                    onClick={() => toggleSave(item.id)}
                    className={bookmarkClass(isSaved)}
                  >
                    <Bookmark size={17} fill={isSaved ? 'currentColor' : 'none'} />
                  </button>

                  <img
                    src={item.cover}
                    alt={`Cover ${item.title}`}
                    className="
                      h-[94px] w-16
                      rounded-[3px] object-cover
                    "
                  />

                  <div className="min-w-0 pr-[18px]">
                    <h3 className="
                      m-0 mb-[5px] [font-family:'Lora',serif]
                      text-[12px] leading-[1.35]
                      text-[#302724]
                    ">
                      {item.title}
                    </h3>

                    <p className="
                      mb-[5px] text-[9px]
                      leading-[1.4] text-[#766963]
                    ">
                      {item.author}
                    </p>

                    <p className="
                      mb-[5px] text-[9px]
                      leading-[1.4] text-[#766963]
                    ">
                      {item.faculty}
                    </p>

                    <div className="
                      mt-[7px] flex flex-wrap gap-[6px]
                    ">
                      <span className="
                        rounded-full border border-[#dfd1c1]
                        px-2 py-1 text-[9px] text-[#66564b]
                      ">
                        {item.type}
                      </span>

                      <span className="
                        rounded-full border border-[#dfd1c1]
                        px-2 py-1 text-[9px] text-[#66564b]
                      ">
                        {item.year}
                      </span>
                    </div>

                    <span className="
                      mt-[7px] inline-block
                      rounded-full bg-[#f3eadc]
                      px-2 py-[5px]
                      text-[9px] text-[#6e5b4e]
                    ">
                      {item.source}
                    </span>

                    <div className={`
                      mt-[7px] flex items-center gap-[6px]
                      text-[9px] font-semibold
                      ${access.text}
                    `}>
                      <span
                        className={`h-[7px] w-[7px] rounded-full ${access.dot}`}
                      />
                      {item.access}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* STATS */}
        <section className="
          mt-[6px] border-t border-[#eadfce]
          bg-[radial-gradient(circle_at_8%_50%,rgba(185,139,75,.08),transparent_20%),radial-gradient(circle_at_92%_50%,rgba(185,139,75,.08),transparent_20%),#fbf8f2]
          px-[6%] pt-6 pb-7
        ">
          <div className="text-center">
            <h2 className="
              m-0 [font-family:'Lora',serif]
              text-[19px] text-[#64111e]
            ">
              Perpustakaan dalam Angka
            </h2>

            <p className="
              mx-auto mt-[7px] mb-5
              max-w-[620px]
              text-[11px] leading-[1.55]
              text-[#6e625d]
            ">
              Koleksi, karya, dan sumber daya yang terus berkembang untuk
              mendukung sivitas akademika UIN Sunan Gunung Djati Bandung.
            </p>
          </div>

          <div className="
            mx-auto grid w-[min(900px,90%)]
            grid-cols-4
            max-[760px]:grid-cols-2
            max-[620px]:grid-cols-1
          ">
            <div className="
              flex min-h-[72px] items-center
              justify-center gap-[13px]
              border-r border-[#dccdb9]
              max-[620px]:border-r-0
              max-[620px]:border-b
            ">
              <div className="
                grid h-12 w-12 place-items-center
                rounded-full bg-[#f0dfbe]
                text-[#7e571d]
              ">
                <FileText size={24} />
              </div>

              <div>
                <strong className="
                  block [font-family:'Lora',serif]
                  text-[20px] text-[#68111e]
                ">
                  1.245
                </strong>

                <span className="
                  mt-0.5 block
                  text-[10px] text-[#6f625c]
                ">
                  Karya Dosen
                </span>
              </div>
            </div>

            <div className="
              flex min-h-[72px] items-center
              justify-center gap-[13px]
              border-r border-[#dccdb9]
              max-[760px]:border-r-0
              max-[760px]:border-b
              max-[620px]:border-b
            ">
              <div className="
                grid h-12 w-12 place-items-center
                rounded-full bg-[#f0dfbe]
                text-[#7e571d]
              ">
                <UsersRound size={24} />
              </div>

              <div>
                <strong className="
                  block [font-family:'Lora',serif]
                  text-[20px] text-[#68111e]
                ">
                  320
                </strong>

                <span className="
                  mt-0.5 block
                  text-[10px] text-[#6f625c]
                ">
                  Dosen
                </span>
              </div>
            </div>

            <div className="
              flex min-h-[72px] items-center
              justify-center gap-[13px]
              border-r border-[#dccdb9]
              max-[620px]:border-r-0
              max-[620px]:border-b
            ">
              <div className="
                grid h-12 w-12 place-items-center
                rounded-full bg-[#f0dfbe]
                text-[#7e571d]
              ">
                <Building2 size={24} />
              </div>

              <div>
                <strong className="
                  block [font-family:'Lora',serif]
                  text-[20px] text-[#68111e]
                ">
                  8
                </strong>

                <span className="
                  mt-0.5 block
                  text-[10px] text-[#6f625c]
                ">
                  Fakultas
                </span>
              </div>
            </div>

            <div className="
              flex min-h-[72px] items-center
              justify-center gap-[13px]
              max-[620px]:border-b-0
            ">
              <div className="
                grid h-12 w-12 place-items-center
                rounded-full bg-[#f0dfbe]
                text-[#7e571d]
              ">
                <BookOpen size={24} />
              </div>

              <div>
                <strong className="
                  block [font-family:'Lora',serif]
                  text-[20px] text-[#68111e]
                ">
                  560
                </strong>

                <span className="
                  mt-0.5 block
                  text-[10px] text-[#6f625c]
                ">
                  Publikasi
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}