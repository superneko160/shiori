"use server"

import { redirect } from "next/navigation"
import { BookStatus, Prisma } from "@prisma/client"

import type {
  Book,
  Books,
  CreateBookInput,
  SortDirection,
  SortOption,
  UpdateBookInput,
} from "./../types"
import { prisma } from "./../database/prismaclient"
import { getDateValue, getNumberValue, getStringValue } from "./../utils/form"

/**
 * 全書籍情報の取得
 * @param {string} userId ユーザID
 * @param {number} page ページ番号（初期値：1）
 * @param {number} limit 1ページの表示件数（初期値：10件）
 * @param {string} searchQuery 検索ワード（初期値：空文字列）
 * @param {SortOption} sortBy ソート項目（初期値：更新日時）
 * @param {SortDirection} sortDirection ソート方向（初期値：降順）
 * @param {string} status 書籍のステータス（初期値：全データ取得）
 * @return {Promise<Books>}
 */
export async function getBooks(
  userId: string,
  page = 1,
  limit = 10,
  searchQuery = "",
  sortBy: SortOption = "updatedAt",
  sortDirection: SortDirection = "desc",
  status = "ALL",
): Promise<Books> {
  try {
    const skip = (page - 1) * limit

    // 検索条件の作成
    const whereCondition: Prisma.BookWhereInput = {
      userId,
      ...(searchQuery
        ? {
            title: {
              contains: searchQuery,
              mode: Prisma.QueryMode.insensitive, // 大文字小文字を区別しない
            },
          }
        : {}),
      ...(status && status !== "ALL" ? { status: status as BookStatus } : {}),
    }

    // ソート条件の作成
    const orderBy = {
      [sortBy]: sortDirection,
    }

    const [books, totalBooks] = await Promise.all([
      prisma.book.findMany({
        where: whereCondition,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.book.count({
        where: whereCondition,
      }),
    ])

    const totalPages = Math.ceil(totalBooks / limit)

    return {
      books,
      totalBooks,
      totalPages,
    }
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
 * @param {string} userId ユーザID
 * @return {Object}　{success: 成否ステータス, 書籍情報}
 */
export async function createBook(formData: FormData, userId: string) {
  try {
    const data = validateBookData(formData, userId)

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
 * @param {string} userId ユーザID
 * @return {CreateBookInput} 新規登録データ
 */
function validateBookData(formData: FormData, userId: string): CreateBookInput {
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
    userId: userId,
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
