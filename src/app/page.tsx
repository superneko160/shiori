import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PrismaClient } from "@prisma/client"

export default async function Home() {
  const prisma = new PrismaClient()

  const books = await prisma.book.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  // ステータスの日本語表示用のマッピング
  const statusMap = {
    CONSIDERING_PURCHASE: "購入検討中",
    PURCHASED_UNREAD: "積読中",
    READING: "読書中",
    COMPLETED: "読了",
  }

  return (
    <main className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">書籍一覧</h1>
        <Link href="/books/new">
          <Button
            variant="default"
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            書籍登録
          </Button>
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
                  {statusMap[book.status as keyof typeof statusMap]}
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
    </main>
  )
}
