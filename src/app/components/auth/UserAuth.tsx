import type { Session } from "next-auth"
import Image from "next/image"
import { signIn, signOut } from "@/app/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button className="flex h-10 w-52 items-center justify-center gap-2 rounded-full border border-indigo-500 px-1 py-2 font-medium text-indigo-500 hover:bg-indigo-500 hover:text-slate-100">
        Sign in with Google
        <Image
          width={24}
          height={24}
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google icon"
        />
      </button>
    </form>
  )
}

export function UserMenu({ user }: { user: Session["user"] }) {
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
        {user.name && (
          <div className="border-b border-slate-200 p-1">{user.name}</div>
        )}
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
