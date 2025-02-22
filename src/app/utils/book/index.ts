import type { BookStatus } from "@prisma/client"

/**
 * ステータスの日本語表示用のマッピング
 */
export const statusMap: Record<BookStatus, string> = {
  CONSIDERING_PURCHASE: "購入検討中",
  PURCHASED_UNREAD: "積読中",
  READING: "読書中",
  COMPLETED: "読了",
}

/**
 * 進捗率の計算
 * @param {number} read 読了ページ数
 * @param {number} total 総ページ数
 * @return {number} 進捗率（小数点下1桁）
 */
export function calculateProgress(read: number, total: number) {
  return Math.round((read / total) * 100 * 10) / 10
}
