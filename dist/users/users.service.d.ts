import { IUser } from '../interfaces/interfaces';
import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    checkUserId(guid_user: string): Promise<boolean>;
    getUserRoleLevel(guid_user: string): Promise<import(".prisma/client").$Enums.RoleLevel>;
}
