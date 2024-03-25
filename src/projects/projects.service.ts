/*
 * Arquivo ProjectsService 
 *	Autor: Leonardo Barbanti
 */

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { IProjects } from '../interfaces/interfaces';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  // Logica para criar um novo projeto
  async createNewProject(data: IProjects) {
    const employee = await this.getRandomEmployeeFromITDept();

    const itDepartment = await this.prisma.departments.findFirst({
      where: {
        deptName: 'T.I',
      },
    });

    const newProject = await this.prisma.projects.create({
      data: {
        projectName: data.projectName,
        projectDescription: data.projectDescription,
        status: data.status,
        user: {
          connect: {
            guid_user: data.guid_user,
          },
        },
        dept_guid: itDepartment.guid_dept,
        employees: {
          connect: {
            guid_emp: employee.guid_emp,
          },
        },
      },
    });

    return newProject;
  }

  // Logica para buscar todos os projetos no db
  async getAllProjects() {
    return this.prisma.projects.findMany({
      include: {
        user: true,
      },
    });
  }

  // Logica para buscar um projeto pelo id no db
  async getProjectById(guid_projects: string) {
    
    const projectIdChecked = await this.checkProjectId(guid_projects);

    if (projectIdChecked) {
      const projectId = await this.prisma.projects.findUnique({
        where: {
          guid_projects,
        },
        
      });

      return projectId;
    } else {
      throw new NotFoundException('Projeto não encontrado!');
    }
  }

  // Logica para atualizar um projeto pelo id no db
  async updateProjectById(guid_projects: string, data: IProjects) {
    const projectIdChecked = await this.checkProjectId(guid_projects);
    if (projectIdChecked && data.guid_user) {
      const updatedProject = await this.prisma.projects.update({
        where: {
          guid_projects,
        },
        data: {
          projectName: data.projectName,
          projectDescription: data.projectDescription,
          status: data.status,
          user: {
            connect: {
              guid_user: data.guid_user,
            },
          },
        },
      });

      return updatedProject;
    } else {
      throw new NotFoundException('Erro ao atualizar o projeto!');
    }
  }

  // Logica para deletar um projeto pelo id no db
  async deleteProjectById(guid_projects: string) {
    const projectIdChecked = await this.checkProjectId(guid_projects);
    if (projectIdChecked) {
      const deletedProject = await this.prisma.projects.delete({
        where: {
          guid_projects,
        },
      });

      return deletedProject;
    } else {
      throw new NotFoundException('Erro ao deletar o projeto!');
    }
  }

  // Logica para checar id do projeto
  async checkProjectId(guid_projects: string): Promise<boolean> {
    if (
      !(await this.prisma.projects.findUnique({
        where: {
          guid_projects,
        },
      }))
    ) {
      throw new BadRequestException('ID inválido, por favor tente novamente!');
    } else {
      return true;
    }
  }

  // Logica para pegar um funcionário aleatório do departamento de T.I
  async getRandomEmployeeFromITDept() {
    const itDepartment = await this.prisma.departments.findFirst({
      where: {
        deptName: 'T.I',
      },
    });

    if (!itDepartment) {
      throw new Error('Departamento de T.I. não encontrado.');
    }

    const employees = await this.prisma.employees.findMany({
      where: {
        dept_emp: {
          some: {
            dept_guid: itDepartment.guid_dept,
          },
        },
      },
    });

    if (employees.length === 0) {
      throw new Error('Nenhum funcionário encontrado no departamento de T.I.');
    }

    const randomIndex = Math.floor(Math.random() * employees.length);
    return employees[randomIndex];
  }
}
