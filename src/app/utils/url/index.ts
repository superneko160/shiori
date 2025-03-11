/**
 * クエリにページ番号を追加したURLを取得
 * @param {string} baseUrl ベースとなるURL
 * @param {number} page ページ番号
 * @return {string} ページ番号を追加したURL
 */
export function getPageUrl(baseUrl: string, page: number) {
  return `${baseUrl}?p=${page}`
}
