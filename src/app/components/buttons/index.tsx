"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { CirclePlus, SquarePen, Trash2 } from "lucide-react"
import { toast } from "sonner"

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
