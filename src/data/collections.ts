import type { CollectionItem } from '../types/collection'

export const collections: CollectionItem[] = [
  {
    id: 'si-001',
    title: 'Sejarah Islam di Tatar Sunda',
    author: 'A. Hasan Muarif',
    year: 2023,
    corner: 'sunda-islam',
    sourceType: 'repository',
    accessType: 'open',
    sourceLabel: 'Repository UIN',
    category: 'Sejarah'
  },
  {
    id: 'si-002',
    title: 'Budaya Sunda dalam Perspektif Islam',
    author: 'R. Rachmat',
    year: 2022,
    corner: 'sunda-islam',
    sourceType: 'otomasi',
    accessType: 'local',
    sourceLabel: 'Otomasi UIN',
    category: 'Budaya Sunda'
  },
  {
    id: 'sgd-001',
    title: 'Knowledge Management in Islamic Higher Education',
    author: 'Dr. Ahmad Fauzi, M.T.',
    year: 2025,
    corner: 'sgd',
    sourceType: 'repository',
    accessType: 'open',
    sourceLabel: 'Repository UIN',
    faculty: 'Fakultas Sains dan Teknologi',
    workType: 'Artikel Jurnal'
  }
]
