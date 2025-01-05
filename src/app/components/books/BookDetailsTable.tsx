import type { Book } from "@prisma/client"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

import { calculateProgress, statusMap } from "./../../utils/book"
import { formatDate } from "./../../utils/date"

type BookDetailsTableProps = {
  book: Book
}

export function BookDetailsTable({ book }: BookDetailsTableProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="w-1/4 font-medium">タイトル</TableCell>
            <TableCell>{book.title}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">著者</TableCell>
            <TableCell>{book.author ?? "-"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">ステータス</TableCell>
            <TableCell>{statusMap[book.status]}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">進捗</TableCell>
            <TableCell>
              {book.pagesRead && book.totalPages ? (
                <div>
                  {book.pagesRead} / {book.totalPages} ページ （
                  {calculateProgress(book.pagesRead, book.totalPages)}）
                </div>
              ) : (
                "-"
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">購入日</TableCell>
            <TableCell>{formatDate(book.purchasedAt)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">読書開始日</TableCell>
            <TableCell>{formatDate(book.startedAt)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">読了日</TableCell>
            <TableCell>{formatDate(book.finishedAt)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">メモ</TableCell>
            <TableCell>
              {book.note ? (
                <div className="whitespace-pre-wrap">{book.note}</div>
              ) : (
                "-"
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">登録日</TableCell>
            <TableCell>{formatDate(book.createdAt)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">更新日</TableCell>
            <TableCell>{formatDate(book.updatedAt)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
