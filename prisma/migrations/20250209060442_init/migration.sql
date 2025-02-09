-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('CONSIDERING_PURCHASE', 'PURCHASED_UNREAD', 'READING', 'COMPLETED');

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL DEFAULT '',
    "pagesRead" INTEGER NOT NULL DEFAULT 0,
    "totalPages" INTEGER NOT NULL DEFAULT 0,
    "purchasedAt" TIMESTAMP(3),
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "note" TEXT NOT NULL DEFAULT '',
    "status" "BookStatus" NOT NULL DEFAULT 'CONSIDERING_PURCHASE',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
