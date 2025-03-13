import { getBook } from "@/app/actions/books"
import { currentUser } from "@clerk/nextjs/server"

import { UpdateBookForm } from "./../../../components/books/UpdateBookForm"
import { UnauthenticatedView } from "./../../../components/UnauthenticatedView"

export default async function editBookPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const bookId = parseInt(id)

  const user = await currentUser()

  if (!user) return <UnauthenticatedView />

  if (isNaN(bookId)) {
    return <div>Invalid book ID</div>
  }

  const result = await getBook(bookId)

  if ("error" in result) {
    throw new Error(result.error)
  }

  const book = result

  return (
    <div className="mx-3 py-8 md:mx-12">
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
