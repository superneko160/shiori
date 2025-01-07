"use server"

import { BookStatus, PrismaClient } from "@prisma/client"

type CreateBookInput = {
  title: string
  author: string
  status: BookStatus
  purchasedAt?: Date | null
}

/**
 * 書籍の新規登録
 * @param {FormData} formData フォームに入力されたデータ
 * @return
 */
export async function createBook(formData: FormData) {
  try {
    const data = validateBookData(formData)

    const prisma = new PrismaClient()

    const book = await prisma.book.create({
      data: data,
    })

    return { success: true, book }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "エラーが発生しました" }
  }
}

/**
 * フォームのデータをバリデーションして型安全な形に変換
 */
function validateBookData(formData: FormData): CreateBookInput {
  const title = formData.get("title")
  if (!title || typeof title !== "string") {
    throw new Error("タイトルは必須です")
  }

  const status = formData.get("status")
  if (!status || !Object.values(BookStatus).includes(status as BookStatus)) {
    throw new Error("無効なステータスです")
  }

  return {
    title,
    author: (formData.get("author") as string) || "",
    status: status as BookStatus,
    purchasedAt: formData.get("purchasedAt")
      ? new Date(formData.get("purchasedAt") as string)
      : null,
  }
}
