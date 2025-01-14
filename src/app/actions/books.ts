"use server"

import { redirect } from "next/navigation"
import { BookStatus } from "@prisma/client"

import type { Book } from "./../types"
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
 * @return {Promise<Book[]>}
 */
export async function getBooks(): Promise<Book[]> {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return books
  } catch (error) {
    console.error(error)
    redirect("/error")
  }
}

/**
 * 書籍の取得
 * @param {number} id 書籍ID
 * @return {Promise<Book | null>}
 */
export async function getBook(id: number): Promise<Book | null> {
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: id,
      },
    })

    return book
  } catch (error) {
    console.error(error)
    redirect("/error")
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
 * @return {Object}　{success: 成否ステータス, 書籍情報}
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

/**
 * 書籍情報の削除
 * @param {number} id 書籍ID
 * @return {Object}　{success: 成否ステータス, 書籍情報}
 */
export async function deleteBook(id: number) {
  try {
    // 削除前に書籍が存在するか確認
    const existingBook = await prisma.book.findUnique({
      where: { id: id },
    })

    if (!existingBook) {
      return { success: false, error: "削除対象の書籍が存在しません" }
    }

    const book = await prisma.book.delete({
      where: { id: id },
    })

    return { success: true, book }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "エラーが発生しました" }
  }
}
