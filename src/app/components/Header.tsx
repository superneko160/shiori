import Link from "next/link"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

export function Header() {
  return (
    <header className="bg-slate-100 py-5 shadow-sm">
      <div className="flex">
        <div className="container ml-8">
          <Link href="/">
            <h1 className="text-xl font-semibold text-slate-900">Shiori</h1>
          </Link>
        </div>
        <div className="mr-8">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="h-10 w-24 rounded-full bg-indigo-500 px-4 py-2 font-medium text-slate-100 hover:bg-indigo-400">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}
