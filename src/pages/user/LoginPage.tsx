import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldUser,
  TriangleAlert,
  UserRound
} from 'lucide-react'

import { useAuth } from '../../Context/AuthContext'
import { authenticateMock } from '../../data/MockUsers'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [nim, setNim] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { isLoggedIn, login } = useAuth()
  const navigate = useNavigate()

  // Sudah login → tidak perlu melihat halaman login lagi
  if (isLoggedIn) return <Navigate to="/" replace />

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!nim.trim() || !password) {
      setError('NIM dan password wajib diisi.')
      return
    }

    const user = authenticateMock(nim, password)
    if (!user) {
      setError('NIM atau password salah.')
      return
    }

    setError('')
    login(user)
    navigate('/')
  }

  const handleSsoLogin = () => {
    // Logika SSO di sini
    alert('Mengalihkan ke layanan Login SSO UIN SGD...')
  }

  return (
    <main
      className="relative min-h-screen flex bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: "url('/images/landing/hero.png')"
      }}
    >
      {/* Gradasi krem tipis dari sudut kiri atas agar brand terbaca di atas foto */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-10 hidden h-44 w-105 bg-[radial-gradient(ellipse_at_top_left,rgba(251,243,231,.92)_0%,rgba(251,243,231,.70)_30%,rgba(251,243,231,.28)_58%,rgba(251,243,231,0)_80%)] md:block"
      />

      {/* Brand: logo & nama perpustakaan di pojok kiri atas */}
      <Link
        to="/"
        className="absolute top-6 left-8 z-20 hidden w-fit items-center gap-2.75 md:flex"
      >
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
      </Link>

      {/* Sisi Kiri Kosong dengan Efek Gradasi Krem Lembut */}
      <div className="flex-1 hidden md:block relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fbf3e7]/30 to-[#fbf3e7]/80 pointer-events-none" />
      </div>

      {/* Panel Form Kanan dengan Efek Blur & Gradasi Warna Krem */}
      <section className="relative w-full max-w-120 flex flex-col justify-center px-10 py-12 bg-gradient-to-l from-[#fffdf9]/95 via-[#fffdf9]/90 to-[#fbf3e7]/85 backdrop-blur-md shadow-[-15px_0_35px_rgba(74,48,35,0.12)] border-l border-[#eadfce]/60 max-[520px]:px-6 max-[520px]:max-w-full">
        
        {/* Layer Gradasi di Sisi Kiri Panel */}
        <div className="absolute top-0 -left-12 bottom-0 w-12 bg-gradient-to-r from-transparent to-[#fbf3e7]/50 backdrop-blur-sm pointer-events-none hidden md:block" />

        <div className="w-full max-w-95 mx-auto relative z-10">
          {/* Brand di atas judul */}
          <Link to="/" className="mb-6 flex w-fit items-center gap-2.75">
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
          </Link>

          <p className="mb-2 text-[9px] font-bold tracking-[0.18em] text-[#b18446] uppercase">
            Perpustakaan UIN Sunan Gunung Djati
          </p>

          <h1 className="m-0 mb-3 [font-family:'Lora',serif] text-[32px] leading-[1.2] text-[#681220]">
            Masuk ke Akun
          </h1>

          <p className="mb-5 text-[11px] leading-[1.65] text-[#756a65]">
            Masuk menggunakan NIM dan password untuk mengakses layanan pengguna dan koleksi tersimpan.
          </p>

          {/* TOMBOL MASUK SEBAGAI SSO */}
          {/* Tanda ! dipakai karena aturan global `button { font: inherit }` mengalahkan utility Tailwind */}
          <button
            type="button"
            onClick={handleSsoLogin}
            className="w-full h-10 mb-6 flex items-center justify-center gap-2 rounded-[7px] bg-gradient-to-br from-[#731424] to-[#56101a] text-white text-[10.5px]! font-semibold! transition-all hover:from-[#5d0f1c] hover:to-[#420a13] hover:-translate-y-px active:translate-y-0 cursor-pointer shadow-[0_4px_12px_rgba(114,19,35,0.2)]"
          >
            <ShieldUser size={16} />
            Masuk sebagai SSO
          </button>

          {/* Pembatas / Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-[#eadfce]" />
            <span className="text-[9.5px] font-medium text-[#9a887f]">atau</span>
            <div className="h-px flex-1 bg-[#eadfce]" />
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <label className="block mb-4">
              <span className="block mb-1.75 text-[10px] font-semibold text-[#4d433f]">NIM</span>
              <div className="flex h-11 items-center gap-2.5 rounded-[7px] border border-[#dfd3c4] bg-white/90 px-3.25 text-[#9a887f] transition-all focus-within:border-[#9b4a56] focus-within:shadow-[0_0_0_3px_rgba(114,19,35,.07)]">
                <UserRound size={17} />
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="username"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  placeholder="Masukkan NIM Anda"
                  className="w-full min-w-0 border-0 bg-transparent text-[10px]! text-[#3f3733] outline-none placeholder:text-[#a89a92]"
                />
              </div>
            </label>

            <label className="block mb-5">
              <span className="block mb-1.75 text-[10px] font-semibold text-[#4d433f]">Password</span>
              <div className="flex h-11 items-center gap-2.5 rounded-[7px] border border-[#dfd3c4] bg-white/90 px-3.25 text-[#9a887f] transition-all focus-within:border-[#9b4a56] focus-within:shadow-[0_0_0_3px_rgba(114,19,35,.07)]">
                <LockKeyhole size={17} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password Anda"
                  className="w-full min-w-0 border-0 bg-transparent text-[10px]! text-[#3f3733] outline-none placeholder:text-[#a89a92]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Tampilkan atau sembunyikan password"
                  className="shrink-0 grid place-items-center p-0 border-0 bg-transparent text-[#8f7e76] cursor-pointer hover:text-[#681220] transition-colors"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </label>

            {error && (
              <div
                role="alert"
                className="mb-5 flex items-center gap-2 rounded-[7px] border border-[#e8b4ae] bg-[#fdecea] px-3 py-2.5 text-[10px] font-medium text-[#b3261e]"
              >
                <TriangleAlert size={14} className="shrink-0" />
                {error}
              </div>
            )}

            <div className="flex items-center justify-between gap-5 mb-6 text-[10px] text-[#71645e]">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" className="accent-[#721323] cursor-pointer" />
                <span>Ingat saya</span>
              </label>

              <button type="button" className="p-0 border-0 bg-transparent text-[#721323] font-medium hover:underline cursor-pointer">
                Lupa password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full h-10 rounded-[7px] bg-[#721323] text-white text-[10.5px]! font-semibold! transition-all hover:bg-[#5d0f1c] hover:-translate-y-px active:translate-y-0 cursor-pointer shadow-[0_4px_12px_rgba(114,19,35,0.2)]"
            >
              Masuk
            </button>
          </form>

          <Link
            to="/"
            className="block mt-5 text-center text-[10px] text-[#756a65] hover:text-[#721323] transition-colors"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </section>
    </main>
  )
}