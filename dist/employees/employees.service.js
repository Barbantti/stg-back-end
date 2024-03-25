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
exports.EmployeesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const date_fns_1 = require("date-fns");
const bcrypt = require("bcrypt");
let EmployeesService = class EmployeesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createNewEmployee(data) {
        if (data) {
            data.password = await bcrypt.hash(data.password.toString(), await bcrypt.genSalt());
            if (data.birthDate) {
                data.birthDate = (0, date_fns_1.format)(new Date(data.birthDate), 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx');
            }
            if (data.hireDate) {
                data.hireDate = (0, date_fns_1.format)(new Date(data.hireDate), 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx');
            }
            const checkIsEmailOnDb = await this.prisma.employees.findUnique({
                where: {
                    email: data.email,
                },
            });
            if (checkIsEmailOnDb) {
                throw new common_1.BadRequestException('Email ja cadastrado, por favor utilize outro!');
            }
            else {
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
        }
        else {
            throw new common_1.BadRequestException('Dados inválidos, por favor tente novamente criar o cadastro!');
        }
    }
    async getAllEmployees() {
        return await this.prisma.employees.findMany();
    }
    async getEmployeeById(guid_emp) {
        const checkEmpId = await this.checkEmployeeId(guid_emp);
        if (checkEmpId) {
            const employeeData = await this.prisma.employees.findUnique({
                where: {
                    guid_emp,
                },
            });
            return employeeData;
        }
        else {
            throw new common_1.NotFoundException('Funcionário não encontrado!');
        }
    }
    async updateEmployeeById(guid_emp, data) {
        const checkEmpId = await this.checkEmployeeId(guid_emp);
        if (checkEmpId && data) {
            data.password = await bcrypt.hash(data.password.toString(), await bcrypt.genSalt());
            if (data.birthDate) {
                data.birthDate = (0, date_fns_1.format)(new Date(data.birthDate), 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx');
            }
            if (data.hireDate) {
                data.hireDate = (0, date_fns_1.format)(new Date(data.hireDate), 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx');
            }
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
        }
        else {
            throw new common_1.NotFoundException('ID inválido, por favor tente novamente realizar a atualização!');
        }
    }
    async deleteEmployeeById(guid_emp) {
        console.log('GUID_EMP: ', guid_emp);
        const checkEmpId = await this.checkEmployeeId(guid_emp);
        if (checkEmpId) {
            const deletedEmployee = await this.prisma.employees.delete({
                where: {
                    guid_emp,
                },
            });
            return deletedEmployee;
        }
        else {
            throw new common_1.NotFoundException('ID inválido, por favor tente novamente realizar a exclusão!');
        }
    }
    async checkEmployeeId(guid_emp) {
        if (!(await this.prisma.employees.count({
            where: {
                guid_emp,
            },
        }))) {
            throw new common_1.BadRequestException('ID inválido, por favor tente novamente!');
        }
        else {
            return true;
        }
    }
    async getEmployeeRoleLevel(guid_emp) {
        const employee = await this.prisma.employees.findUnique({
            where: {
                guid_emp
            },
        });
        return employee.roleLevel;
    }
};
exports.EmployeesService = EmployeesService;
exports.EmployeesService = EmployeesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmployeesService);
//# sourceMappingURL=employees.service.js.map