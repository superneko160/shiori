import type { Book, Status } from "@/app/types"
import Link from "next/link"
import { STATUS_CONFIG } from "@/app/consts"
import { formatDate } from "@/app/utils/date"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type BooksTableProps = {
  books: Book[]
}

export function BooksTable({ books }: BooksTableProps) {
  return (
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
  )
}
