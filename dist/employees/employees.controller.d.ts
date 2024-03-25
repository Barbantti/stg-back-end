import { EmployeesService } from './employees.service';
import { IEmployees } from '../interfaces/interfaces';
export declare class EmployeesController {
    private readonly employeesService;
    constructor(employeesService: EmployeesService);
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
}
