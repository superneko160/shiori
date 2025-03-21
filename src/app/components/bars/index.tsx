import React from "react"
import { calculateProgress } from "@/app/utils/book"

type ProgressBarCellProps = {
  pagesRead: number
  totalPages: number
}

export function ProgressBarCell({
  pagesRead,
  totalPages,
}: ProgressBarCellProps) {
  if (!pagesRead || !totalPages) {
    return <div>-</div>
  }

  const progress: number = calculateProgress(pagesRead, totalPages)
  const progressResult: string =
    progress > 100 ? "読了ページ数がページ総数を上回っています" : `${progress}%`

  return (
    <div className="relative h-8 w-full">
      <div className="absolute h-full w-full rounded bg-gray-200">
        <div
          className="h-full rounded bg-blue-100 transition-all duration-300 ease-in-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <div className="absolute flex h-full w-full items-center px-3">
        <span className="text-gray-700">
          {pagesRead} / {totalPages} ページ （{progressResult}）
        </span>
      </div>
    </div>
  )
}
