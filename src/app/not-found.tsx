import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container mx-auto py-[50px]">
      <div className="text-center">
        <h2 className="text-2xl">404 - Not Found</h2>
        <Link href="/">
          <button className="mt-4 rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
            ホームに戻る
          </button>
        </Link>
      </div>
    </div>
  )
}
