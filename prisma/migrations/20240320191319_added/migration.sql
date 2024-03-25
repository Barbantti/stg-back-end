/*
  Warnings:

  - You are about to alter the column `wage` on the `Employees` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - Added the required column `password` to the `Employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Employees` ADD COLUMN `password` VARCHAR(75) NOT NULL,
    MODIFY `wage` DECIMAL NOT NULL;
