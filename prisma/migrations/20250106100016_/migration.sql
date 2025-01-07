/*
  Warnings:

  - Made the column `author` on table `book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pagesRead` on table `book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalPages` on table `book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `note` on table `book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `book` MODIFY `author` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `pagesRead` INTEGER NOT NULL DEFAULT 0,
    MODIFY `totalPages` INTEGER NOT NULL DEFAULT 0,
    MODIFY `note` VARCHAR(191) NOT NULL DEFAULT '';
