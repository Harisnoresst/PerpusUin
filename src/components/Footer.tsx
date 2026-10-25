import { Mail, MapPin, Phone } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'

const contactItemClass =
  'flex items-center gap-2.5 text-[9px] leading-[1.5] text-white/95 [&_svg]:shrink-0'

const contactLinkClass =
  `${contactItemClass} transition hover:-translate-y-px hover:opacity-80`

const socialLinkClass =
  'grid h-8.5 w-8.5 place-items-center rounded-full border border-white/22 text-white transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/12'

export default function Footer() {
  return (
    <footer className="bg-[#721323] px-[4.3%] pt-7 pb-5.5 text-white max-[700px]:px-5.5">
      <div className="grid grid-cols-[290px_1fr_auto] items-center gap-9 max-[1100px]:grid-cols-[1fr_auto] max-[700px]:grid-cols-1 max-[700px]:gap-6">
        {/* BRAND */}
        <div className="flex min-w-0 items-center gap-3">
          <img
            src="/images/landing/logo-uin.png"
            alt="Logo UIN Sunan Gunung Djati Bandung"
            className="h-10.5 w-10.5 shrink-0 object-contain"
          />

          <div className="min-w-0">
            <strong className="block font-[Lora,serif] text-[14px] leading-[1.15] tracking-[.04em] text-white">
              PERPUSTAKAAN
            </strong>
            <span className="mt-1 block text-[8px] tracking-[.13em] text-white/75">
              UIN SUNAN GUNUNG DJATI
            </span>
          </div>
        </div>

        {/* CONTACT */}
        <div className="flex items-center justify-center gap-9.5 max-[1100px]:col-span-full max-[1100px]:flex-wrap max-[1100px]:justify-start max-[1100px]:gap-x-7.5 max-[1100px]:gap-y-5 max-[700px]:grid max-[700px]:gap-3.5">
          <div className={contactItemClass}>
            <MapPin size={19} />

            <span>
              Jl. A.H. Nasution No. 105
              <br />
              Cibiru, Kota Bandung, Jawa Barat 40614
            </span>
          </div>

          <a href="tel:+622263700715" className={contactLinkClass}>
            <Phone size={19} />
            <span>(022) 6370 0715</span>
          </a>

          <a href="mailto:lib@uinsgd.ac.id" className={contactLinkClass}>
            <Mail size={19} />
            <span>lib@uinsgd.ac.id</span>
          </a>
        </div>

        {/* SOCIAL */}
        <div className="flex items-center gap-4 max-[700px]:justify-start">
          <span className="whitespace-nowrap text-[9px] font-semibold">Ikuti Kami</span>

          <div className="flex items-center gap-2.5">
            <a
              href="https://www.instagram.com/perpusuinbdg/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram Perpustakaan UIN Sunan Gunung Djati Bandung"
              title="Instagram"
              className={socialLinkClass}
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="https://www.youtube.com/@pusatperpustakaanuinsgdban5129"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube Pusat Perpustakaan UIN Sunan Gunung Djati Bandung"
              title="YouTube"
              className={socialLinkClass}
            >
              <FaYoutube size={19} />
            </a>

            <a
              href="https://www.facebook.com/perpustakaanuinsgdbandung/?locale=id_ID"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook Pusat Perpustakaan UIN Sunan Gunung Djati Bandung"
              title="Facebook"
              className={socialLinkClass}
            >
              <FaFacebookF size={17} />
            </a>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="mt-5.5 mb-4.25 h-px bg-white/20" />

      {/* BOTTOM */}
      <div className="flex items-center justify-between gap-5 text-white/76 max-[700px]:flex-col max-[700px]:items-start">
        <p className="m-0 text-[8px]">
          © 2026 Perpustakaan UIN Sunan Gunung Djati Bandung.
          All rights reserved.
        </p>

        <div className="flex items-center gap-2.5 text-[8px]">
          <span>Ilmu</span>
          <i className="h-3 w-px bg-white/45" />
          <span>Iman</span>
          <i className="h-3 w-px bg-white/45" />
          <span>Peradaban</span>
        </div>
      </div>
    </footer>
  )
}