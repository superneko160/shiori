"use client"

import { useSearchParams } from "next/navigation"
import { getPageUrl } from "@/app/utils/url"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type BookPaginationProps = {
  currentPage: number
  totalPages: number
  baseUrl?: string
}

export function BookPagination({
  currentPage,
  totalPages,
  baseUrl = "",
}: BookPaginationProps) {
  const searchParams = useSearchParams()

  return (
    <div className="py-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={getPageUrl(baseUrl, currentPage - 1, searchParams)}
              aria-disabled={currentPage <= 1}
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {/* 最初のページ */}
          <PaginationItem>
            <PaginationLink
              href={getPageUrl(baseUrl, 1, searchParams)}
              isActive={currentPage === 1}
            >
              1
            </PaginationLink>
          </PaginationItem>

          {/* 省略記号と中間ページ */}
          {currentPage > 3 && <PaginationEllipsis />}

          {currentPage > 2 && currentPage < totalPages && (
            <PaginationItem>
              <PaginationLink
                href={getPageUrl(baseUrl, currentPage, searchParams)}
                isActive
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>
          )}

          {currentPage < totalPages - 2 && <PaginationEllipsis />}

          {/* 最後のページ */}
          {totalPages > 1 && (
            <PaginationItem>
              <PaginationLink
                href={getPageUrl(baseUrl, totalPages, searchParams)}
                isActive={currentPage === totalPages}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              href={getPageUrl(baseUrl, currentPage + 1, searchParams)}
              aria-disabled={currentPage >= totalPages}
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
