import type { BookStatus } from "@prisma/client"

// 書籍（出力時）
export type Book = {
  id: number
  title: string
  author: string
  pagesRead: number
  totalPages: number
  purchasedAt: Date | null
  startedAt: Date | null
  finishedAt: Date | null
  note: string
  status: BookStatus
  createdAt: Date
  updatedAt: Date
}

export type Status =
  | "CONSIDERING_PURCHASE"
  | "PURCHASED_UNREAD"
  | "READING"
  | "COMPLETED"

export type StatusConfig = {
  label: string
  variant: "considering_purchase" | "purchaced_unread" | "reading" | "completed"
}
