/*
 * Arquivo RoleGuard 
 *	Autor: Leonardo Barbanti
 */

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { EmployeesService } from '../employees/employees.service';
import { UsersService } from '../users/users.service';


@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly employeeService: EmployeesService
  ) { }
  
  // Verifica o nível de acesso do colaborador ou do usuário
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.employee) {
      const guid_emp = request.employee.guid_emp;
      const employeeRoleLevel = await this.employeeService.getEmployeeRoleLevel(guid_emp);
      
      if (employeeRoleLevel === 'employee' || employeeRoleLevel === 'developer' || employeeRoleLevel === 'admin') {
        console.log('EMPLOYEE ROLE LEVEL: "ACCESS ALLOWED"');
        return true;
      }
    }

    if (request.user) {
      const guid_user = request.user.guid_user;
      const userRoleLevel = await this.userService.getUserRoleLevel(guid_user);

      if (userRoleLevel === 'user') {
        console.log('USER ROLE LEVEL: "ACCESS ALLOWED"');
        return true;
      }
    }

    return false;
  }
}
