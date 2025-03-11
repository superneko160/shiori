import { describe, expect, it } from "vitest"

import { getPageUrl } from "./"

describe("getPageUrl", () => {
  it("ベースURLにページ番号を追加したURLを返す", () => {
    expect(getPageUrl("/books", 1)).toBe("/books?p=1")
    expect(getPageUrl("/books", 5)).toBe("/books?p=5")
    expect(getPageUrl("/users", 10)).toBe("/users?p=10")
  })

  it("空のベースURLの場合でも正しく動作する", () => {
    expect(getPageUrl("", 1)).toBe("?p=1")
    expect(getPageUrl("", 3)).toBe("?p=3")
  })

  it("既存のクエリパラメータがないURLでも正しく動作する", () => {
    expect(getPageUrl("/search", 2)).toBe("/search?p=2")
  })

  it("数値型のページ番号を文字列として正しく連結する", () => {
    expect(getPageUrl("/books", 0)).toBe("/books?p=0")
    expect(getPageUrl("/books", -1)).toBe("/books?p=-1")
  })
})
