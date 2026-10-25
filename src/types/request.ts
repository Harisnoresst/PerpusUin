export type AccessRequestStatus =
  | 'pending'
  | 'approved'
  | 'rejected'

export type AccessRequest = {
  id: string
  userId: string
  collectionId: string
  status: AccessRequestStatus
  requestedAt: string
}
