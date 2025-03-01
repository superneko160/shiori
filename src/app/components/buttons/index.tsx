"use client"

import { useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ArrowDownAZ,
  ArrowUpAZ,
  CirclePlus,
  SquarePen,
  Trash2,
} from "lucide-react"
import { toast } from "sonner"

import type { SortDirection, SortOption } from "./../../types"
import { deleteBook } from "./../../actions/books"

export function NewButton() {
  return (
    <Button
      variant="default"
      className="bg-indigo-500 text-slate-100 hover:bg-indigo-400"
    >
      <CirclePlus className="h-5 w-5" />
      書籍登録
    </Button>
  )
}

export function EditButton() {
  return (
    <div className="m-1">
      <Button variant="secondary" className="bg-slate-100 hover:bg-slate-200">
        <SquarePen className="h-5 w-5" />
        編集
      </Button>
    </div>
  )
}

type DeleteBookButtonProps = {
  bookId: number
}

export function DeleteButton({ bookId }: DeleteBookButtonProps) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    try {
      setIsDeleting(true)

      const result = await deleteBook(bookId)

      if (!result.success) {
        throw new Error(result.error)
      }

      toast.error("書籍の情報を削除しました")
      router.push("/")
    } catch (error) {
      console.error("Error deleting book:", error)
      alert("本の削除に失敗しました")
    } finally {
      setIsDeleting(false)
      setOpen(false)
    }
  }

  return (
    <div className="m-1">
      <button
        onClick={() => setOpen(true)}
        className="ml-2 rounded-md bg-red-500 p-2 text-slate-100 hover:bg-red-400"
        aria-label="本を削除"
      >
        <Trash2 className="h-5 w-5" />
      </button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>本の削除の確認</AlertDialogTitle>
            <AlertDialogDescription>
              本当にこの本を削除してもよろしいですか？
              この操作は取り消すことができません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              キャンセル
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-500 focus:ring-red-600"
            >
              {isDeleting ? "削除中..." : "削除する"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

type SortButtonProps = {
  initialSortBy: SortOption
  initialSortDirection: SortDirection
}

type SortItem = {
  label: string
  value: SortOption
}

export function SortButton({
  initialSortBy,
  initialSortDirection,
}: SortButtonProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const sortItems: SortItem[] = [
    {
      label: "更新日",
      value: "updatedAt",
    },
    {
      label: "登録日",
      value: "createdAt",
    },
  ]

  function getSortLabel() {
    const item = sortItems.find((item) => item.value === initialSortBy)
    return item ? item.label : "ソート"
  }

  function handleSort(sortBy: SortOption) {
    const params = new URLSearchParams(searchParams)
    params.set("sortBy", sortBy)

    // 同じソート項目をクリックした場合は方向を切り替える
    if (sortBy === initialSortBy) {
      params.set("sortDir", initialSortDirection === "desc" ? "asc" : "desc")
    } else {
      // 別のソート項目を選んだ場合はデフォルトで降順
      params.set("sortDir", "desc")
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 py-5">
          {initialSortDirection === "desc" ? (
            <ArrowDownAZ className="h-4 w-4" />
          ) : (
            <ArrowUpAZ className="h-4 w-4" />
          )}
          <span>{getSortLabel()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>並び替え</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sortItems.map((item) => (
          <DropdownMenuItem
            key={item.value}
            className="flex cursor-pointer items-center"
            onClick={() => handleSort(item.value)}
          >
            <span>{item.label}</span>
            {initialSortBy === item.value && (
              <span className="ml-2 text-xs">
                ({initialSortDirection === "desc" ? "降順" : "昇順"})
              </span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
