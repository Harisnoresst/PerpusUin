import { useMemo, useState } from 'react'
import {
  Bookmark,
  ChevronDown,
  ExternalLink,
  HelpCircle,
  LockKeyhole,
  Mail,
  Search,
  SearchCheck,
  ShieldCheck
} from 'lucide-react'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const guides = [
  {
    icon: SearchCheck,
    title: 'Mencari Koleksi',
    description:
      'Gunakan pencarian dan filter untuk menemukan koleksi berdasarkan judul, penulis, topik, fakultas, atau sumber.'
  },
  {
    icon: Bookmark,
    title: 'Menyimpan Koleksi',
    description:
      'Simpan koleksi yang ingin dibaca kembali. Fitur ini tersedia setelah pengguna masuk ke akun.'
  },
  {
    icon: LockKeyhole,
    title: 'Request Access',
    description:
      'Ajukan permintaan akses untuk koleksi tertentu yang tidak dapat dibuka langsung.'
  },
  {
    icon: ShieldCheck,
    title: 'Status Akses',
    description:
      'Kenali perbedaan Open Access, Akses Lokal, dan Request Access sebelum membuka koleksi.'
  }
]

const faqs = [
  {
    question: 'Apakah harus login untuk mencari koleksi?',
    answer:
      'Tidak. Pengguna tetap dapat melakukan pencarian dan melihat informasi koleksi tanpa login. Login diperlukan ketika ingin menyimpan koleksi atau mengajukan Request Access.'
  },
  {
    question: 'Apa bedanya Open Access, Akses Lokal, dan Request Access?',
    answer:
      'Open Access dapat dibuka langsung. Akses Lokal hanya tersedia melalui lingkungan atau layanan tertentu yang disediakan perpustakaan. Request Access digunakan untuk koleksi yang memerlukan permintaan akses terlebih dahulu.'
  },
  {
    question: 'Bagaimana cara menyimpan koleksi?',
    answer:
      'Masuk ke akun terlebih dahulu, kemudian pilih ikon bookmark pada kartu koleksi. Koleksi yang disimpan dapat dilihat kembali melalui menu Koleksi Tersimpan.'
  },
  {
    question: 'Bagaimana cara mengajukan Request Access?',
    answer:
      'Buka detail koleksi yang berstatus Request Access, lalu pilih tombol pengajuan akses. Setelah login, lengkapi informasi yang dibutuhkan dan kirim permintaan.'
  },
  {
    question: 'Bagaimana jika tautan sumber tidak dapat dibuka?',
    answer:
      'Periksa kembali status akses koleksi. Jika tautan tetap tidak dapat digunakan, hubungi layanan Perpustakaan UIN melalui kontak yang tersedia di bagian bawah halaman ini.'
  }
]

