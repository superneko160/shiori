import { currentUser } from "@clerk/nextjs/server"

import { CreateBookForm } from "./../../components/books/CreateBookForm"

export default async function NewBookPage() {
  const user = await currentUser()

  if (!user) return <div>新規登録 or ログインしてください</div>

  return (
    <div className="container mx-3 mx-auto py-8">
      <h1 className="mb-6 text-2xl font-bold">書籍登録</h1>
      <CreateBookForm userId={user.id} />
    </div>
  )
}
