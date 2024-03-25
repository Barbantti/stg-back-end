import { ProjectsService } from './projects.service';
import { IProjects } from '../interfaces/interfaces';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    createNewProject(data: IProjects): Promise<{
        guid_projects: string;
        projectName: string;
        projectDescription: string;
        status: import(".prisma/client").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
        dept_guid: string;
    }>;
    getAllProjects(): Promise<({
        user: {
            guid_user: string;
            firstName: string;
            lastName: string;
            birthDate: Date;
            email: string;
            password: string;
            createdAt: Date;
            updatedAt: Date;
            roleLevel: import(".prisma/client").$Enums.RoleLevel;
            isActive: import(".prisma/client").$Enums.IsActive;
        }[];
    } & {
        guid_projects: string;
        projectName: string;
        projectDescription: string;
        status: import(".prisma/client").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
        dept_guid: string;
    })[]>;
    getProjectById(guid_projects: string): Promise<{
        guid_projects: string;
        projectName: string;
        projectDescription: string;
        status: import(".prisma/client").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
        dept_guid: string;
    }>;
    updateProjectById(guid_projects: string, data: IProjects): Promise<{
        guid_projects: string;
        projectName: string;
        projectDescription: string;
        status: import(".prisma/client").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
        dept_guid: string;
    }>;
    deleteProjectById(guid_projects: string): Promise<{
        guid_projects: string;
        projectName: string;
        projectDescription: string;
        status: import(".prisma/client").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
        dept_guid: string;
    }>;
}
