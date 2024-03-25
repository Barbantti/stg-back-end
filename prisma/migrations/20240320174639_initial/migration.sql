-- CreateTable
CREATE TABLE `User` (
    `guid_user` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(75) NOT NULL,
    `lastName` VARCHAR(75) NOT NULL,
    `birthDate` DATE NOT NULL,
    `email` VARCHAR(75) NOT NULL,
    `password` VARCHAR(75) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `roleLevel` ENUM('user', 'employee', 'admin', 'developer') NULL DEFAULT 'user',
    `isActive` ENUM('true', 'false') NULL DEFAULT 'true',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`guid_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employees` (
    `guid_emp` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(75) NOT NULL,
    `lastName` VARCHAR(75) NOT NULL,
    `birthDate` DATE NOT NULL,
    `hireDate` DATE NOT NULL,
    `wage` DECIMAL NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `roleLevel` ENUM('user', 'employee', 'admin', 'developer') NULL DEFAULT 'employee',
    `isActive` ENUM('true', 'false') NULL DEFAULT 'true',
    `projects_guid` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`guid_emp`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Departments` (
    `guid_dept` VARCHAR(191) NOT NULL,
    `deptName` VARCHAR(75) NOT NULL,
    `Observation` VARCHAR(150) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isActive` ENUM('true', 'false') NULL DEFAULT 'true',

    UNIQUE INDEX `Departments_deptName_key`(`deptName`),
    PRIMARY KEY (`guid_dept`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Projects` (
    `guid_projects` VARCHAR(191) NOT NULL,
    `projectName` VARCHAR(75) NOT NULL,
    `projectDescription` VARCHAR(150) NOT NULL,
    `status` ENUM('analise', 'producao', 'Concluido') NULL DEFAULT 'analise',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `dept_guid` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Projects_projectName_key`(`projectName`),
    PRIMARY KEY (`guid_projects`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dept_emp` (
    `guid_deptEmp` VARCHAR(191) NOT NULL,
    `dept_guid` VARCHAR(191) NOT NULL,
    `emp_guid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`guid_deptEmp`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Employees` ADD CONSTRAINT `Employees_projects_guid_fkey` FOREIGN KEY (`projects_guid`) REFERENCES `Projects`(`guid_projects`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Projects` ADD CONSTRAINT `Projects_dept_guid_fkey` FOREIGN KEY (`dept_guid`) REFERENCES `Departments`(`guid_dept`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dept_emp` ADD CONSTRAINT `Dept_emp_dept_guid_fkey` FOREIGN KEY (`dept_guid`) REFERENCES `Departments`(`guid_dept`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dept_emp` ADD CONSTRAINT `Dept_emp_emp_guid_fkey` FOREIGN KEY (`emp_guid`) REFERENCES `Employees`(`guid_emp`) ON DELETE RESTRICT ON UPDATE CASCADE;
