import { CreateBookForm } from "@/app/components/books/CreateBookForm"
import { UnauthenticatedView } from "@/app/components/UnauthenticatedView"
import { currentUser } from "@clerk/nextjs/server"

export default async function NewBookPage() {
  const user = await currentUser()

  if (!user) return <UnauthenticatedView />

  return (
    <div className="mx-3 py-8 md:mx-12">
      <h1 className="mb-6 text-2xl font-bold">書籍登録</h1>
      <CreateBookForm userId={user.id} />
    </div>
  )
}
