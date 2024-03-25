import { CanActivate, ExecutionContext } from '@nestjs/common';
import { EmployeesService } from '../employees/employees.service';
import { UsersService } from '../users/users.service';
export declare class RoleGuard implements CanActivate {
    private readonly userService;
    private readonly employeeService;
    constructor(userService: UsersService, employeeService: EmployeesService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
