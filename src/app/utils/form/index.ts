/**
 * FormDataから文字列値を安全に取得
 * @param {FormData} formData
 * @param {string} key
 * @return {string}
 */
export function getStringValue(formData: FormData, key: string): string {
  const value = formData.get(key)
  if (value instanceof File) return ""
  return value ?? ""
}

/**
 * FormDataから数値を安全に取得
 * @param {FormData} formData
 * @param {string} key
 * @return {number}
 */
export function getNumberValue(formData: FormData, key: string): number {
  const value = formData.get(key)
  if (value instanceof File) return 0
  if (!value) return 0
  const num = parseInt(value, 10)
  return isNaN(num) ? 0 : num
}

/**
 * FormDataから日付を安全に取得
 * @param {FormData} formData
 * @param {string} key
 * @return {Date | null}
 */
export function getDateValue(formData: FormData, key: string): Date | null {
  const value = formData.get(key)
  if (!value || value instanceof File) return null
  const date = new Date(value)
  return isNaN(date.getTime()) ? null : date
}
