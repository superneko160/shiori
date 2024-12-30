import Link from "next/link"

export function Header() {
  return (
    <header className="bg-indigo-400 py-5">
      <div className="container mx-auto">
        <Link href="/">
          <h1 className="px-2 text-slate-100">Shiori</h1>
        </Link>
      </div>
    </header>
  )
}
