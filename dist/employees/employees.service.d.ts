import { IEmployees } from '../interfaces/interfaces';
import { PrismaService } from '../prisma/prisma.service';
export declare class EmployeesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createNewEmployee(data: IEmployees): Promise<{
        guid_emp: string;
        firstName: string;
        lastName: string;
        birthDate: Date;
        hireDate: Date;
        wage: import("@prisma/client/runtime/library").Decimal;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        roleLevel: import(".prisma/client").$Enums.RoleLevel;
        isActive: import(".prisma/client").$Enums.IsActive;
    }>;
    getAllEmployees(): Promise<{
        guid_emp: string;
        firstName: string;
        lastName: string;
        birthDate: Date;
        hireDate: Date;
        wage: import("@prisma/client/runtime/library").Decimal;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        roleLevel: import(".prisma/client").$Enums.RoleLevel;
        isActive: import(".prisma/client").$Enums.IsActive;
    }[]>;
    getEmployeeById(guid_emp: string): Promise<{
        guid_emp: string;
        firstName: string;
        lastName: string;
        birthDate: Date;
        hireDate: Date;
        wage: import("@prisma/client/runtime/library").Decimal;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        roleLevel: import(".prisma/client").$Enums.RoleLevel;
        isActive: import(".prisma/client").$Enums.IsActive;
    }>;
    updateEmployeeById(guid_emp: string, data: IEmployees): Promise<{
        guid_emp: string;
        firstName: string;
        lastName: string;
        birthDate: Date;
        hireDate: Date;
        wage: import("@prisma/client/runtime/library").Decimal;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        roleLevel: import(".prisma/client").$Enums.RoleLevel;
        isActive: import(".prisma/client").$Enums.IsActive;
    }>;
    deleteEmployeeById(guid_emp: string): Promise<{
        guid_emp: string;
        firstName: string;
        lastName: string;
        birthDate: Date;
        hireDate: Date;
        wage: import("@prisma/client/runtime/library").Decimal;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        roleLevel: import(".prisma/client").$Enums.RoleLevel;
        isActive: import(".prisma/client").$Enums.IsActive;
    }>;
    checkEmployeeId(guid_emp: string): Promise<boolean>;
    getEmployeeRoleLevel(guid_emp: string): Promise<import(".prisma/client").$Enums.RoleLevel>;
}
