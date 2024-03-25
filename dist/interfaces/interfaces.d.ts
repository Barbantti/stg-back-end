import { RoleLevel, Status, IsActive } from 'prisma/prisma-client';
export interface IUser {
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    password: string;
}
export interface IEmployees {
    firstName: string;
    lastName: string;
    birthDate: string;
    hireDate: string;
    wage: number;
    email: string;
    password: string;
    roleLevel: RoleLevel;
    projects_guid: IProjects;
    dept_emp: IDept_emp[];
    projects: IProjects[];
}
export interface IDepartments {
    deptName: string;
    Observation: string;
    isActive: IsActive;
    dept_emp: IDept_emp[];
    projects: IProjects[];
}
export interface IProjects {
    projectName: string;
    projectDescription: string;
    status: Status;
    guid_user: string;
}
export interface IDept_emp {
    dept_guid: string;
    emp_guid: string;
}
export interface IResetPass {
    token: string;
    password: string;
}
