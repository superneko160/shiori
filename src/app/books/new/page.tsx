import { CreateBookForm } from "./../../components/books/CreateBookForm"

export default function NewBookPage() {
  return (
    <div className="container mx-3 mx-auto py-8">
      <h1 className="mb-6 text-2xl font-bold">書籍登録</h1>
      <CreateBookForm />
    </div>
  )
}
