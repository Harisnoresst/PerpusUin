import { Link, useNavigate, useParams } from 'react-router-dom'
import { 
  ArrowLeft, 
  BookOpen, 
  Building, 
  Calendar, 
  ExternalLink, 
  FileText, 
  GraduationCap, 
  Hash, 
  MapPin,
  UserRound
} from 'lucide-react'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function DetailSGDCorner() {
  const navigate = useNavigate()
  const { id } = useParams()

  // Mock Data Karya Dosen UIN SGD
  const work = {
    title: "Integrasi Nilai-Nilai Islam dalam Pembelajaran Sains di Era Digital",
    lecturer: "Prof. Dr. H. Ahmad Sunaryo, M.Pd.",
    faculty: "Fakultas Tarbiyah dan Keguruan",
    year: "2023",
    publisher: "Jurnal Pendidikan Islam UIN SGD",
    isbnIssn: "ISSN: 2527-533X",
    type: "Artikel Jurnal",
    language: "Indonesia",
    category: "SGD Corner",
    coverUrl: "/images/books/sgd-corner-dosen.jpg", 
    about: "Karya ilmiah ini mengkaji metode integrasi nilai-nilai keislaman ke dalam kurikulum sains modern. Penulis memaparkan kerangka praktis bagi pendidik untuk menyelaraskan pemahaman ayat-ayat Kauniyah dengan teori sains yang diajarkan di sekolah menengah, sehingga menghasilkan lulusan yang tidak hanya unggul secara akademis tetapi juga memiliki kedalaman spiritual.",
    location: "Lantai 3 - Area SGD Corner (Hardcopy)"
  }

  // Mock Data Akses Jurnal / Digital
  const accessLinks = [
    {
      id: 1,
      platform: "Digital Library UIN SGD",
      description: "Akses Full Text (PDF) untuk Civitas Akademika",
      type: "Repositori Kampus",
      link: "https://digilib.uinsgd.ac.id"
    },
    {
      id: 2,
      platform: "SINTA Kemdikbud",
      description: "Indeks Karya Ilmiah Terakreditasi (Sinta 2)",
      type: "Jurnal Eksternal",
      link: "https://sinta.kemdikbud.go.id"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf2]">
      <Navbar />

      <main className="flex-grow w-full max-w-6xl mx-auto px-6 py-10 md:px-10 md:py-12">
        {/* Breadcrumb & Tombol Kembali */}
        <div className="flex items-center gap-3 mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#eadfce]/40 text-[#721323] hover:bg-[#eadfce] transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="text-[10.5px] text-[#8f7e76] font-medium">
            <Link to="/" className="hover:text-[#721323] transition-colors">Beranda</Link>
            <span className="mx-2">/</span>
            <Link to="/katalog" className="hover:text-[#721323] transition-colors">Katalog</Link>
            <span className="mx-2">/</span>
            <span className="text-[#4d433f]">{work.category}</span>
          </div>
        </div>

        {/* Konten Utama Detail Karya */}
        <div className="flex flex-col md:flex-row gap-10 lg:gap-14">
          
          {/* Kolom Kiri: Cover & Tombol Aksi */}
          <div className="w-full md:w-[280px] shrink-0 flex flex-col gap-5">
            <div className="w-full aspect-[2/3] rounded-[8px] bg-[#eadfce]/30 border border-[#dfd3c4] overflow-hidden shadow-[0_10px_30px_rgba(74,48,35,0.15)] relative">
              <div className="absolute inset-0 flex items-center justify-center text-[#c2b4a7]">
                <FileText size={48} strokeWidth={1} />
              </div>
              <img 
                src={work.coverUrl} 
                alt={`Cover ${work.title}`}
                className="absolute inset-0 w-full h-full object-cover z-10"
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
            </div>

            <div className="flex flex-col gap-2.5">
              <button className="w-full h-10 rounded-[6px] border border-[#721323] bg-transparent text-[#721323] text-[11px] font-semibold transition-all hover:bg-[#721323] hover:text-white">
                Simpan ke Favorit
              </button>
            </div>
          </div>

          {/* Kolom Kanan: Informasi Metadata & Tentang Karya */}
          <div className="flex-1 flex flex-col">
            
            {/* Header Judul */}
            <div className="mb-6">
              <div className="inline-block px-2.5 py-1 mb-3 rounded-full bg-[#f4e8d6] text-[#b18446] text-[9px] font-bold tracking-[0.1em] uppercase">
                Karya Dosen - {work.category}
              </div>
              <h1 className="m-0 mb-3 [font-family:'Lora',serif] text-[28px] md:text-[34px] leading-[1.2] text-[#681220]">
                {work.title}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-[13px] text-[#756a65]">
                <span className="flex items-center gap-1.5 font-semibold text-[#4d433f]">
                  <UserRound size={14} className="text-[#b18446]" /> {work.lecturer}
                </span>
                <span className="hidden sm:inline text-[#dfd3c4]">|</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <GraduationCap size={15} className="text-[#b18446]" /> {work.faculty}
                </span>
              </div>
            </div>

            {/* Grid Metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 p-5 rounded-[8px] border border-[#eadfce] bg-[#fffdf9]">
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-[10px] text-[#9a887f] font-medium"><FileText size={13}/> Jenis Karya</span>
                <span className="text-[11.5px] text-[#3f3733] font-semibold">{work.type}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-[10px] text-[#9a887f] font-medium"><Calendar size={13}/> Tahun Terbit</span>
                <span className="text-[11.5px] text-[#3f3733] font-semibold">{work.year}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-[10px] text-[#9a887f] font-medium"><Building size={13}/> Penerbit/Jurnal</span>
                <span className="text-[11.5px] text-[#3f3733] font-semibold">{work.publisher}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-[10px] text-[#9a887f] font-medium"><Hash size={13}/> ISBN/ISSN</span>
                <span className="text-[11.5px] text-[#3f3733] font-semibold">{work.isbnIssn}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-[10px] text-[#9a887f] font-medium"><MapPin size={13}/> Lokasi Fisik</span>
                <span className="text-[11.5px] text-[#3f3733] font-semibold">{work.location}</span>
              </div>
            </div>

            {/* Tentang Karya */}
            <div className="mb-10">
              <h3 className="text-[14px] font-bold text-[#4d433f] mb-3 flex items-center gap-2 border-b border-[#eadfce] pb-2">
                <BookOpen size={16} className="text-[#b18446]"/> Tentang Karya
              </h3>
              <p className="text-[12px] leading-[1.8] text-[#5f5550] text-justify">
                {work.about}
              </p>
            </div>

            {/* Akses Digital / Jurnal */}
            <div>
              <h3 className="text-[14px] font-bold text-[#4d433f] mb-4 flex items-center gap-2 border-b border-[#eadfce] pb-2">
                <ExternalLink size={16} className="text-[#b18446]"/> Akses Jurnal & Karya Digital
              </h3>
              
              <div className="flex flex-col gap-3">
                {accessLinks.map((link) => (
                  <div key={link.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-[8px] bg-white border border-[#dfd3c4] shadow-sm hover:border-[#b18446] transition-colors">
                    <div className="flex flex-col gap-1">
                      <span className="text-[12px] font-bold text-[#681220]">{link.platform}</span>
                      <span className="text-[10.5px] text-[#756a65]">{link.description}</span>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-[4px] bg-[#f4e8d6] text-[#b18446] text-[9px] font-bold uppercase">
                          {link.type}
                        </span>
                      </div>
                    </div>
                    
                    <a 
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center justify-center gap-1.5 h-9 px-5 rounded-[4px] bg-gradient-to-br from-[#731424] to-[#56101a] text-white! text-[10.5px] font-semibold shadow-[0_3px_10px_rgba(114,19,35,0.15)] hover:from-[#5d0f1c] hover:to-[#420a13] transition-all hover:-translate-y-px"
                    >
                      Buka Tautan <ExternalLink size={13} />
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}