import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { EmployeesService } from '../employees/employees.service';
import { UsersService } from '../users/users.service';
export declare class AuthGuard implements CanActivate {
    private readonly auth;
    private readonly employeesService;
    private readonly userService;
    constructor(auth: AuthService, employeesService: EmployeesService, userService: UsersService);
    checkTokenValidation(token: string): Promise<any>;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
