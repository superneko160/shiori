import { auth } from "@/app/auth"
import { CreateBookForm } from "@/app/components/books/CreateBookForm"
import { UnauthenticatedView } from "@/app/components/UnauthenticatedView"

export default async function NewBookPage() {
  const session = await auth()

  if (!session?.user?.email) return <UnauthenticatedView />

  return (
    <div className="mx-3 py-8 md:mx-12">
      <h1 className="mb-6 text-2xl font-bold">書籍登録</h1>
      <CreateBookForm userId={session.user.email} />
    </div>
  )
}
