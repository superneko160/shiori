import { describe, expect, it } from "vitest"

import { calculateProgress } from "./"

describe("calculateProgress", () => {
  it("進捗率を計算する", () => {
    expect(calculateProgress(50, 100)).toBe(50.0)
    expect(calculateProgress(25, 100)).toBe(25.0)
    expect(calculateProgress(75, 100)).toBe(75.0)
  })

  it("小数点以下1桁まで計算する", () => {
    expect(calculateProgress(1, 3)).toBe(33.3)
  })

  it("100%を超える値も計算できる", () => {
    expect(calculateProgress(150, 100)).toBe(150.0)
  })
})
