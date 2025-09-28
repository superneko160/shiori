import { getBook } from "@/app/actions/books"
import { auth } from "@/app/auth"
import { UpdateBookForm } from "@/app/components/books/UpdateBookForm"
import { UnauthenticatedView } from "@/app/components/UnauthenticatedView"

export default async function editBookPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const bookId = parseInt(id)

  const session = await auth()

  if (!session?.user?.email) return <UnauthenticatedView />

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
