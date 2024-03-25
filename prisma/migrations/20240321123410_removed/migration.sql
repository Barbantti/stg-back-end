/*
  Warnings:

  - You are about to alter the column `wage` on the `Employees` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- DropIndex
DROP INDEX `Departments_deptName_key` ON `Departments`;

-- DropIndex
DROP INDEX `Projects_projectName_key` ON `Projects`;

-- AlterTable
ALTER TABLE `Employees` MODIFY `wage` DECIMAL NOT NULL;
