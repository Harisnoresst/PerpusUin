import { Link, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  BookOpen, 
  Building, 
  Calendar, 
  ExternalLink, 
  FileText, 
  Globe, 
  Hash, 
  Library, 
  MapPin, 
  UserRound 
} from 'lucide-react'

import Navbar from '../../components/Navbar' // Sesuaikan path jika perlu
import Footer from '../../components/Footer' // Sesuaikan path jika perlu

export default function DetailBukuSundaIslam() {
  const navigate = useNavigate()

  // Mock Data Buku
  const book = {
    title: "Sejarah dan Budaya Islam di Tatar Sunda",
    author: "Prof. Dr. H. Edi S. Ekadjati",
    year: "2018",
    publisher: "Pustaka Jaya",
    isbn: "978-602-1234-56-7",
    pages: 342,
    language: "Indonesia / Sunda",
    category: "Sunda Islam",
    coverUrl: "/images/books/sunda-islam-cover.jpg", // Ganti dengan path cover asli
    synopsis: "Buku ini mengupas tuntas proses penyebaran dan perkembangan Islam di Tatar Sunda (Jawa Barat). Penulis memaparkan bagaimana nilai-nilai Islam berpadu dengan kearifan lokal budaya Sunda secara harmonis tanpa menghilangkan identitas aslinya. Mulai dari peran para ulama penyebar Islam awal, naskah-naskah kuno keagamaan, hingga transformasi sosial masyarakat Sunda di bawah naungan Islam. Referensi penting bagi peneliti sejarah, budayawan, maupun mahasiswa.",
    status: "Tersedia",
    location: "Lantai 2 - Koleksi Khusus Nusantara"
  }

  // Mock Data Ketersediaan Eksternal (Kampus Lain)
  const externalLibraries = [
    {
      id: 1,
      campus: "UIN Syarif Hidayatullah Jakarta",
      libraryName: "Perpustakaan Utama UIN Jakarta",
      status: "Tersedia (2 Eksemplar)",
      link: "https://perpus.uinjkt.ac.id"
    },
    {
      id: 2,
      campus: "UIN Sunan Kalijaga Yogyakarta",
      libraryName: "UPT Perpustakaan UIN Suka",
      status: "Dipinjam",
      link: "https://lib.uin-suka.ac.id"
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
            <span className="text-[#4d433f]">{book.category}</span>
          </div>
        </div>

        {/* Konten Utama Detail Buku */}
        <div className="flex flex-col md:flex-row gap-10 lg:gap-14">
          
          {/* Kolom Kiri: Cover & Tombol Aksi Utama */}
          <div className="w-full md:w-[280px] shrink-0 flex flex-col gap-5">
            <div className="w-full aspect-[2/3] rounded-[8px] bg-[#eadfce]/30 border border-[#dfd3c4] overflow-hidden shadow-[0_10px_30px_rgba(74,48,35,0.15)] relative">
              {/* Fallback jika gambar tidak ada */}
              <div className="absolute inset-0 flex items-center justify-center text-[#c2b4a7]">
                <BookOpen size={48} strokeWidth={1} />
              </div>
              <img 
                src={book.coverUrl} 
                alt={`Cover ${book.title}`}
                className="absolute inset-0 w-full h-full object-cover z-10"
                onError={(e) => e.currentTarget.style.display = 'none'} // Sembunyikan jika error, tampilkan fallback
              />
            </div>

            <div className="flex flex-col gap-2.5">
              <button className="w-full h-10 rounded-[6px] bg-[#721323] text-white text-[11px] font-semibold transition-all hover:bg-[#5d0f1c] shadow-[0_4px_12px_rgba(114,19,35,0.2)]">
                Pinjam Buku Ini
              </button>
              <button className="w-full h-10 rounded-[6px] border border-[#721323] bg-transparent text-[#721323] text-[11px] font-semibold transition-all hover:bg-[#721323] hover:text-white">
                Tambahkan ke Favorit
              </button>
            </div>
          </div>

          {/* Kolom Kanan: Informasi Detail */}
          <div className="flex-1 flex flex-col">
            
            {/* Header Judul */}
            <div className="mb-6">
              <div className="inline-block px-2.5 py-1 mb-3 rounded-full bg-[#f4e8d6] text-[#b18446] text-[9px] font-bold tracking-[0.1em] uppercase">
                {book.category}
              </div>
              <h1 className="m-0 mb-3 [font-family:'Lora',serif] text-[28px] md:text-[34px] leading-[1.2] text-[#681220]">
                {book.title}
              </h1>
              <p className="text-[13px] text-[#756a65] flex items-center gap-1.5">
                Oleh <span className="font-semibold text-[#4d433f]">{book.author}</span>
              </p>
            </div>

            {/* Grid Metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 p-5 rounded-[8px] border border-[#eadfce] bg-[#fffdf9]">
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-[10px] text-[#9a887f] font-medium"><Calendar size={13}/> Tahun Terbit</span>
                <span className="text-[11.5px] text-[#3f3733] font-semibold">{book.year}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-[10px] text-[#9a887f] font-medium"><Building size={13}/> Penerbit</span>
                <span className="text-[11.5px] text-[#3f3733] font-semibold">{book.publisher}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-[10px] text-[#9a887f] font-medium"><Hash size={13}/> ISBN</span>
                <span className="text-[11.5px] text-[#3f3733] font-semibold">{book.isbn}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-[10px] text-[#9a887f] font-medium"><FileText size={13}/> Halaman</span>
                <span className="text-[11.5px] text-[#3f3733] font-semibold">{book.pages} hlm</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-[10px] text-[#9a887f] font-medium"><Globe size={13}/> Bahasa</span>
                <span className="text-[11.5px] text-[#3f3733] font-semibold">{book.language}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-[10px] text-[#9a887f] font-medium"><MapPin size={13}/> Lokasi Fisik</span>
                <span className="text-[11.5px] text-[#3f3733] font-semibold">{book.location}</span>
              </div>
            </div>

            {/* Sinopsis */}
            <div className="mb-10">
              <h3 className="text-[14px] font-bold text-[#4d433f] mb-3 flex items-center gap-2 border-b border-[#eadfce] pb-2">
                <BookOpen size={16} className="text-[#b18446]"/> Sinopsis
              </h3>
              <p className="text-[12px] leading-[1.8] text-[#5f5550] text-justify">
                {book.synopsis}
              </p>
            </div>

            {/* Ketersediaan Eksternal (Kampus Lain) */}
            <div>
              <h3 className="text-[14px] font-bold text-[#4d433f] mb-4 flex items-center gap-2 border-b border-[#eadfce] pb-2">
                <Library size={16} className="text-[#b18446]"/> Tersedia di Kampus Lain (Jaringan SSO)
              </h3>
              
              <div className="flex flex-col gap-3">
                {externalLibraries.map((lib) => (
                  <div key={lib.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-[8px] bg-white border border-[#dfd3c4] shadow-sm hover:border-[#b18446] transition-colors">
                    <div className="flex flex-col gap-1">
                      <span className="text-[12px] font-bold text-[#681220]">{lib.campus}</span>
                      <span className="text-[10.5px] text-[#756a65]">{lib.libraryName}</span>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4caf50]"></span>
                        <span className="text-[10px] text-[#4d433f] font-medium">{lib.status}</span>
                      </div>
                    </div>
                    
                    <a 
                      href={lib.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center justify-center gap-1.5 h-8 px-4 rounded-[4px] bg-[#fbf3e7] text-[#721323] text-[10px] font-bold border border-[#eadfce] hover:bg-[#eadfce] hover:text-[#5d0f1c] transition-colors"
                    >
                      Lihat Buku <ExternalLink size={12} />
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