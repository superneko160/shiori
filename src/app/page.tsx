import Link from "next/link"
import { getBooks } from "@/app/actions/books"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { currentUser } from "@clerk/nextjs/server"
import { toast } from "sonner"

import type { SortDirection, SortOption, Status } from "./types"
import { NewButton, SortButton, StatusFilterButton } from "./components/buttons"
import { BookPagination } from "./components/pagination"
import { SearchForm } from "./components/SearchForm"
import { UnauthenticatedView } from "./components/UnauthenticatedView"
import { STATUS_CONFIG } from "./consts"
import { formatDate } from "./utils/date"
import { isValidSortDirection, isValidSortOption } from "./utils/validator"

type Props = {
  searchParams: Promise<{
    p?: string
    search?: string
    sortBy?: SortOption
    sortDir?: SortDirection
    status?: string
  }>
}

export default async function Home({ searchParams }: Props) {
  const user = await currentUser()

  if (!user) return <UnauthenticatedView />

  const { p, search, sortBy, sortDir, status } = await searchParams
  const page = Number(p) || 1
  const limit = 10
  const searchQuery = search ?? ""
  const sortByValue: SortOption = isValidSortOption(sortBy)
    ? sortBy
    : "updatedAt"
  const sortDirection: SortDirection = isValidSortDirection(sortDir)
    ? sortDir
    : "desc"
  const statusFilter = status ?? "ALL"

  const result = await getBooks(
    user.id,
    page,
    limit,
    searchQuery,
    sortByValue,
    sortDirection,
    statusFilter,
  )

  if ("error" in result) {
    toast.error(result.error)
    throw new Error(result.error)
  }

  const { books, totalPages } = result

  return (
    <main className="mx-3 py-8 md:mx-12">
      <div className="mb-3 items-center justify-between md:mb-6 md:flex">
        <h1 className="mb-2 text-2xl font-bold md:mb-0">書籍一覧</h1>
        <div className="items-center md:flex">
          <div className="mx-1 py-2">
            <SearchForm initialSearchQuery={searchQuery} />
          </div>
          <div className="flex">
            <div className="mx-1">
              <StatusFilterButton initialStatus={statusFilter} />
            </div>
            <div className="mx-1">
              <SortButton
                initialSortBy={sortByValue}
                initialSortDirection={sortDirection}
              />
            </div>
            <Link href="/books/new" className="mx-1">
              <NewButton />
            </Link>
          </div>
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>タイトル</TableHead>
              <TableHead className="hidden sm:table-cell">著者</TableHead>
              <TableHead>ステータス</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell className="w-2/3 font-medium sm:w-2/5">
                  <Link
                    href={`/books/detail/${book.id}`}
                    key={book.id}
                    className="text-indigo-500 hover:underline"
                  >
                    {book.title}
                  </Link>
                  <div className="text-xs text-slate-500">
                    更新日 {formatDate(book.updatedAt)}
                  </div>
                  <div className="text-xs text-slate-500">
                    登録日 {formatDate(book.createdAt)}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell sm:w-2/5">
                  {book.author ?? "-"}
                </TableCell>
                <TableCell className="w-1/3 sm:w-1/5">
                  <Badge variant={STATUS_CONFIG[book.status as Status].variant}>
                    {STATUS_CONFIG[book.status as Status].label}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {books.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-muted-foreground"
                >
                  登録されている本はありません
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <BookPagination currentPage={page} totalPages={totalPages} />
    </main>
  )
}
