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
