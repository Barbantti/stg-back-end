/*
 * Arquivo DeptEmpService 
 *	Autor: Leonardo Barbanti
 */

import { BadRequestException, Injectable } from '@nestjs/common';
import { IDept_emp } from '../interfaces/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeptEmpService {
  constructor(private prisma: PrismaService) {}

  // Logica para criar a Juncão entre departamento e funcionário
  async createNewDeptEmp(data: IDept_emp) {
    console.log('data: ', data);
    const checkedEmployeeId = await this.checkEmployeeId(data);
    const checkedDeptId = await this.checkDeptId(data);

    if (checkedEmployeeId && checkedDeptId) {

      // Checando se o funcionário ja esta associado ao departamento
      const checkEmployeeOnDept = await this.prisma.dept_emp.findFirst({
        where: {
          emp_guid: data.emp_guid,
          departments: {
            guid_dept: data.dept_guid,
          },
        },
      });

      if (checkEmployeeOnDept) {

        // Caso o funcionário esteja associado ao departamento, retornar o departamento no qual ele ja esta associado. Se nao ele faz a Juncão.
        return checkEmployeeOnDept;
      } else {

        const empId = data.emp_guid.toString();
        const checkDept = await this.prisma.departments.findFirst({
          where: {
            guid_dept: data.dept_guid,
          },
        });
        const deptId = checkDept.guid_dept.toString();

        const createNewDeptAndEmpAssociation = await this.prisma.dept_emp.create({
          data: {
            emp_guid: empId,
            dept_guid: deptId,
          },
        });
        console.log('createNewDeptAndEmpAssociation: ', createNewDeptAndEmpAssociation);
        return createNewDeptAndEmpAssociation;
      }
    } else {
      throw new BadRequestException('ID do funcionário ou departamento inválido, por favor tente novamente!');
    }
  }

  // Logica para buscar todas as Junções entre departamentos e funcionários
  async getAllDeptEmp() {
    return await this.prisma.dept_emp.findMany({
      include: {
        employee: true,
        departments: true,
      },
    });
  }

  // Logica para buscar uma Juncão entre departamento e funcionário pelo id
  async getDeptEmpById(guid_deptEmp: string) {
    return await this.prisma.dept_emp.findUnique({
      where: {
        guid_deptEmp: guid_deptEmp,
      },
    });
  }

  // Logica para atualizar uma Juncão entre departamento e funcionário pelo id
  async updateDeptEmpById(guid_deptEmp: string, data: IDept_emp) {
    const checkedDeptEmpId = await this.checkDeptEmpId(guid_deptEmp);

    if (data && checkedDeptEmpId) {
      const updateDeptEmp = await this.prisma.dept_emp.update({
        where: {
          guid_deptEmp: guid_deptEmp,
        },
        data: {
          emp_guid: data.emp_guid,
          dept_guid: data.dept_guid,
        },
      });

      return updateDeptEmp;
    } else {
      throw new BadRequestException('ID do funcionário ou departamento inválido, por favor tente novamente realizar a atualização!');
    }
  }

  // Logica para deletar uma Juncão entre departamento e funcionário pelo id
  async deleteDeptEmpById(guid_deptEmp: string) {
    const checkedDeptEmpId = await this.checkDeptEmpId(guid_deptEmp);

    if (checkedDeptEmpId) {
      const deleteDeptEmp = await this.prisma.dept_emp.delete({
        where: {
          guid_deptEmp: guid_deptEmp,
        },
      });

      return deleteDeptEmp;
    } else {
      throw new BadRequestException('ID da Juncão inválido, por favor tente novamente realizar a exclusão!');
    }
  }

  // Checando se o id da Juncão existe
  async checkDeptEmpId(guid_deptEmp: string): Promise<boolean> {
    if (
      !(await this.prisma.dept_emp.count({
        where: {
          guid_deptEmp: guid_deptEmp,
        },
      }))
    ) {
      throw new BadRequestException('ID inválido, por favor tente novamente!');
    } else {
      return true;
    }
  }

  // Checando se o id do funcionário existe
  async checkEmployeeId(guid_emp: IDept_emp): Promise<boolean> {
    if (
      !(await this.prisma.employees.count({
        where: {
          guid_emp: guid_emp.emp_guid,
        },
      }))
    ) {
      throw new BadRequestException('ID inválido, por favor tente novamente!');
    } else {
      return true;
    }
  }

  // Checando se o id do departamento existe
  async checkDeptId(guid_dept: IDept_emp): Promise<boolean> {
    if (
      !(await this.prisma.departments.count({
        where: {
          guid_dept: guid_dept.dept_guid,
        },
      }))
    ) {
      throw new BadRequestException('ID inválido, por favor tente novamente!');
    } else {
      return true;
    }
  }
}
