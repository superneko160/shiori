import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

import type { Book, Status } from "./../../types"
import { STATUS_CONFIG } from "./../../consts"
import { formatDate } from "./../../utils/date"
import { ProgressBarCell } from "./../bars"

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
            <TableCell>{book.author}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">ステータス</TableCell>
            <TableCell>
              <Badge variant={STATUS_CONFIG[book.status as Status].variant}>
                {STATUS_CONFIG[book.status as Status].label}
              </Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">進捗</TableCell>
            <TableCell>
              <ProgressBarCell
                pagesRead={book.pagesRead}
                totalPages={book.totalPages}
              />
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
              <div className="whitespace-pre-wrap">{book.note}</div>
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
