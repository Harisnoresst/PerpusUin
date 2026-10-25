import { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  Bookmark,
  ChevronDown,
  ExternalLink,
  LogOut,
  Search,
  UserRound,
  Menu,
  X
} from 'lucide-react'
import { useAuth, type AuthUser } from '../Context/AuthContext'

/* ---------- class helpers ---------- */

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'relative flex items-center h-full py-3 lg:py-0 text-[11px] transition-colors hover:text-[#671220]',
    'lg:after:absolute lg:after:left-1/2 lg:after:bottom-3.5 lg:after:h-0.5 lg:after:-translate-x-1/2',
    'lg:after:bg-[#b17b2c] lg:after:transition-all lg:after:duration-200',
    isActive
      ? 'font-bold text-[#671220] lg:after:w-full'
      : 'font-bold text-[#3c3431] lg:after:w-0' // Dibuat bold juga agar seragam
  ].join(' ')

const dropdownItemClass = ({ isActive }: { isActive: boolean }) =>
  [
    'block rounded-[7px] px-2.75 py-2.5 text-[#3d3430] hover:bg-[#faf1e4] transition-colors',
    isActive ? 'bg-[#faf1e4]' : ''
  ].join(' ')

/* ---------- sub components ---------- */

function ServicesDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  
  // Deteksi apakah salah satu halaman layanan sedang aktif
  const isActive = ['/sunda-islam', '/sgd-corner', '/saved'].includes(location.pathname)

  return (
    <div className="group relative flex flex-col lg:flex-row items-start lg:items-stretch">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 m-0 h-full py-3 lg:py-0 text-[11px] font-bold! transition-colors hover:text-[#671220] lg:after:absolute lg:after:left-1/2 lg:after:bottom-3.5 lg:after:h-0.5 lg:after:-translate-x-1/2 lg:after:bg-[#b17b2c] lg:after:transition-all lg:after:duration-200 ${
          isActive
            ? 'text-[#671220] lg:after:w-full' 
            : isOpen
              ? 'text-[#671220] lg:after:w-0'
              : 'text-[#3c3431] lg:after:w-0'
        }`}
      >
        Layanan
        <ChevronDown size={14} className={`transition-transform lg:group-hover:rotate-180 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`${isOpen ? 'block' : 'hidden'} lg:hidden lg:group-hover:block lg:group-focus-within:block static lg:absolute lg:left-1/2 lg:top-[calc(100%-6px)] w-full lg:w-70 lg:-translate-x-1/2 lg:translate-y-2 rounded-[10px] lg:border lg:border-[#eadfce] lg:bg-[#fffdf9] p-2 lg:opacity-0 lg:shadow-[0_14px_32px_rgba(69,49,38,.12)] lg:transition-all lg:duration-200 lg:group-hover:visible lg:group-hover:translate-y-0 lg:group-hover:opacity-100 max-[700px]:left-auto max-[700px]:right-0 max-[700px]:translate-x-0`}
      >
        <NavLink to="/sunda-islam" className={dropdownItemClass} onClick={() => setIsOpen(false)}>
          <span className="block text-[11px] font-bold text-[#681220]">
            Sunda Islam Corner
          </span>
          <small className="mt-0.75 block text-[9px] leading-[1.4] text-[#85766f]">
            Koleksi Sunda, Islam, budaya, dan sejarah
          </small>
        </NavLink>

        <NavLink to="/sgd-corner" className={dropdownItemClass} onClick={() => setIsOpen(false)}>
          <span className="block text-[11px] font-bold text-[#681220]">
            Sunan Gunung Djati Corner
          </span>
          <small className="mt-0.75 block text-[9px] leading-[1.4] text-[#85766f]">
            Karya dosen dan publikasi akademik
          </small>
        </NavLink>

        <NavLink to="/saved" className={dropdownItemClass} onClick={() => setIsOpen(false)}>
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#681220]">
            <Bookmark size={14} />
            Koleksi Tersimpan
          </span>
          <small className="mt-0.75 block text-[9px] leading-[1.4] text-[#85766f]">
            Koleksi yang Anda simpan
          </small>
        </NavLink>
      </div>
    </div>
  )
}

function SearchBox() {
  return (
    <div className="hidden h-9.5 w-48 items-center lg:flex gap-2 rounded-lg border border-[#e5d9c7] bg-white px-3.25 text-[#867972] xl:w-56 transition-colors focus-within:border-[#b17b2c]">
      <Search size={16} />
      <input
        type="search"
        placeholder="Cari koleksi..."
        aria-label="Cari koleksi"
        className="w-full min-w-0 border-0 bg-transparent text-[11px] text-[#4b423e] outline-none"
      />
    </div>
  )
}

function LibraryButton({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <a
      href="https://lib.uinsgd.ac.id/"
      target="_blank"
      rel="noreferrer"
      className={`${isMobile ? 'flex' : 'hidden lg:inline-flex'} min-h-9.5 items-center justify-center gap-1.75 whitespace-nowrap rounded-lg border border-[#721323] bg-[#fffdf9] px-3.5 text-[11px] font-medium text-[#721323] transition hover:-translate-y-px hover:bg-[#f8eee7]`}
    >
      Website Perpustakaan
      <ExternalLink size={14} />
    </a>
  )
}

