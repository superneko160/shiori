"use client"

import { useEffect, useState, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

type SearchFormProps = {
  initialSearchQuery: string
}

export function SearchForm({ initialSearchQuery }: SearchFormProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [isPending, startTransition] = useTransition()

  // 検索条件の変更時にURLを更新する
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchQuery === initialSearchQuery) return

      startTransition(() => {
        const params = new URLSearchParams(searchParams)

        // 検索条件を更新
        if (searchQuery) {
          params.set("search", searchQuery)
        } else {
          params.delete("search")
        }

        // ページを1に戻す
        params.set("p", "1")

        router.push(`${pathname}?${params.toString()}`)
      })
    }, 500) // 500ms遅延で検索実行（タイピング中に何度も検索されるのを防ぐ）

    return () => clearTimeout(debounceTimeout)
  }, [searchQuery, router, pathname, searchParams, initialSearchQuery])

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="タイトルで検索..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-8"
      />
    </div>
  )
}
