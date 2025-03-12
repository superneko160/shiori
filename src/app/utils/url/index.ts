/**
 * クエリにページ番号を追加したURLを取得
 * @param {string} baseUrl ベースとなるURL
 * @param {number} page ページ番号
 * @param {URLSearchParams} searchParams 現在のクエリパラメータ
 * @return {string} ページ番号とその他のパラメータを含むURL
 */
export function getPageUrl(
  baseUrl: string,
  page: number,
  searchParams: URLSearchParams,
) {
  const params = new URLSearchParams(searchParams)
  params.set("p", page.toString())
  return `${baseUrl}?${params.toString()}`
}
