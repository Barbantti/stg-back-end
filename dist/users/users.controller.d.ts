import { UsersService } from './users.service';
import { IUser } from '../interfaces/interfaces';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createNewUser(data: IUser): Promise<{
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
    }>;
    getAllUsers(): Promise<{
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
    }[]>;
    getUserById(guid_user: string): Promise<{
        projects: {
            guid_projects: string;
            projectName: string;
            projectDescription: string;
            status: import(".prisma/client").$Enums.Status;
            createdAt: Date;
            updatedAt: Date;
            dept_guid: string;
        }[];
    } & {
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
    }>;
    updateUserById(guid_user: string, data: IUser): Promise<{
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
    }>;
    deleteUserById(guid_user: string): Promise<{
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
    }>;
}
