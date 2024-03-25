/*
 * Arquivo EmployeesService 
 *	Autor: Leonardo Barbanti
 */

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { IEmployees } from '../interfaces/interfaces';
import { PrismaService } from '../prisma/prisma.service';
import { format } from "date-fns";
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  // Logica para criar o cadastro de um novo funcionário
  async createNewEmployee(data: IEmployees) {
    if (data) {
      // Usando o bcrypt para criptografar a senha do funcionário
      data.password = await bcrypt.hash(
        data.password.toString(),
        await bcrypt.genSalt(),
      );
      // Usando o format para tratar a data de nascimento
      if (data.birthDate) {
        data.birthDate = format(new Date(data.birthDate), 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx');
      }
      // Usando o format para tratar a data de contratação
      if (data.hireDate) {
        data.hireDate = format(new Date(data.hireDate), 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx');
      }

      // Apos tratar os dados checamos se o email ja existe na base de dados
      const checkIsEmailOnDb = await this.prisma.employees.findUnique({
        where: {
          email: data.email,
        },
      });

      if (checkIsEmailOnDb) {
        throw new BadRequestException(
          'Email ja cadastrado, por favor utilize outro!',
        );
      } else {
        // Se nao existir o email no db, então agora criamos o novo cadastro do funcionário
        const newEmployee = await this.prisma.employees.create({
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            birthDate: data.birthDate,
            hireDate: data.hireDate,
            wage: data.wage,
            email: data.email,
            password: data.password,
            roleLevel: data.roleLevel,
          },
        });
        return newEmployee;
      }
    } else {
      throw new BadRequestException(
        'Dados inválidos, por favor tente novamente criar o cadastro!',
      );
    }
  }

  // Logica para buscar todos os funcionários cadastrados no db
  async getAllEmployees() {
    return await this.prisma.employees.findMany();
  }

  // Logica para buscar um funcionário pelo id no db
  async getEmployeeById(guid_emp: string) {
    // Checando se o id existe
    const checkEmpId = await this.checkEmployeeId(guid_emp);

    if (checkEmpId) {
      const employeeData = await this.prisma.employees.findUnique({
        where: {
          guid_emp,
        },
      });
      return employeeData;
    } else {
      throw new NotFoundException('Funcionário não encontrado!');
    }
  }

  // Logica para atualizar um funcionário pelo id no db
  async updateEmployeeById(guid_emp: string, data: IEmployees) {
    const checkEmpId = await this.checkEmployeeId(guid_emp);

    if (checkEmpId && data) {
      // Usando o bcrypt para criptografar a senha do funcionário
      data.password = await bcrypt.hash(
        data.password.toString(),
        await bcrypt.genSalt(),
      );
      // Usando o format para tratar a data de nascimento
      if (data.birthDate) {
        data.birthDate = format(new Date(data.birthDate), 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx');
      }
      // Usando o format para tratar a data de contratação
      if (data.hireDate) {
        data.hireDate = format(new Date(data.hireDate), 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx');
      }

      // Apos dados serem tratados, atualizamos o cadastro do funcionário

      const updatedEmployee = await this.prisma.employees.update({
        where: {
          guid_emp,
        },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          birthDate: data.birthDate,
          hireDate: data.hireDate,
          wage: data.wage,
          password: data.password,
          roleLevel: data.roleLevel,
        },
      });

      return updatedEmployee;
    } else {
      throw new NotFoundException(
        'ID inválido, por favor tente novamente realizar a atualização!',
      );
    }
  }  

  // Logica para deletar um funcionário pelo id no db
  async deleteEmployeeById(guid_emp: string) {

    console.log('GUID_EMP: ', guid_emp);
    const checkEmpId = await this.checkEmployeeId(guid_emp);
    if (checkEmpId) {
      const deletedEmployee = await this.prisma.employees.delete({
        where: {
          guid_emp,
        },
      });
      return deletedEmployee;
    } else {
      throw new NotFoundException(
        'ID inválido, por favor tente novamente realizar a exclusão!',
      );
    }
  }

  // Logica para checar se o id existe
  async checkEmployeeId(guid_emp: string): Promise<boolean> {
    if (
      !(await this.prisma.employees.count({
        where: {
          guid_emp,
        },
      }))
    ) {
      throw new BadRequestException('ID inválido, por favor tente novamente!');
    } else {
      return true;
    }
  }

  // Logica para checar o nível de permissão
  async getEmployeeRoleLevel(guid_emp: string) {

    const employee = await this.prisma.employees.findUnique({
      where: {
        guid_emp
      },
    });
    return employee.roleLevel;
  }
}
