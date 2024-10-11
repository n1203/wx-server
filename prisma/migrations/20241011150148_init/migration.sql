/*
  Warnings:

  - A unique constraint covering the columns `[wxId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `email` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_wxId_key` ON `User`(`wxId`);
