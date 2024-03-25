/*
  Warnings:

  - You are about to alter the column `wage` on the `Employees` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- AlterTable
ALTER TABLE `Employees` MODIFY `wage` DECIMAL NOT NULL;

-- CreateTable
CREATE TABLE `_ProjectsToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ProjectsToUser_AB_unique`(`A`, `B`),
    INDEX `_ProjectsToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProjectsToUser` ADD CONSTRAINT `_ProjectsToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Projects`(`guid_projects`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectsToUser` ADD CONSTRAINT `_ProjectsToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`guid_user`) ON DELETE CASCADE ON UPDATE CASCADE;
