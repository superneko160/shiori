import { parseISO } from "date-fns"
import { describe, expect, it } from "vitest"

import { formatDate } from "./"

describe("formatDate", () => {
  it('日付を"yyyy年MM月dd日"形式でフォーマットする', () => {
    const testDate = new Date("2024-01-16")
    expect(formatDate(testDate)).toBe("2024年01月16日")
  })

  it("異なる月日でも正しくフォーマットする", () => {
    const dates = [
      { input: new Date("2024-12-31"), expected: "2024年12月31日" },
      { input: new Date("2024-05-01"), expected: "2024年05月01日" },
      { input: new Date("2024-10-10"), expected: "2024年10月10日" },
    ]

    dates.forEach(({ input, expected }) => {
      expect(formatDate(input)).toBe(expected)
    })
  })

  it("うるう年の日付をフォーマットできる", () => {
    const leapDate = new Date("2024-02-29")
    expect(formatDate(leapDate)).toBe("2024年02月29日")
  })

  // ISOString形式の入力でテスト
  it("ISOString形式の日付を正しくフォーマットする", () => {
    const isoDate = parseISO("2024-01-16T12:00:00.000Z")
    expect(formatDate(isoDate)).toBe("2024年01月16日")
  })

  it('nullが渡された場合は"-"を返す', () => {
    expect(formatDate(null)).toBe("-")
  })

  it('undefinedが渡された場合は"-"を返す', () => {
    // @ts-expect-error: undefined をテストするため
    expect(formatDate(undefined)).toBe("-")
  })

  it('引数なしの場合は"-"を返す', () => {
    // @ts-expect-error: 引数なしをテストするため
    expect(formatDate()).toBe("-")
  })
})
