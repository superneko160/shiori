import { describe, expect, it } from "vitest"

import { getDateValue, getNumberValue, getStringValue } from "./"

describe("FormData Helpers", () => {
  describe("getStringValue", () => {
    it("通常の文字列を正しく取得できる", () => {
      const formData = new FormData()
      formData.append("name", "テスト太郎")
      expect(getStringValue(formData, "name")).toBe("テスト太郎")
    })

    it("空文字列を正しく取得できる", () => {
      const formData = new FormData()
      formData.append("name", "")
      expect(getStringValue(formData, "name")).toBe("")
    })

    it("存在しないキーの場合は空文字列を返す", () => {
      const formData = new FormData()
      expect(getStringValue(formData, "nonexistent")).toBe("")
    })
  })

  describe("getNumberValue", () => {
    it("数値文字列から正しく数値を取得できる", () => {
      const formData = new FormData()
      formData.append("age", "25")
      expect(getNumberValue(formData, "age")).toBe(25)
    })

    it("負の数値を正しく取得できる", () => {
      const formData = new FormData()
      formData.append("temperature", "-5")
      expect(getNumberValue(formData, "temperature")).toBe(-5)
    })

    it("存在しないキーの場合は0を返す", () => {
      const formData = new FormData()
      expect(getNumberValue(formData, "nonexistent")).toBe(0)
    })

    it("空文字列の場合は0を返す", () => {
      const formData = new FormData()
      formData.append("count", "")
      expect(getNumberValue(formData, "count")).toBe(0)
    })

    it("数値に変換できない文字列の場合は0を返す", () => {
      const formData = new FormData()
      formData.append("invalid", "abc")
      expect(getNumberValue(formData, "invalid")).toBe(0)
    })
  })

  describe("getDateValue", () => {
    it("有効な日付文字列からDateオブジェクトを取得できる", () => {
      const formData = new FormData()
      formData.append("date", "2024-01-16")
      const result = getDateValue(formData, "date")
      expect(result).toBeInstanceOf(Date)
      expect(result?.toISOString().startsWith("2024-01-16")).toBe(true)
    })

    it("ISOString形式の日付を正しく解析できる", () => {
      const formData = new FormData()
      formData.append("date", "2024-01-16T12:00:00.000Z")
      const result = getDateValue(formData, "date")
      expect(result).toBeInstanceOf(Date)
      expect(result?.toISOString()).toBe("2024-01-16T12:00:00.000Z")
    })

    it("存在しないキーの場合はnullを返す", () => {
      const formData = new FormData()
      expect(getDateValue(formData, "nonexistent")).toBeNull()
    })

    it("空文字列の場合はnullを返す", () => {
      const formData = new FormData()
      formData.append("date", "")
      expect(getDateValue(formData, "date")).toBeNull()
    })

    it("無効な日付文字列の場合はnullを返す", () => {
      const formData = new FormData()
      formData.append("date", "invalid-date")
      expect(getDateValue(formData, "date")).toBeNull()
    })
  })
})
