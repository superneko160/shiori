import { getBook } from "@/app/actions/books"

import { UpdateBookForm } from "./../../../components/books/UpdateBookForm"

export default async function editBookPage({
  params,
}: {
  params: Promise<{ id: string }>
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
          <UpdateBookForm book={book} />
        </div>
      ) : (
        <div>Book not found</div>
      )}
    </div>
  )
}
