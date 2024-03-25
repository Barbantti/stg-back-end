"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProjectsService = class ProjectsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createNewProject(data) {
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
    async getAllProjects() {
        return this.prisma.projects.findMany({
            include: {
                user: true,
            },
        });
    }
    async getProjectById(guid_projects) {
        const projectIdChecked = await this.checkProjectId(guid_projects);
        if (projectIdChecked) {
            const projectId = await this.prisma.projects.findUnique({
                where: {
                    guid_projects,
                },
            });
            return projectId;
        }
        else {
            throw new common_1.NotFoundException('Projeto não encontrado!');
        }
    }
    async updateProjectById(guid_projects, data) {
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
        }
        else {
            throw new common_1.NotFoundException('Erro ao atualizar o projeto!');
        }
    }
    async deleteProjectById(guid_projects) {
        const projectIdChecked = await this.checkProjectId(guid_projects);
        if (projectIdChecked) {
            const deletedProject = await this.prisma.projects.delete({
                where: {
                    guid_projects,
                },
            });
            return deletedProject;
        }
        else {
            throw new common_1.NotFoundException('Erro ao deletar o projeto!');
        }
    }
    async checkProjectId(guid_projects) {
        if (!(await this.prisma.projects.findUnique({
            where: {
                guid_projects,
            },
        }))) {
            throw new common_1.BadRequestException('ID inválido, por favor tente novamente!');
        }
        else {
            return true;
        }
    }
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
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map