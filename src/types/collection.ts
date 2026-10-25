export type CornerType = 'sunda-islam' | 'sgd'

export type SourceType =
  | 'repository'
  | 'otomasi'
  | 'ebook'
  | 'digitalisasi'
  | 'external'

export type AccessType =
  | 'open'
  | 'local'
  | 'request'

export type CollectionItem = {
  id: string
  title: string
  author: string
  year?: number
  corner: CornerType
  sourceType: SourceType
  accessType: AccessType
  sourceLabel: string
  category?: string
  faculty?: string
  workType?: string
  cover?: string
  link?: string
}
