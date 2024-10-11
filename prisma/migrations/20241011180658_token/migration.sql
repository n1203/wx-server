/*
  Warnings:

  - You are about to alter the column `balance` on the `Token` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `Token` MODIFY `balance` DECIMAL(65, 30) NOT NULL DEFAULT 0;
