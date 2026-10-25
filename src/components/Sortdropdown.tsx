import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'

type SortDropdownProps = {
  value: string
  options: string[]
  onChange: (value: string) => void
}

export default function SortDropdown({ value, options, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // tutup saat klik di luar atau tekan Escape
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
      {/* Tanda ! dipakai karena aturan global `button { font: inherit }` mengalahkan utility Tailwind */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex h-7 items-center gap-1.5 rounded-md border bg-[#fffaf2] pl-2.5 pr-2 text-[9px]! font-medium! text-[#9a887f] outline-none transition-colors hover:border-[#c18f47] focus-visible:border-[#c18f47] ${
          open ? 'border-[#c18f47]' : 'border-[#eadfce]'
        }`}
      >
        Urutkan:
        <span className="font-semibold! text-[#65111f]">{value}</span>
        <ChevronDown
          size={11}
          className={`text-[#ae8147] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-[calc(100%+6px)] z-20 m-0 min-w-36 list-none rounded-lg border border-[#eadfce] bg-[#fffdf9] p-1 shadow-[0_10px_24px_rgba(69,49,38,.12)]"
        >
          {options.map((option) => {
            const selected = option === value

            return (
              <li key={option} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(option)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-[5px] border-0 px-2.5 py-1.5 text-left text-[9px]! transition-colors ${
                    selected
                      ? 'bg-[#faf1e4] font-semibold! text-[#65111f]'
                      : 'bg-transparent font-medium! text-[#5f5550] hover:bg-[#faf1e4] hover:text-[#65111f]'
                  }`}
                >
                  {option}
                  {selected && <Check size={11} className="text-[#b17b2c]" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}