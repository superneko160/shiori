import { format } from "date-fns"
import { ja } from "date-fns/locale"

/**
 * 日付フォーマット用のヘルパー関数
 * @param {Date} date | null
 * @return {string} フォーマットされた日付
 */
export function formatDate(date: Date | null) {
  if (!date) return "-"
  return format(date, "yyyy年MM月dd日", { locale: ja })
}

/**
 * 日付オブジェクトをISO文字列形式に変換する
 * @param {Date | null} date - 変換する日付オブジェクト
 * @returns {string} ISO形式の日付文字列（無効な日付の場合は空文字列）
 */
export function dateToString(date: Date | null): string {
  if (!date) return ""
  // 日付が有効かチェック
  return !isNaN(date.getTime()) ? date.toISOString() : ""
}
