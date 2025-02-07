import Link from "next/link"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

export function Header() {
  return (
    <header className="bg-indigo-400 py-5">
      <div className="flex">
        <div className="container ml-8">
          <Link href="/">
            <h1 className="text-lg text-slate-100">Shiori</h1>
          </Link>
        </div>
        <div className="mr-8">
          <SignedOut>
            <SignInButton className="h-10 w-24 rounded-full bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700" />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}
