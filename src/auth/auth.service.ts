/*
 * Arquivo AuthService
 *	Autor: Leonardo Barbanti
 */

import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { EmployeesService } from 'src/employees/employees.service';
import * as bcrypt from 'bcrypt';
import { User, Employees } from '@prisma/client';
import { IEmployees, IUser } from 'src/interfaces/interfaces';
@Injectable()
export class AuthService {
  private userIssuer = 'userLogin';
  private employeeIssuer = 'employeeLogin';
  private userAudience = 'user';
  private employeeAudience = 'employee';

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly employeesService: EmployeesService,
  ) {}

  // Logica para validação do Token de acesso
  async checkTokenValidation(token: string) {
    try {
      // Inicia tentando validar o token do user
      if (token) {
        const userData = await this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET,
          issuer: this.userIssuer,
          audience: this.userAudience,
        });

        return userData;
      } else {
        throw new BadRequestException(
          'Token invalido, por favor contate o setor operacional para mais informações!',
        );
      }
    } catch (userError) {
      try {
        // Caso o token do user seja invalido, vamos tentar validar o token do employee
        const employeeData = await this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET,
          issuer: this.employeeIssuer,
          audience: this.employeeAudience,
        });
        return employeeData;
      } catch {
        throw new BadRequestException(
          'Token do invalido, por favor contate o setor operacional para mais informações!',
        );
      }
    }
  }

  // Logica para criar o token de acesso do user
  async createUserToken(user: User) {
    if (user) {
      const UserToken = await this.jwtService.signAsync(
        {
          guid_user: user.guid_user,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '1 day',
          subject: String(user.guid_user),
          issuer: this.userIssuer,
          audience: this.userAudience,
        },
      );

      return UserToken;
    } else {
      throw new BadRequestException(
        'Erro ao gerar novo token de acesso, por favor tente novamente!',
      );
    }
  }

  // Logica para criar o token de acesso do employee
  async createEmployeeToken(employee: Employees) {
    if (employee) {
      const EmployeeToken = await this.jwtService.signAsync(
        {
          guid_emp: employee.guid_emp,
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '1 day',
          subject: String(employee.guid_emp),
          issuer: this.employeeIssuer,
          audience: this.employeeAudience,
        },
      );

      return EmployeeToken;
    } else {
      throw new BadRequestException(
        'Erro ao gerar novo token de acesso, por favor tente novamente!',
      );
    }
  }

  // Logica para checar a validação do token de acesso do user
  async checkUserTokenValidation(userToken: string) {
    try {
      if (userToken) {
        const userData = await this.jwtService.verify(userToken, {
          issuer: this.userIssuer,
          audience: this.userAudience,
        });

        return userData;
      }
    } catch (error) {
      throw new UnauthorizedException(
        'Token inválido, por favor contate o setor operacional para mais informações!',
      );
    }
  }

  // Logica para checar a validação do token de acesso do employee
  async checkEmployeeTokenValidation(employeeToken: string) {
    try {
      if (employeeToken) {
        const employeeData = await this.jwtService.verify(employeeToken, {
          issuer: this.employeeIssuer,
          audience: this.employeeAudience,
        });

        return employeeData;
      }
    } catch (error) {
      throw new UnauthorizedException(
        'Token inválido, por favor contate o setor operacional para mais informações!',
      );
    }
  }

  // Logica para validação boolean de credenciais do user
  isUserValidToken(userToken: string) {
    if (userToken) {
      return true;
    } else {
      return false;
    }
  }

  // Logica para validação boolean de credenciais do employee
  isEmployeeValidToken(employeeToken: string) {
    if (employeeToken) {
      return true;
    } else {
      return false;
    }
  }

  // Logica para login do user
  async userLogin(email: string, password: string) {
    // Validação do email e senha
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('Email inválido, por favor tente novamente!');
    } else if (!(await bcrypt.compare(password, user.password))) {
      throw new NotFoundException('Senha inválido, por favor tente novamente!');
    } else {
      return this.createUserToken(user);
    }
  }

  // Logica para login do employee
  async employeeLogin(email: string, password: string) {
    // Validação do email e senha

    const employee = await this.prisma.employees.findFirst({
      where: {
        email,
      },
    });

    if (!employee) {
      throw new UnauthorizedException(
        'Dados incorretos, por favor tente novamente.',
      );
    }

    if (!(await bcrypt.compare(password, employee.password))) {
      throw new UnauthorizedException(
        'Dados da senha incorretos, por favor tente novamente.',
      );
    }

    return this.createEmployeeToken(employee);
  }

  // Logica para forgot password do user
  async forgotUserPassword(email: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        throw new NotFoundException(
          'Email inválido, por favor tente novamente!',
        );
      } else {
        const newUserToken = await this.jwtService.signAsync(
          {
            guid_user: user.guid_user,
          },
          {
            secret: process.env.JWT_SECRET,
            expiresIn: '15 minutes',
            subject: String(user.guid_user),
            issuer: 'userForgotPassword',
            audience: this.userAudience,
          },
        );

        return user.guid_user, newUserToken;
      }
    } catch (error) {
      throw new BadRequestException(
        'Erro ao gerar novo token de acesso, por favor tente novamente!',
      );
    }
  }

  // Logica para forgot password do employee
  async forgotEmployeePassword(email: string) {
    try {
      const employee = await this.prisma.employees.findFirst({
        where: {
          email,
        },
      });

      if (!employee) {
        throw new NotFoundException(
          'Email inválido, por favor tente novamente!',
        );
      } else {
        const newEmployeeToken = await this.jwtService.signAsync(
          {
            guid_emp: employee.guid_emp,
          },
          {
            secret: process.env.JWT_SECRET,
            expiresIn: '15 minutes',
            subject: String(employee.guid_emp),
            issuer: 'employeeForgotPassword',
            audience: this.employeeAudience,
          },
        );

        return employee.guid_emp, newEmployeeToken;
      }
    } catch (error) {
      throw new BadRequestException(
        'Erro ao gerar novo token de acesso, por favor tente novamente!',
      );
    }
  }

  // Logica para reset password do user
  async userResetPassword(token: string, password: string) {

    // Validando o token
    try {
      const isValidToken = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
        issuer: 'userForgotPassword',
        audience: this.userAudience,
      });

      if (!isValidToken.guid_user) {
        throw new UnauthorizedException(
          'Token inválido, por favor contate o setor operacional para mais informações!',
        );
      } else {
        password = await bcrypt.hash(
          password.toString(),
          await bcrypt.genSalt(),
        );

        const user = await this.prisma.user.update({
          where: {
            guid_user: String(isValidToken.guid_user),
          },
          data: {
            password: password,
          },
        });

        return this.createUserToken(user);
      }
    } catch (error) {
      throw new BadRequestException(
        'Erro ao resetar a senha, por favor tente novamente!',
        error,
      );
    }
  }

  // Logica para reset password do employee
  async employeeResetPassword(token: string, password: string) {
    // Validating token
    try {
      const isValidToken = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
        issuer: 'employeeForgotPassword',
        audience: this.employeeAudience,
      });

      if (!isValidToken.guid_emp) {
        throw new BadRequestException(
          'Token inválido, por favor contate o setor operacional para mais informações!',
        );
      }

      password = await bcrypt.hash(password, await bcrypt.genSalt());

      const employee = await this.prisma.employees.update({
        where: {
          guid_emp: String(isValidToken.guid_emp),
        },
        data: {
          password,
        },
      });

      return this.createEmployeeToken(employee);
    } catch (error) {
      console.log('error', error);
      throw new BadRequestException(
        'Erro ao resetar a senha, por favor tente novamente!',
      );
    }
  }

  // Logica para autenticar a criação de um novo user
  async userRegister(data: IUser) {
    if (data) {
      const user = await this.usersService.createNewUser(data);

      return this.createUserToken(user);
    } else {
      throw new BadRequestException(
        'Erro ao registrar novo usuário, por favor tente novamente!',
      );
    }
  }

  // Logica para autenticar a criação de um novo employee
  async employeeRegister(data: IEmployees) {
    if (data) {
      const employee = await this.employeesService.createNewEmployee(data);

      return this.createEmployeeToken(employee);
    } else {
      throw new BadRequestException(
        'Erro ao registrar novo colaborador, por favor tente novamente!',
      );
    }
  }
}
