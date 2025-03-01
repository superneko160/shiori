import type { SortDirection, SortOption } from "./../../types"

/**
 * 有効なソートオプションか判定
 * @param {string | undefined} value 判定する値
 * @returns {value is SortOption} valueがupdatedAt or createdAtの場合 true
 */
export function isValidSortOption(
  value: string | undefined,
): value is SortOption {
  return value === "updatedAt" || value === "createdAt"
}

/**
 * 有向なソート方向か判定
 * @param {string | undefined} value 判定する値
 * @returns {value is SortDirection} valueがasc or descの場合 true
 */
export function isValidSortDirection(
  value: string | undefined,
): value is SortDirection {
  return value === "asc" || value === "desc"
}
