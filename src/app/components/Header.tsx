import Link from "next/link"
import { auth } from "@/app/auth"
import { UserMenu } from "@/app/components/auth/UserAuth"

export async function Header() {
  const session = await auth()

  return (
    <header className="bg-slate-100 py-5 shadow-sm">
      <div className="flex">
        <div className="container ml-8">
          <Link href="/">
            <h1 className="text-xl font-semibold text-slate-900">Shiori</h1>
          </Link>
        </div>
        <div className="mr-8">
          <UserMenu user={session?.user} />
        </div>
      </div>
    </header>
  )
}
