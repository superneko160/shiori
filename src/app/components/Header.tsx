import type { Session } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import { auth, signIn, signOut } from "@/app/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button className="h-10 w-24 rounded-full bg-indigo-500 px-4 py-2 font-medium text-slate-100 hover:bg-indigo-400">
        Sign in
      </button>
    </form>
  )
}

function UserMenu({ user }: { user: Session["user"] }) {
  if (!user) {
    return <SignIn />
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {user.image && (
          <Image
            src={user.image}
            alt="User profile picture"
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <form
            action={async () => {
              "use server"
              await signOut()
            }}
            className="w-full"
          >
            <button type="submit" className="w-full text-left">
              Sign out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

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
