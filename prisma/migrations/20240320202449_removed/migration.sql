/*
  Warnings:

  - You are about to drop the column `projects_guid` on the `Employees` table. All the data in the column will be lost.
  - You are about to alter the column `wage` on the `Employees` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- DropForeignKey
ALTER TABLE `Employees` DROP FOREIGN KEY `Employees_projects_guid_fkey`;

-- AlterTable
ALTER TABLE `Employees` DROP COLUMN `projects_guid`,
    MODIFY `wage` DECIMAL NOT NULL;

-- CreateTable
CREATE TABLE `_EmployeesToProjects` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_EmployeesToProjects_AB_unique`(`A`, `B`),
    INDEX `_EmployeesToProjects_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_EmployeesToProjects` ADD CONSTRAINT `_EmployeesToProjects_A_fkey` FOREIGN KEY (`A`) REFERENCES `Employees`(`guid_emp`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployeesToProjects` ADD CONSTRAINT `_EmployeesToProjects_B_fkey` FOREIGN KEY (`B`) REFERENCES `Projects`(`guid_projects`) ON DELETE CASCADE ON UPDATE CASCADE;
