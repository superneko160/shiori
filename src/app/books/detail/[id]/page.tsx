import Link from "next/link"
import { getBook } from "@/app/actions/books"

import { BookDetailsTable } from "./../../../components/books/BookDetailsTable"
import { DeleteButton, EditButton } from "./../../../components/buttons"

export default async function editBookPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = await params
  const bookId = parseInt(id)

  if (isNaN(bookId)) {
    return <div>Invalid book ID</div>
  }

  const book = await getBook(bookId)

  return (
    <div className="container mx-3 mx-auto py-8">
      {book ? (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="mb-6 text-2xl font-bold">{book.title}</h1>
            <div className="flex">
              <Link href={`/books/edit/${bookId}`}>
                <EditButton />
              </Link>
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
