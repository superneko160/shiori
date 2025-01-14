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
