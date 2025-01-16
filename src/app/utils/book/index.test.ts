import { describe, expect, it } from "vitest"

import { calculateProgress } from "./"

describe("calculateProgress", () => {
  it("正しく進捗率を計算して%付きで返却する", () => {
    expect(calculateProgress(50, 100)).toBe("50.0%")
    expect(calculateProgress(25, 100)).toBe("25.0%")
    expect(calculateProgress(75, 100)).toBe("75.0%")
  })

  it("小数点以下1桁まで計算する", () => {
    expect(calculateProgress(33, 100)).toBe("33.0%")
    expect(calculateProgress(66, 100)).toBe("66.0%")
    expect(calculateProgress(1, 3)).toBe("33.3%")
  })

  it("100%を超える値も計算できる", () => {
    expect(calculateProgress(150, 100)).toBe("150.0%")
  })

  it('読了ページ数が0の場合は"-"を返す', () => {
    expect(calculateProgress(0, 100)).toBe("-")
  })

  it('総ページ数が0の場合は"-"を返す', () => {
    expect(calculateProgress(50, 0)).toBe("-")
  })

  it('引数が未定義の場合は"-"を返す', () => {
    // @ts-expect-error: 引数なしのテスト
    expect(calculateProgress()).toBe("-")
    // @ts-expect-error: 引数が1つのテスト
    expect(calculateProgress(50)).toBe("-")
  })
})
