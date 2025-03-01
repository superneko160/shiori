import { describe, expect, it } from "vitest"

import { isValidSortDirection, isValidSortOption } from "./"

describe("isValidSortOption", () => {
  it("有効なソートオプションを判定", () => {
    expect(isValidSortOption("updatedAt")).toBe(true)
    expect(isValidSortOption("createdAt")).toBe(true)
  })

  it("無効なソートオプションを判定", () => {
    expect(isValidSortOption("title")).toBe(false)
    expect(isValidSortOption("randomValue")).toBe(false)
    expect(isValidSortOption(undefined)).toBe(false)
  })
})

describe("isValidSortDirection", () => {
  it("有効なソート方向を判定", () => {
    expect(isValidSortDirection("asc")).toBe(true)
    expect(isValidSortDirection("desc")).toBe(true)
  })

  it("無効なソート方向を判定", () => {
    expect(isValidSortDirection("ascending")).toBe(false)
    expect(isValidSortDirection("descending")).toBe(false)
    expect(isValidSortDirection(undefined)).toBe(false)
  })
})
