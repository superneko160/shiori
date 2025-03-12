import { describe, expect, it } from "vitest"

import { getPageUrl } from "./"

describe("getPageUrl", () => {
  it("ベースURLにページ番号を追加したURLを返す", () => {
    const params = new URLSearchParams()
    expect(getPageUrl("/books", 1, params)).toBe("/books?p=1")
    expect(getPageUrl("/books", 5, params)).toBe("/books?p=5")
    expect(getPageUrl("/users", 10, params)).toBe("/users?p=10")
  })

  it("空のベースURLの場合でも正しく動作する", () => {
    const params = new URLSearchParams()
    expect(getPageUrl("", 1, params)).toBe("?p=1")
    expect(getPageUrl("", 3, params)).toBe("?p=3")
  })

  it("既存のクエリパラメータを維持したまま新しいページ番号を追加する", () => {
    const params = new URLSearchParams("status=reading&sort=title")
    expect(getPageUrl("/books", 2, params)).toBe(
      "/books?status=reading&sort=title&p=2",
    )
  })

  it("既存のページパラメータを上書きする", () => {
    const params = new URLSearchParams("status=reading&p=1")
    expect(getPageUrl("/books", 3, params)).toBe("/books?status=reading&p=3")
  })

  it("数値型のページ番号を文字列として正しく連結する", () => {
    const params = new URLSearchParams()
    expect(getPageUrl("/books", 0, params)).toBe("/books?p=0")
    expect(getPageUrl("/books", -1, params)).toBe("/books?p=-1")
  })
})
