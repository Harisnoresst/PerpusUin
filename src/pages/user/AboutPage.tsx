import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  Landmark,
  UsersRound
} from 'lucide-react'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function AboutPage() {
  const scrollToServices = (
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault()

    document
      .getElementById('layanan-utama')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
  }

  return (
    <>
      <Navbar />

      <main className="bg-[#fffdf8]">
        {/* HERO — class identik dengan hero LandingPage, hanya teks yang berbeda */}
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
              TENTANG PORTAL
            </p>

            <h1 className="
              m-0 [font-family:'Lora',serif] text-[clamp(34px,3.2vw,48px)]
              leading-[1.04] tracking-[-0.03em] text-[#6f1222]
              max-[620px]:text-[42px]
            ">
              Satu Portal untuk
              <br />
              Koleksi Khusus UIN.
            </h1>

            <p className="
              mt-[14px] mb-[18px] min-h-[86px] max-w-[540px]
              text-[13px] leading-[1.65] text-[#514641]
            ">
              Corner UIN merupakan portal layanan koleksi khusus
              Perpustakaan UIN Sunan Gunung Djati Bandung yang
              menghadirkan koleksi tematik Sunda dan Islam serta karya
              akademik dosen dalam satu ruang akses yang lebih terarah
              dan mudah dijelajahi.
            </p>

            <a
              href="#layanan-utama"
              onClick={scrollToServices}
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
              Kenali Layanan
              <ArrowRight size={17} />
            </a>

            {/* Baris "ILMU · IMAN · PERADABAN" disembunyikan, tapi ruangnya dipertahankan
                (invisible) supaya posisi teks di atasnya tidak bergeser dari LandingPage */}
            <div
              aria-hidden="true"
              className="
                invisible mt-[22px] flex items-center gap-[11px]
                [font-family:'Lora',serif] text-[10px] tracking-[0.16em]
                text-[#72625a]
              "
            >
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
              alt="Perpustakaan UIN Sunan Gunung Djati Bandung"
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
                Menghubungkan koleksi, karya, dan pengetahuan
                dalam satu layanan.
              </strong>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section
          className="
            mx-auto grid w-[min(1180px,90%)]
            grid-cols-[0.9fr_1.1fr] items-start
            gap-11 pt-9 pb-[34px]
            max-[950px]:grid-cols-1 max-[950px]:gap-[25px]
          "
        >
          <div>
            <p
              className="
                mb-2 text-[10px] font-bold tracking-[0.22em]
                text-[#ae8147]
              "
            >
              TENTANG CORNER UIN
            </p>

            <h2
              className="
                m-0 max-w-[390px] font-['Lora']
                text-[22px] leading-[1.28] text-[#681220]
              "
            >
              Dirancang untuk mendukung
              pembelajaran dan riset.
            </h2>
          </div>

          <div
            className="
              grid grid-cols-2 gap-6
              max-[700px]:grid-cols-1
            "
          >
            <p
              className="
                m-0 text-[10.5px] leading-[1.72]
                text-[#665b56]
              "
            >
              Portal ini membantu pengguna menemukan koleksi khusus
              dan karya akademik dengan alur yang lebih sederhana,
              tanpa menghilangkan identitas sumber koleksi yang digunakan.
            </p>

            <p
              className="
                m-0 text-[10.5px] leading-[1.72]
                text-[#665b56]
              "
            >
              Melalui dua layanan utama, pengguna dapat mengeksplorasi
              khazanah Sunda-Islam serta karya dosen UIN Sunan Gunung
              Djati Bandung sesuai kebutuhan pembelajaran, penelitian,
              dan referensi akademik.
            </p>
          </div>
        </section>

        {/* SERVICES */}
        <section
          id="layanan-utama"
          className="
            scroll-mt-[82px] border-y border-[#eadfce]
            bg-[#fbf8f2] pt-[34px] pr-[5%] pb-[38px] pl-[5%]
          "
        >
          <div
            className="
              mx-auto mb-[22px] max-w-[720px]
              text-center
            "
          >
            <p
              className="
                mb-2 text-[10px] font-bold tracking-[0.22em]
                text-[#ae8147]
              "
            >
              LAYANAN UTAMA
            </p>

            <h2
              className="
                m-0 font-['Lora'] text-[23px]
                leading-[1.28] text-[#681220]
              "
            >
              Dua corner dengan fokus yang berbeda.
            </h2>

            <p
              className="
                mx-auto mt-[7px] mb-0 max-w-[620px]
                text-[10px] leading-[1.55] text-[#70645f]
              "
            >
              Keduanya berada dalam satu portal, namun masing-masing
              memiliki karakter koleksi dan tujuan eksplorasi yang berbeda.
            </p>
          </div>

          <div
            className="
              mx-auto grid w-[min(1180px,100%)]
              grid-cols-2 gap-[18px]
              max-[700px]:grid-cols-1
            "
          >
            <article
              className="
                min-h-[205px] rounded-[11px]
                border border-[#e8dccb]
                bg-white py-[22px] px-6
                shadow-[0_7px_22px_rgba(70,47,34,.04)]
              "
            >
              <div
                className="
                  mb-[14px] grid h-[42px] w-[42px]
                  place-items-center rounded-full
                  bg-[#8d6a30] text-white
                "
              >
                <BookOpen size={24} />
              </div>

              <span
                className="
                  mb-[6px] block text-[8px] font-bold
                  tracking-[0.18em] text-[#a17438]
                "
              >
                KOLEKSI TEMATIK
              </span>

              <h3
                className="
                  mt-0 mb-2 font-['Lora']
                  text-[17px] leading-[1.3] text-[#65111f]
                "
              >
                Sunda Islam Corner
              </h3>

              <p
                className="
                  m-0 max-w-[500px]
                  text-[10px] leading-[1.62]
                  text-[#655a55]
                "
              >
                Menampilkan koleksi tentang Sunda, Islam, budaya,
                sejarah, naskah, dan khazanah lokal untuk mendukung
                eksplorasi pengetahuan dan penelitian.
              </p>

              <Link
                to="/sunda-islam"
                className="
                  mt-[14px] inline-flex items-center gap-[7px]
                  text-[10px] font-bold text-[#701321]
                "
              >
                Jelajahi Sunda Islam Corner
                <ArrowRight size={14} />
              </Link>
            </article>

            <article
              className="
                min-h-[205px] rounded-[11px]
                border border-[#e8dccb]
                bg-white py-[22px] px-6
                shadow-[0_7px_22px_rgba(70,47,34,.04)]
              "
            >
              <div
                className="
                  mb-[14px] grid h-[42px] w-[42px]
                  place-items-center rounded-full
                  bg-[#8d6a30] text-white
                "
              >
                <UsersRound size={24} />
              </div>

              <span
                className="
                  mb-[6px] block text-[8px] font-bold
                  tracking-[0.18em] text-[#a17438]
                "
              >
                KARYA AKADEMIK
              </span>

              <h3
                className="
                  mt-0 mb-2 font-['Lora']
                  text-[17px] leading-[1.3] text-[#65111f]
                "
              >
                Sunan Gunung Djati Corner
              </h3>

              <p
                className="
                  m-0 max-w-[500px]
                  text-[10px] leading-[1.62]
                  text-[#655a55]
                "
              >
                Menghadirkan karya dosen, publikasi ilmiah,
                serta eksplorasi berdasarkan dosen dan fakultas
                di lingkungan UIN Sunan Gunung Djati Bandung.
              </p>

              <Link
                to="/sgd-corner"
                className="
                  mt-[14px] inline-flex items-center gap-[7px]
                  text-[10px] font-bold text-[#701321]
                "
              >
                Jelajahi Sunan Gunung Djati Corner
                <ArrowRight size={14} />
              </Link>
            </article>
          </div>
        </section>

        {/* PURPOSE */}
        <section
          className="
            mx-auto w-[min(1180px,88%)]
            py-12 max-[700px]:w-[90%]
          "
        >
          <div className="mb-6 max-w-[680px]">
            <p
              className="
                mb-2 text-[10px] font-bold tracking-[0.22em]
                text-[#ae8147]
              "
            >
              TUJUAN PORTAL
            </p>

            <h2
              className="
                m-0 font-['Lora'] text-[20px]
                leading-[1.28] text-[#681220]
              "
            >
              Memperluas akses terhadap koleksi
              dan karya akademik.
            </h2>
          </div>

          <div
            className="
              grid grid-cols-4 gap-3
              max-[950px]:grid-cols-2
              max-[700px]:grid-cols-1
            "
          >
            {[
              {
                number: '01',
                title: 'Memudahkan Penelusuran',
                description:
                  'Menghadirkan koleksi khusus dalam tampilan yang lebih terstruktur dan mudah dijelajahi.'
              },
              {
                number: '02',
                title: 'Mendukung Riset',
                description:
                  'Membantu mahasiswa, dosen, dan peneliti menemukan referensi yang relevan untuk kebutuhan akademik.'
              },
              {
                number: '03',
                title: 'Merawat Khazanah Lokal',
                description:
                  'Mendukung pelestarian dan pemanfaatan koleksi yang berkaitan dengan Sunda, Islam, dan kekayaan intelektual lokal.'
              },
              {
                number: '04',
                title: 'Mengangkat Karya Dosen',
                description:
                  'Memberikan ruang yang lebih mudah diakses untuk mengenali karya dan publikasi akademik dosen UIN.'
              }
            ].map((item) => (
              <article
                key={item.number}
                className="
                  min-h-[175px] border-t-2 border-[#b88a48]
                  bg-[#fffaf3] p-[18px]
                "
              >
                <strong
                  className="
                    font-['Lora'] text-[18px]
                    text-[#b0874c]
                  "
                >
                  {item.number}
                </strong>

                <h3
                  className="
                    mt-[15px] mb-[7px]
                    font-['Lora'] text-[14px]
                    leading-[1.3] text-[#5f1721]
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    m-0 text-[9px] leading-[1.65]
                    text-[#726660]
                  "
                >
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* LIBRARY CTA */}
        <section
          className="
            grid grid-cols-[52px_1fr_auto]
            items-center gap-5
            border-t border-[#eadfce]
            bg-[linear-gradient(90deg,#f5e8d7,#fff9ef)]
            py-[30px] px-[7%]
            max-[700px]:grid-cols-[50px_1fr]
            max-[700px]:px-[22px]
            max-[700px]:py-7
          "
        >
          <div
            className="
              grid h-[50px] w-[50px]
              place-items-center rounded-full
              bg-[#ead8b9] text-[#79541d]
            "
          >
            <Landmark size={25} />
          </div>

          <div>
            <p
              className="
                mb-2 text-[10px] font-bold tracking-[0.22em]
                text-[#ae8147]
              "
            >
              PERPUSTAKAAN UIN
            </p>

            <h2
              className="
                mt-0 mb-[6px] font-['Lora']
                text-[18px] leading-[1.3]
                text-[#5f1621]
              "
            >
              Bagian dari layanan Perpustakaan
              UIN Sunan Gunung Djati Bandung.
            </h2>

            <p
              className="
                m-0 max-w-[760px]
                text-[10px] leading-[1.6]
                text-[#6d625d]
              "
            >
              Corner UIN dirancang sebagai layanan pendukung
              untuk memperluas akses sivitas akademika terhadap
              koleksi dan sumber pengetahuan.
            </p>
          </div>

          <a
            href="https://lib.uinsgd.ac.id/"
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex min-h-[39px] items-center gap-2
              rounded-[7px] border border-[#7a1826]
              px-[15px] text-[10px] font-semibold
              text-[#701321]
              max-[700px]:col-span-2
              max-[700px]:justify-self-start
            "
          >
            Kunjungi Website Perpustakaan
            <ExternalLink size={14} />
          </a>
        </section>
      </main>

      <Footer />
    </>
  )
}