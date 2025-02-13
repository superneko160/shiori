import Link from "next/link"
import { getBooks } from "@/app/actions/books"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { currentUser } from "@clerk/nextjs/server"

import type { Status } from "./types"
import { NewButton } from "./components/buttons"
import { UnauthenticatedView } from "./components/UnauthenticatedView"
import { STATUS_CONFIG } from "./consts"

type Props = {
  searchParams: Promise<{
    p?: string
  }>
}

export default async function Home({ searchParams }: Props) {
  const user = await currentUser()

  if (!user) return <UnauthenticatedView />

  const { p } = await searchParams
  const page = Number(p)
  const { books, totalPages } = await getBooks(user.id, page || 1)

  return (
    <main className="mx-3 py-8 md:mx-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">書籍一覧</h1>
        <Link href="/books/new">
          <NewButton />
        </Link>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>タイトル</TableHead>
              <TableHead>著者</TableHead>
              <TableHead>ステータス</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/books/detail/${book.id}`}
                    key={book.id}
                    className="hover:underline"
                  >
                    {book.title}
                  </Link>
                </TableCell>
                <TableCell>{book.author ?? "-"}</TableCell>
                <TableCell>
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
      <div className="py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`?page=${page - 1}`}
                aria-disabled={page <= 1}
                className={page <= 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {/* 最初のページ */}
            <PaginationItem>
              <PaginationLink href="?page=1" isActive={page === 1}>
                1
              </PaginationLink>
            </PaginationItem>

            {/* 省略記号と中間ページ */}
            {page > 3 && <PaginationEllipsis />}

            {page > 2 && page < totalPages && (
              <PaginationItem>
                <PaginationLink href={`?page=${page}`} isActive>
                  {page}
                </PaginationLink>
              </PaginationItem>
            )}

            {page < totalPages - 2 && <PaginationEllipsis />}

            {/* 最後のページ */}
            {totalPages > 1 && (
              <PaginationItem>
                <PaginationLink
                  href={`?page=${totalPages}`}
                  isActive={page === totalPages}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                href={`?page=${page + 1}`}
                aria-disabled={page >= totalPages}
                className={
                  page >= totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  )
}
