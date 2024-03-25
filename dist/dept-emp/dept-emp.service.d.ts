import { IDept_emp } from '../interfaces/interfaces';
import { PrismaService } from '../prisma/prisma.service';
export declare class DeptEmpService {
    private prisma;
    constructor(prisma: PrismaService);
    createNewDeptEmp(data: IDept_emp): Promise<{
        guid_deptEmp: string;
        dept_guid: string;
        emp_guid: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllDeptEmp(): Promise<({
        departments: {
            guid_dept: string;
            deptName: string;
            Observation: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: import(".prisma/client").$Enums.IsActive;
        };
        employee: {
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
        };
    } & {
        guid_deptEmp: string;
        dept_guid: string;
        emp_guid: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getDeptEmpById(guid_deptEmp: string): Promise<{
        guid_deptEmp: string;
        dept_guid: string;
        emp_guid: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateDeptEmpById(guid_deptEmp: string, data: IDept_emp): Promise<{
        guid_deptEmp: string;
        dept_guid: string;
        emp_guid: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteDeptEmpById(guid_deptEmp: string): Promise<{
        guid_deptEmp: string;
        dept_guid: string;
        emp_guid: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    checkDeptEmpId(guid_deptEmp: string): Promise<boolean>;
    checkEmployeeId(guid_emp: IDept_emp): Promise<boolean>;
    checkDeptId(guid_dept: IDept_emp): Promise<boolean>;
}
