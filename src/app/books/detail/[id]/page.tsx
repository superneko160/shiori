import { PrismaClient } from "@prisma/client"

import { BookDetailsTable } from "./../../../components/books/BookDetailsTable"
import { DeleteButton, EditButton } from "./../../../components/buttons"

export default async function editBookPage({
  params,
}: {
  params: { id: string }
}) {
  // ターミナル上で、Next.jsがdynamic route parameterのparamsを非同期で扱うことを要求するエラーが出る
  // App Routerでは、paramsオブジェクトは非同期である可能性があるため、下のようにawaitを付与する必要がある
  // const {id} = await params
  // だが、上記の記述はESLintでは「実際にはPromiseではない（同期的な）値なのにawaitを使用していることを指摘する警告が出る
  const bookId = parseInt(params.id)

  if (isNaN(bookId)) {
    return <div>Invalid book ID</div>
  }

  const prisma = new PrismaClient()

  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
  })

  return (
    <div className="container mx-3 mx-auto py-8">
      {book ? (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="mb-6 text-2xl font-bold">{book.title}</h1>
            <div className="flex">
              <EditButton />
              <DeleteButton />
            </div>
          </div>
          <BookDetailsTable book={book} />
        </div>
      ) : (
        <div>Book not found</div>
      )}
    </div>
  )
}
