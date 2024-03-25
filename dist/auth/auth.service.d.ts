import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { EmployeesService } from '../employees/employees.service';
import { User, Employees } from '@prisma/client';
import { IEmployees, IUser } from '../interfaces/interfaces';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly usersService;
    private readonly employeesService;
    private userIssuer;
    private employeeIssuer;
    private userAudience;
    private employeeAudience;
    constructor(prisma: PrismaService, jwtService: JwtService, usersService: UsersService, employeesService: EmployeesService);
    checkTokenValidation(token: string): Promise<any>;
    createUserToken(user: User): Promise<string>;
    createEmployeeToken(employee: Employees): Promise<string>;
    checkUserTokenValidation(userToken: string): Promise<any>;
    checkEmployeeTokenValidation(employeeToken: string): Promise<any>;
    isUserValidToken(userToken: string): boolean;
    isEmployeeValidToken(employeeToken: string): boolean;
    userLogin(email: string, password: string): Promise<string>;
    employeeLogin(email: string, password: string): Promise<string>;
    forgotUserPassword(email: string): Promise<string>;
    forgotEmployeePassword(email: string): Promise<string>;
    userResetPassword(token: string, password: string): Promise<string>;
    employeeResetPassword(token: string, password: string): Promise<string>;
    userRegister(data: IUser): Promise<string>;
    employeeRegister(data: IEmployees): Promise<string>;
}