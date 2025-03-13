import type { BookStatus } from "@prisma/client"

// 書籍（単体）
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

// 書籍（複数）
export type Books = {
  books: Book[]
  totalBooks: number
  totalPages: number
}

// 書籍（取得の失敗）
export type BooksError = {
  error: string
}

// 書籍（取得結果）
export type BookResult = Book | BooksError
export type BooksResult = Books | BooksError

// 書籍の状態
export type Status =
  | "CONSIDERING_PURCHASE"
  | "PURCHASED_UNREAD"
  | "READING"
  | "COMPLETED"

// 書籍の状態（CSSで利用する用）
export type StatusConfig = {
  label: string
  variant: "considering_purchase" | "purchaced_unread" | "reading" | "completed"
}

// バリデーション後の新規登録データ
export type CreateBookInput = {
  title: string
  author: string
  status: BookStatus
  purchasedAt?: Date | null
  userId: string
}

// バリデーション後の更新データ
export type UpdateBookInput = {
  id: number
  title: string
  author: string
  pagesRead: number
  totalPages: number
  status: BookStatus
  purchasedAt?: Date | null
  startedAt?: Date | null
  finishedAt?: Date | null
  note: string
}

// ソート用
export type SortOption = "updatedAt" | "createdAt"
export type SortDirection = "desc" | "asc"
