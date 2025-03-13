"use client"

import { useEffect } from "react"

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto py-[50px]">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold text-red-600">
          エラーが発生しました
        </h2>
        <p className="mb-6 text-gray-600">
          {error.message || "予期せぬエラーが発生しました"}
        </p>
      </div>
    </div>
  )
}
