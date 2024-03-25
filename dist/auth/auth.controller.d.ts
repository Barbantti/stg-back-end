import { AuthService } from './auth.service';
import { IUser, IEmployees, IResetPass } from "../interfaces/interfaces";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    userLogin({ email, password }: IUser): Promise<string>;
    employeeLogin({ email, password }: IEmployees): Promise<string>;
    userRegister(data: IUser): Promise<string>;
    employeeRegister(data: IEmployees): Promise<string>;
    forgotUserPassword({ email }: IUser): Promise<string>;
    forgotEmployeePassword({ email }: IEmployees): Promise<string>;
    userResetPassword({ token, password }: IResetPass): Promise<string>;
    employeeResetPassword({ token, password }: IResetPass): Promise<string>;
    userProfile(user: any): Promise<{
        user: any;
    }>;
    employeeProfile(employee: any): Promise<{
        employee: any;
    }>;
}
