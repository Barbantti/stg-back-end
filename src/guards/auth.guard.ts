/*
 * Arquivo AuthGuard 
 *	Autor: Leonardo Barbanti
 */

import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { EmployeesService } from '../employees/employees.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly employeesService: EmployeesService,
    private readonly userService: UsersService,
  ) {}

  // Logica para validação do Token de acesso
  async checkTokenValidation(token: string): Promise<any> {
    try {
			
      const data = await this.auth.checkTokenValidation(token);

      return data;
    } catch (error) {
      throw new BadRequestException(
        'Error ao validar o token, por favor contate o setor operacional para mais informações!',
        error,
      );
    }
  }

  // Verifica se o token de acesso e do tipo user, employee, developer ou admin
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // Verifica se o token existe
    const { authorization } = request.headers;

    const token = (authorization ?? '').split(' ')[1];

    if (token) {
      // Verifica se o token e do tipo user, employee, developer ou admin
      try {
        const data = await this.checkTokenValidation(token);

        if (data.aud === 'user') {

          request.tokenPayload = data;

          const user = await this.userService.getUserById(data.guid_user);

          if (user) {
            request.user = user;

            return true;
          }
        } else if (data.aud === 'employee' || data.aud === 'developer' || data.aud === 'admin') {

          request.tokenPayload = data;

          const employee = await this.employeesService.getEmployeeById(data.guid_emp);

          if (employee) {
            request.employee = employee;

            return true;
          }
        }
      } catch (error) {
        console.error('Erro ao validar o token', error);
      }
    }

    return false;
  }
}
