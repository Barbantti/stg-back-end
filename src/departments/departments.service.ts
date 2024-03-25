/*
 * Arquivo DepartmentsService
 *	Autor: Leonardo Barbanti
 */

import { BadRequestException, Injectable } from '@nestjs/common';
import { IDepartments } from '../interfaces/interfaces';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DepartmentsService {
  constructor(private readonly prisma: PrismaService) {}

  // Logica para criar um novo departamento
  async createNewDept(data: IDepartments) {
    if (data) {
      const newDept = await this.prisma.departments.create({
        data: {
          deptName: data.deptName,
          Observation: data.Observation,
          isActive: data.isActive,
        },
      });

      return newDept;
    } else {
      throw new BadRequestException(
        'Dados inválidos, por favor tente novamente!',
      );
    }
  }

  // Logica para buscar todos os departamentos no db
  async getAllDepts() {
    return this.prisma.departments.findMany();
  }

  // Logica para buscar um departamento pelo id no db
  async getDeptById(guid_dept: string) {
    const checkDeptId = await this.checkDeptId(guid_dept);
    if (checkDeptId) {
      const dept = await this.prisma.departments.findUnique({
        where: {
          guid_dept,
        },
      });

      return dept;
    } else {
      throw new BadRequestException('ID inválido, por favor tente novamente!');
    }
  }

  // Logica para atualizar um departamento pelo id no db
  async updateDeptById(guid_dept: string, data: IDepartments) {
    const checkDeptId = await this.checkDeptId(guid_dept);

    if (checkDeptId && data) {
      const updatedDept = await this.prisma.departments.update({
        where: {
          guid_dept,
        },
        data: {
          deptName: data.deptName,
          Observation: data.Observation,
          isActive: data.isActive,
        },
      });

      return updatedDept;
    } else {
      throw new BadRequestException(
        'ID inválido, por favor tente novamente para atualizar o departamento!',
      );
    }
  }

  // Logica para deletar um departamento pelo id no db
  async deleteDeptById(guid_dept: string) {
    const checkDeptId = await this.checkDeptId(guid_dept);
    if (checkDeptId) {
      const deletedDept = await this.prisma.departments.delete({
        where: {
          guid_dept,
        },
      });
      return deletedDept;
    } else {
      throw new BadRequestException(
        'ID inválido, por favor tente novamente para deletar o departamento!',
      );
    }
  }

    // Checando se o id da junção existe
    async checkDeptId(guid_dept: string): Promise<boolean> {
      if (
        !(await this.prisma.departments.count({
          where: {
            guid_dept
          },
        }))
      ) {
        throw new BadRequestException('ID inválido, por favor tente novamente!');
      } else {
        return true;
      }
    }
}
