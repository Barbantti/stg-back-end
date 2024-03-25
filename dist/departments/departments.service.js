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
exports.DepartmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DepartmentsService = class DepartmentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createNewDept(data) {
        if (data) {
            const newDept = await this.prisma.departments.create({
                data: {
                    deptName: data.deptName,
                    Observation: data.Observation,
                    isActive: data.isActive,
                },
            });
            return newDept;
        }
        else {
            throw new common_1.BadRequestException('Dados inválidos, por favor tente novamente!');
        }
    }
    async getAllDepts() {
        return this.prisma.departments.findMany();
    }
    async getDeptById(guid_dept) {
        const checkDeptId = await this.checkDeptId(guid_dept);
        if (checkDeptId) {
            const dept = await this.prisma.departments.findUnique({
                where: {
                    guid_dept,
                },
            });
            return dept;
        }
        else {
            throw new common_1.BadRequestException('ID inválido, por favor tente novamente!');
        }
    }
    async updateDeptById(guid_dept, data) {
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
        }
        else {
            throw new common_1.BadRequestException('ID inválido, por favor tente novamente para atualizar o departamento!');
        }
    }
    async deleteDeptById(guid_dept) {
        const checkDeptId = await this.checkDeptId(guid_dept);
        if (checkDeptId) {
            const deletedDept = await this.prisma.departments.delete({
                where: {
                    guid_dept,
                },
            });
            return deletedDept;
        }
        else {
            throw new common_1.BadRequestException('ID inválido, por favor tente novamente para deletar o departamento!');
        }
    }
    async checkDeptId(guid_dept) {
        if (!(await this.prisma.departments.count({
            where: {
                guid_dept
            },
        }))) {
            throw new common_1.BadRequestException('ID inválido, por favor tente novamente!');
        }
        else {
            return true;
        }
    }
};
exports.DepartmentsService = DepartmentsService;
exports.DepartmentsService = DepartmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DepartmentsService);
//# sourceMappingURL=departments.service.js.map