import Link from "next/link"
import { getBook } from "@/app/actions/books"
import { BookDetailsTable } from "@/app/components/books/BookDetailsTable"
import { DeleteButton, EditButton } from "@/app/components/buttons"
import { UnauthenticatedView } from "@/app/components/UnauthenticatedView"
import { currentUser } from "@clerk/nextjs/server"

export default async function DetailBookPage({
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
          <div className="mb-6 items-center justify-between md:flex">
            <h1 className="mb-6 text-2xl font-bold">{book.title}</h1>
            <div className="flex">
              <Link href={`/books/edit/${bookId}`}>
                <EditButton />
              </Link>
              <DeleteButton bookId={bookId} />
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