export default function HelpPage() {
  const [query, setQuery] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const filteredFaqs = useMemo(() => {
    const keyword = query.trim().toLowerCase()

    if (!keyword) {
      return faqs
    }

    return faqs.filter((item) =>
      `${item.question} ${item.answer}`
        .toLowerCase()
        .includes(keyword)
    )
  }, [query])

  return (
    <>
      <Navbar />

      <main className="help-page">
        <section className="help-hero">
          <div className="help-hero__inner">
            <div className="help-hero__icon">
              <HelpCircle size={26} />
            </div>

            <p className="help-kicker">
              PUSAT BANTUAN
            </p>

            <h1>
              Ada yang bisa kami bantu?
            </h1>

            <p className="help-hero__lead">
              Temukan panduan singkat untuk menggunakan layanan Corner UIN,
              mulai dari pencarian koleksi hingga permintaan akses.
            </p>

            <label className="help-search">
              <Search size={18} />

              <input
                type="search"
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="Cari bantuan atau topik..."
              />
            </label>
          </div>
        </section>


        <section className="help-guides">
          <div className="help-section-heading">
            <p className="help-section-label">
              PANDUAN CEPAT
            </p>

            <h2>
              Mulai dari hal yang paling sering digunakan.
            </h2>

            <p>
              Panduan singkat untuk membantu Anda memahami
              fitur utama portal.
            </p>
          </div>

          <div className="help-guide-grid">
            {guides.map(
              ({
                icon: Icon,
                title,
                description
              }) => (
                <article
                  className="help-guide-card"
                  key={title}
                >
                  <div className="help-guide-card__icon">
                    <Icon size={23} />
                  </div>

                  <h3>{title}</h3>

                  <p>
                    {description}
                  </p>
                </article>
              )
            )}
          </div>
        </section>


        <section className="help-faq">
          <div className="help-faq__heading">
            <div>
              <p className="help-section-label">
                PERTANYAAN UMUM
              </p>

              <h2>
                Informasi yang paling sering ditanyakan.
              </h2>
            </div>

            <span>
              {filteredFaqs.length} topik
            </span>
          </div>

          <div className="help-faq__list">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item, index) => {
                const isOpen = openFaq === index

                return (
                  <article
                    className={`help-faq-item ${
                      isOpen ? 'is-open' : ''
                    }`}
                    key={item.question}
                  >
                    <button
                      type="button"
                      className="help-faq-item__question"
                      onClick={() =>
                        setOpenFaq(
                          isOpen
                            ? null
                            : index
                        )
                      }
                    >
                      <span>
                        {item.question}
                      </span>

                      <ChevronDown
                        size={18}
                      />
                    </button>

                    {isOpen && (
                      <div className="help-faq-item__answer">
                        <p>
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </article>
                )
              })
            ) : (
              <div className="help-empty">
                <Search size={25} />

                <h3>
                  Topik belum ditemukan
                </h3>

                <p>
                  Coba gunakan kata kunci lain
                  atau hubungi layanan perpustakaan.
                </p>
              </div>
            )}
          </div>
        </section>


        <section className="help-contact">
          <div className="help-contact__copy">
            <p className="help-section-label">
              BANTUAN LEBIH LANJUT
            </p>

            <h2>
              Masih membutuhkan bantuan?
            </h2>

            <p>
              Hubungi layanan Perpustakaan UIN
              Sunan Gunung Djati Bandung jika
              Anda mengalami kendala saat
              menggunakan portal.
            </p>
          </div>

          <div className="help-contact__actions">
            <a
              href="mailto:perpustakaan@uinsgd.ac.id"
              className="help-contact__primary"
            >
              <Mail size={16} />
              Hubungi Kami
            </a>

            <a
              href="https://lib.uinsgd.ac.id/"
              target="_blank"
              rel="noreferrer"
              className="help-contact__secondary"
            >
              Website Perpustakaan
              <ExternalLink size={15} />
            </a>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .help-page {
          background: #fffdf9;
        }

        .help-page h1,
        .help-page h2,
        .help-page h3 {
          font-family: 'Lora', serif;
        }

        .help-kicker,
        .help-section-label {
          margin: 0 0 9px;
          color: #ae8147;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .21em;
        }


        /* HERO */

        .help-hero {
          padding: 58px 24px 52px;
          border-bottom: 1px solid #eadfce;
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(185, 139, 75, .13),
              transparent 40%
            ),
            #fbf5eb;
        }

        .help-hero__inner {
          width: min(760px, 100%);
          margin: 0 auto;
          text-align: center;
        }

        .help-hero__icon {
          width: 52px;
          height: 52px;

          display: grid;
          place-items: center;

          margin: 0 auto 17px;

          border: 1px solid #e1c99f;
          border-radius: 50%;

          background: #f4e4c8;
          color: #7b541e;
        }

        .help-hero h1 {
          margin: 0;
          color: #681220;
          font-size: clamp(36px, 4vw, 50px);
          line-height: 1.08;
        }

        .help-hero__lead {
          max-width: 610px;
          margin: 14px auto 24px;
          color: #665a54;
          font-size: 11px;
          line-height: 1.7;
        }

        .help-search {
          width: min(590px, 100%);
          height: 48px;

          display: flex;
          align-items: center;
          gap: 10px;

          margin: 0 auto;
          padding: 0 15px;

          border: 1px solid #dfd3c1;
          border-radius: 8px;

          background: #fff;
          color: #97887f;

          box-shadow:
            0 7px 22px rgba(76, 52, 39, .05);
        }

        .help-search:focus-within {
          border-color: #9b4d58;
          box-shadow:
            0 0 0 3px rgba(114, 19, 35, .06);
        }

        .help-search input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: #3d3532;
          font-family: inherit;
          font-size: 11px;
        }

        .help-search input::placeholder {
          color: #a79a93;
        }


        /* GUIDES */

        .help-guides {
          width: min(1180px, 90%);
          margin: 0 auto;
          padding: 48px 0 50px;
        }

        .help-section-heading {
          max-width: 680px;
          margin-bottom: 25px;
        }

        .help-section-heading h2 {
          margin: 0;
          color: #681220;
          font-size: 27px;
          line-height: 1.25;
        }

        .help-section-heading > p:last-child {
          margin: 8px 0 0;
          color: #726661;
          font-size: 10px;
          line-height: 1.6;
        }

        .help-guide-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .help-guide-card {
          min-height: 190px;
          padding: 22px;

          border: 1px solid #eadfce;
          border-radius: 10px;

          background: #fff;

          box-shadow:
            0 6px 18px rgba(78, 55, 42, .035);
        }

        .help-guide-card__icon {
          width: 43px;
          height: 43px;

          display: grid;
          place-items: center;

          margin-bottom: 18px;

          border-radius: 50%;

          background: #f1dfbf;
          color: #7b541d;
        }

        .help-guide-card h3 {
          margin: 0 0 8px;
          color: #65111f;
          font-size: 15px;
        }

        .help-guide-card p {
          margin: 0;
          color: #70645f;
          font-size: 9px;
          line-height: 1.7;
        }


        /* FAQ */

        .help-faq {
          padding: 48px 5%;
          border-top: 1px solid #eadfce;
          border-bottom: 1px solid #eadfce;
          background: #fbf8f2;
        }

        .help-faq__heading {
          width: min(900px, 100%);
          margin: 0 auto 22px;

          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
        }

        .help-faq__heading h2 {
          margin: 0;
          color: #681220;
          font-size: 26px;
        }

        .help-faq__heading > span {
          flex-shrink: 0;

          padding: 6px 10px;

          border: 1px solid #e0d0ba;
          border-radius: 999px;

          background: #fff;

          color: #765d43;

          font-size: 8px;
          font-weight: 600;
        }

        .help-faq__list {
          width: min(900px, 100%);
          margin: 0 auto;

          display: grid;
          gap: 8px;
        }

        .help-faq-item {
          overflow: hidden;

          border: 1px solid #e6dacb;
          border-radius: 8px;

          background: #fff;
        }

        .help-faq-item__question {
          width: 100%;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;

          padding: 16px 18px;

          border: 0;
          background: transparent;

          color: #493d38;

          font-family: inherit;
          font-size: 10px;
          font-weight: 600;
          text-align: left;

          cursor: pointer;
        }

        .help-faq-item__question svg {
          flex-shrink: 0;

          color: #96703a;

          transition:
            transform .2s ease;
        }

        .help-faq-item.is-open
        .help-faq-item__question svg {
          transform: rotate(180deg);
        }

        .help-faq-item__answer {
          padding: 0 18px 17px;
        }

        .help-faq-item__answer p {
          max-width: 780px;

          margin: 0;

          color: #746762;

          font-size: 9px;
          line-height: 1.72;
        }

        .help-empty {
          padding: 42px 20px;

          border: 1px dashed #d9c7ae;
          border-radius: 9px;

          color: #88776e;

          text-align: center;
        }

        .help-empty svg {
          color: #aa7c3e;
        }

        .help-empty h3 {
          margin: 10px 0 5px;

          color: #681220;

          font-size: 16px;
        }

        .help-empty p {
          margin: 0;
          font-size: 9px;
        }


        /* CONTACT */

        .help-contact {
          width: min(1180px, 90%);
          margin: 0 auto;

          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 40px;

          padding: 46px 0 52px;
        }

        .help-contact__copy {
          max-width: 650px;
        }

        .help-contact h2 {
          margin: 0;
          color: #681220;
          font-size: 26px;
        }

        .help-contact__copy > p:last-child {
          margin: 8px 0 0;
          color: #6e625d;
          font-size: 10px;
          line-height: 1.65;
        }

        .help-contact__actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .help-contact__primary,
        .help-contact__secondary {
          min-height: 41px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;

          padding: 0 15px;

          border-radius: 7px;

          font-size: 9px;
          font-weight: 600;

          white-space: nowrap;
        }

        .help-contact__primary {
          background: #721323;
          color: #fff;
        }

        .help-contact__secondary {
          border: 1px solid #721323;
          color: #721323;
          background: #fff;
        }


        /* RESPONSIVE */

        @media (max-width: 950px) {
          .help-guide-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .help-contact {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        @media (max-width: 620px) {
          .help-hero {
            padding:
              44px 20px 40px;
          }

          .help-hero h1 {
            font-size: 36px;
          }

          .help-guides {
            width: 90%;
          }

          .help-guide-grid {
            grid-template-columns: 1fr;
          }

          .help-faq {
            padding:
              40px 5%;
          }

          .help-faq__heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .help-contact {
            width: 90%;
          }

          .help-contact__actions {
            align-items: stretch;
            flex-direction: column;
          }

          .help-contact__primary,
          .help-contact__secondary {
            width: 100%;
          }
        }
      `}</style>
    </>
  )
}