function LoginButton({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <NavLink
      to="/login"
      className={`${isMobile ? 'flex' : 'inline-flex'} min-h-9.5 items-center justify-center gap-1.75 rounded-lg bg-gradient-to-br from-[#731424] to-[#56101a] px-3.75 text-[11px] font-semibold text-white! shadow-[0_6px_14px_rgba(82,16,28,.15)] transition hover:-translate-y-px hover:shadow-[0_8px_18px_rgba(82,16,28,.18)]`}
    >
      Masuk
      <UserRound size={15} />
    </NavLink>
  )
}

function Avatar({ user, size = 28 }: { user: AuthUser; size?: number }) {
  const initial = (user.name || '?').trim().charAt(0).toUpperCase()

  return user.photo ? (
    <img
      src={user.photo}
      alt=""
      style={{ width: size, height: size }}
      className="rounded-full object-cover shrink-0"
    />
  ) : (
    <span
      style={{ width: size, height: size }}
      className="grid shrink-0 place-items-center rounded-full bg-[#721323] text-[11px] font-semibold text-white"
    >
      {initial}
    </span>
  )
}

function ProfileMenu({
  user,
  onLogout
}: {
  user: AuthUser
  onLogout: () => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)

    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex min-h-9.5 items-center gap-2 rounded-lg border border-[#eadfce] bg-white py-1 pl-1.5 pr-3 transition hover:bg-[#faf1e4]"
      >
        <Avatar user={user} />
        <span className="max-w-27.5 truncate text-[11px] font-medium text-[#3c3431]">
          {user.name}
        </span>
        <ChevronDown
          size={14}
          className={`text-[#756a65] transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-40 rounded-[10px] border border-[#eadfce] bg-[#fffdf9] p-2 shadow-[0_14px_32px_rgba(69,49,38,.12)]"
        >
          <NavLink
            to="/profil"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-[7px] px-2.75 py-2.5 text-[11px] font-medium text-[#3c3431] hover:bg-[#faf1e4] hover:text-[#681220] transition-colors"
          >
            <UserRound size={14} />
            Lihat Profil
          </NavLink>

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false)
              onLogout()
            }}
            className="flex w-full items-center gap-2 rounded-[7px] border-0 bg-transparent px-2.75 py-2.5 text-left text-[11px] font-medium text-[#b3261e] hover:bg-[#fdecea] transition-colors mt-1"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

/* ---------- main ---------- */

export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-[100] border-b border-[#eadfce] bg-[rgba(255,253,249,.98)] backdrop-blur-md font-sans text-[11px]">
      <div className="flex min-h-15.5 items-center justify-between px-4.5 lg:grid lg:grid-cols-[260px_1fr_auto] xl:grid-cols-[300px_1fr_auto] lg:px-[2.5%]">
        
        {/* Brand */}
        <NavLink to="/" className="flex w-fit min-w-0 items-center gap-2.75">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center">
            <img
              src="/images/landing/logo-uin.png"
              alt="Logo UIN Sunan Gunung Djati Bandung"
              className="h-10 w-10 object-contain"
            />
          </div>

          <div>
            <strong className="block font-[Lora,serif] text-[13px] leading-[1.05] tracking-[.10em] text-[#65111f]">
              PERPUSTAKAAN
            </strong>
            <span className="mt-1 block font-[Lora,serif] text-[6px] tracking-[.17em] text-[#75645d]">
              UIN SUNAN GUNUNG DJATI
            </span>
          </div>
        </NavLink>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 border-0 bg-transparent text-[#3c3431]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu utama (Desktop) */}
        <nav
          aria-label="Navigasi utama"
          className="hidden lg:flex h-15.5 items-stretch justify-self-center gap-5.5 xl:gap-7.5 whitespace-nowrap"
        >
          <NavLink to="/" end className={navLinkClass}>Beranda</NavLink>
          <NavLink to="/tentang" className={navLinkClass}>Tentang</NavLink>
          {isLoggedIn && <ServicesDropdown />}
          <NavLink to="/bantuan" className={navLinkClass}>Bantuan</NavLink>
        </nav>

        {/* Aksi kanan (Desktop) */}
        <div className="hidden lg:flex min-w-0 items-center justify-self-end gap-2.25 xl:gap-3">
          {isLoggedIn && user ? (
            <>
              <SearchBox />
              <LibraryButton />
              <ProfileMenu user={user} onLogout={handleLogout} />
            </>
          ) : (
            <>
              <LibraryButton />
              <LoginButton />
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#eadfce] bg-[#fffdf9] px-4.5 py-4 flex flex-col gap-4 shadow-lg absolute w-full left-0">
          <nav className="flex flex-col gap-2">
            <NavLink to="/" end className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Beranda</NavLink>
            <NavLink to="/tentang" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Tentang</NavLink>
            {isLoggedIn && <ServicesDropdown />}
            <NavLink to="/bantuan" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Bantuan</NavLink>
          </nav>
          
          <div className="h-px bg-[#eadfce] w-full my-2"></div>
          
          {isLoggedIn && user ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Avatar user={user} />
                <span className="text-[11px] font-medium text-[#3c3431]">{user.name}</span>
              </div>
              <NavLink to="/profil" onClick={() => setIsMobileMenuOpen(false)} className="text-[11px] font-medium text-[#3c3431] py-2">Lihat Profil</NavLink>
              <button onClick={handleLogout} className="border-0 bg-transparent text-left text-[11px] font-medium text-[#b3261e] py-2">Logout</button>
              <LibraryButton isMobile={true} />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <LibraryButton isMobile={true} />
              <LoginButton isMobile={true} />
            </div>
          )}
        </div>
      )}
    </header>
  )
}