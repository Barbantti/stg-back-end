import { DepartmentsService } from './departments.service';
import { IDepartments } from "../interfaces/interfaces";
export declare class DepartmentsController {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    createNewDept(data: IDepartments): Promise<{
        guid_dept: string;
        deptName: string;
        Observation: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: import(".prisma/client").$Enums.IsActive;
    }>;
    getAllDepts(): Promise<{
        guid_dept: string;
        deptName: string;
        Observation: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: import(".prisma/client").$Enums.IsActive;
    }[]>;
    getDeptById(guid_dept: string): Promise<{
        guid_dept: string;
        deptName: string;
        Observation: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: import(".prisma/client").$Enums.IsActive;
    }>;
    updateDeptById(guid_dept: string, data: IDepartments): Promise<{
        guid_dept: string;
        deptName: string;
        Observation: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: import(".prisma/client").$Enums.IsActive;
    }>;
    deleteDeptById(guid_dept: string): Promise<{
        guid_dept: string;
        deptName: string;
        Observation: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: import(".prisma/client").$Enums.IsActive;
    }>;
}
