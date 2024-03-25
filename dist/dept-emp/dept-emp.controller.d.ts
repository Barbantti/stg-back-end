import { DeptEmpService } from './dept-emp.service';
import { IDept_emp } from '../interfaces/interfaces';
export declare class DeptEmpController {
    private readonly deptEmpService;
    constructor(deptEmpService: DeptEmpService);
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
}
