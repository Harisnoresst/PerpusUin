import type { AuthUser } from '../Context/AuthContext'

// SEMENTARA: hanya untuk uji coba frontend. Hapus saat backend sudah siap.
type MockAccount = AuthUser & { nim: string; password: string }

const MOCK_ACCOUNTS: MockAccount[] = [
  { nim: '1247050090', password: 'password123', name: 'Haris' },
  { nim: '1217050002', password: 'password123', name: 'Siti Aminah' }
]

export function authenticateMock(nim: string, password: string): AuthUser | null {
  const account = MOCK_ACCOUNTS.find(
    (a) => a.nim === nim.trim() && a.password === password
  )
  if (!account) return null

  return { name: account.name, photo: account.photo }
}