import type { SortDirection, SortOption } from "@/app/types"
import Link from "next/link"
import { getBooks } from "@/app/actions/books"
import { BooksTable } from "@/app/components/books/BooksTable"
import {
  NewButton,
  SortButton,
  StatusFilterButton,
} from "@/app/components/buttons"
import { BookPagination } from "@/app/components/pagination"
import { SearchForm } from "@/app/components/SearchForm"
import { UnauthenticatedView } from "@/app/components/UnauthenticatedView"
import { isValidSortDirection, isValidSortOption } from "@/app/utils/validator"
import { currentUser } from "@clerk/nextjs/server"
import { toast } from "sonner"

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

      <BooksTable books={books} />

      <BookPagination currentPage={page} totalPages={totalPages} />
    </main>
  )
}
