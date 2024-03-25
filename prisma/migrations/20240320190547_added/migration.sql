/*
  Warnings:

  - You are about to alter the column `wage` on the `Employees` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - A unique constraint covering the columns `[email]` on the table `Employees` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Employees` ADD COLUMN `email` VARCHAR(75) NOT NULL,
    MODIFY `wage` DECIMAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Employees_email_key` ON `Employees`(`email`);
