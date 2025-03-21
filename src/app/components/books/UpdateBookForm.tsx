"use client"

import type { Book } from "@/app/types"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateBook } from "@/app/actions/books"
import { dateToString } from "@/app/utils/date"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { toast } from "sonner"

type BookDetailsTableProps = {
  book: Book
}

export function UpdateBookForm({ book }: BookDetailsTableProps) {
  const router = useRouter()

  async function onSubmit(formData: FormData) {
    const result = await updateBook(book.id, formData)

    if (result.success) {
      toast.success("書籍の情報を更新しました")
      router.push(`/books/detail/${book.id}`)
    } else {
      toast.error(result.error)
    }
  }

  return (
    <form action={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          タイトル
        </label>
        <Input
          id="title"
          name="title"
          defaultValue={book.title}
          required
          className="mt-1"
        />
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium">
          著者
        </label>
        <Input
          id="author"
          name="author"
          defaultValue={book.author}
          className="mt-1"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium">
          ステータス
        </label>
        <Select name="status" defaultValue={book.status}>
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="pagesRead" className="block text-sm font-medium">
            読了ページ数
          </label>
          <Input
            type="number"
            id="pagesRead"
            name="pagesRead"
            defaultValue={book.pagesRead}
            min="0"
            className="mt-1"
          />
        </div>
        <div>
          <label htmlFor="totalPages" className="block text-sm font-medium">
            総ページ数
          </label>
          <Input
            type="number"
            id="totalPages"
            name="totalPages"
            defaultValue={book.totalPages}
            min="0"
            className="mt-1"
          />
        </div>
      </div>

      <DateSelect
        defaultValue={book.purchasedAt}
        name="purchasedAt"
        label="購入日"
      />

      <DateSelect
        defaultValue={book.startedAt}
        name="startedAt"
        label="読書開始日"
      />

      <DateSelect
        defaultValue={book.finishedAt}
        name="finishedAt"
        label="読了日"
      />

      <div>
        <label className="text-sm font-medium">メモ</label>
        <Textarea defaultValue={book.note} name="note" rows={4} />
      </div>

      <Button
        type="submit"
        variant="default"
        className="bg-indigo-500 text-slate-100 hover:bg-indigo-400"
      >
        登録
      </Button>
    </form>
  )
}

function DateSelect({
  defaultValue,
  name,
  label,
}: {
  defaultValue: Date | null
  name: string
  label: string
}) {
  // 初期値を適切にDate型に変換
  const initialDate = defaultValue ? new Date(defaultValue) : null
  const [date, setDate] = useState<Date | null>(initialDate)

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>
      <input type="hidden" name={name} value={dateToString(date)} />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "yyyy/MM/dd") : "日付を選択"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date ?? undefined}
            onSelect={(newDate: Date | undefined) => setDate(newDate ?? null)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
