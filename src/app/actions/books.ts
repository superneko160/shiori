"use server"

import { BookStatus } from "@prisma/client"

import { prisma } from "./../database/prismaclient"
import { getDateValue, getNumberValue, getStringValue } from "./../utils/form"

type CreateBookInput = {
  title: string
  author: string
  status: BookStatus
  purchasedAt?: Date | null
}

type UpdateBookInput = {
  id: number
  title: string
  author: string
  pagesRead: number
  totalPages: number
  status: BookStatus
  purchasedAt?: Date | null
  startedAt?: Date | null
  finishedAt?: Date | null
  note: string
}

/**
 * 全書籍情報の取得
 * @return {Array[Book]}
 */
export async function getBooks() {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return books
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * 書籍の取得
 * @param {number} id 書籍ID
 * @return {Book}
 */
export async function getBook(id: number) {
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: id,
      },
    })

    // 日付データの変換（ISOString → Date）
    return {
      ...book,
      purchasedAt: book.purchasedAt?.toISOString() ?? null,
      startedAt: book.startedAt?.toISOString() ?? null,
      finishedAt: book.finishedAt?.toISOString() ?? null,
    }
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * 書籍の新規登録
 * @param {FormData} formData フォームに入力されたデータ
 * @return {Object}　{success: 成否ステータス, 書籍情報}
 */
export async function createBook(formData: FormData) {
  try {
    const data = validateBookData(formData)

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
 * 登録用のフォームのデータをバリデーションして型安全な形に変換
 * @param {FormData} formData フォームに入力されたデータ
 * @return {CreateBookInput} 新規登録データ
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
    author: getStringValue(formData, "author"),
    status: status as BookStatus,
    purchasedAt: getDateValue(formData, "purchasedAt"),
  }
}

/**
 * 書籍情報の更新
 * @param {number} id 書籍ID
 * @param {FormData} formData フォームに入力されたデータ
 */
export async function updateBook(id: number, formData: FormData) {
  try {
    const data = validateUpdateBookData(id, formData)

    const book = await prisma.book.update({
      where: { id: data.id },
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
 * 更新用のフォームデータをバリデーションして型安全な形に変換
 * @param {number} id 書籍ID
 * @param {formData} FormData フォームに入力されたデータ
 * @return {UpdateBookInput} 更新データ
 */
function validateUpdateBookData(
  id: number,
  formData: FormData,
): UpdateBookInput {
  const title = formData.get("title")
  if (!title || typeof title !== "string") {
    throw new Error("タイトルは必須です")
  }

  const status = formData.get("status")
  if (!status || !Object.values(BookStatus).includes(status as BookStatus)) {
    throw new Error("無効なステータスです")
  }

  return {
    id,
    title,
    author: getStringValue(formData, "author"),
    pagesRead: getNumberValue(formData, "pagesRead"),
    totalPages: getNumberValue(formData, "totalPages"),
    status: status as BookStatus,
    purchasedAt: getDateValue(formData, "purchasedAt"),
    startedAt: getDateValue(formData, "startedAt"),
    finishedAt: getDateValue(formData, "finishedAt"),
    note: getStringValue(formData, "note"),
  }
}
