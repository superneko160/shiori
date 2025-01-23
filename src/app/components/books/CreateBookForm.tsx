"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createBook } from "@/app/actions/books"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

export function CreateBookForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function onSubmit(formData: FormData) {
    setLoading(true)
    const result = await createBook(formData)
    setLoading(false)

    if (result.success) {
      toast.success("書籍の登録が完了しました")
      router.push("/books/new")
    } else {
      toast.error("書籍の登録に失敗しました。再度お試しください")
    }
  }

  return (
    <form action={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          タイトル
        </label>
        <Input id="title" name="title" required className="mt-1" />
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium">
          著者
        </label>
        <Input id="author" name="author" className="mt-1" />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium">
          ステータス
        </label>
        <Select name="status" defaultValue="CONSIDERING_PURCHASE">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CONSIDERING_PURCHASE">購入検討中</SelectItem>
            <SelectItem value="PURCHASED_UNREAD">積読中</SelectItem>
            <SelectItem value="READING">読書中</SelectItem>
            <SelectItem value="COMPLETED">読了</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="purchasedAt" className="block text-sm font-medium">
          購入日
        </label>
        <Input
          type="date"
          id="purchasedAt"
          name="purchasedAt"
          className="mt-1"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        variant="default"
        className="bg-indigo-600 hover:bg-indigo-700"
      >
        {loading ? "登録中" : "登録"}
      </Button>
    </form>
  )
}
