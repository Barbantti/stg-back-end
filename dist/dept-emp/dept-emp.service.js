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
exports.DeptEmpService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DeptEmpService = class DeptEmpService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createNewDeptEmp(data) {
        console.log('data: ', data);
        const checkedEmployeeId = await this.checkEmployeeId(data);
        const checkedDeptId = await this.checkDeptId(data);
        if (checkedEmployeeId && checkedDeptId) {
            const checkEmployeeOnDept = await this.prisma.dept_emp.findFirst({
                where: {
                    emp_guid: data.emp_guid,
                    departments: {
                        guid_dept: data.dept_guid,
                    },
                },
            });
            if (checkEmployeeOnDept) {
                return checkEmployeeOnDept;
            }
            else {
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
        }
        else {
            throw new common_1.BadRequestException('ID do funcionário ou departamento inválido, por favor tente novamente!');
        }
    }
    async getAllDeptEmp() {
        return await this.prisma.dept_emp.findMany({
            include: {
                employee: true,
                departments: true,
            },
        });
    }
    async getDeptEmpById(guid_deptEmp) {
        return await this.prisma.dept_emp.findUnique({
            where: {
                guid_deptEmp: guid_deptEmp,
            },
        });
    }
    async updateDeptEmpById(guid_deptEmp, data) {
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
        }
        else {
            throw new common_1.BadRequestException('ID do funcionário ou departamento inválido, por favor tente novamente realizar a atualização!');
        }
    }
    async deleteDeptEmpById(guid_deptEmp) {
        const checkedDeptEmpId = await this.checkDeptEmpId(guid_deptEmp);
        if (checkedDeptEmpId) {
            const deleteDeptEmp = await this.prisma.dept_emp.delete({
                where: {
                    guid_deptEmp: guid_deptEmp,
                },
            });
            return deleteDeptEmp;
        }
        else {
            throw new common_1.BadRequestException('ID da Juncão inválido, por favor tente novamente realizar a exclusão!');
        }
    }
    async checkDeptEmpId(guid_deptEmp) {
        if (!(await this.prisma.dept_emp.count({
            where: {
                guid_deptEmp: guid_deptEmp,
            },
        }))) {
            throw new common_1.BadRequestException('ID inválido, por favor tente novamente!');
        }
        else {
            return true;
        }
    }
    async checkEmployeeId(guid_emp) {
        if (!(await this.prisma.employees.count({
            where: {
                guid_emp: guid_emp.emp_guid,
            },
        }))) {
            throw new common_1.BadRequestException('ID inválido, por favor tente novamente!');
        }
        else {
            return true;
        }
    }
    async checkDeptId(guid_dept) {
        if (!(await this.prisma.departments.count({
            where: {
                guid_dept: guid_dept.dept_guid,
            },
        }))) {
            throw new common_1.BadRequestException('ID inválido, por favor tente novamente!');
        }
        else {
            return true;
        }
    }
};
exports.DeptEmpService = DeptEmpService;
exports.DeptEmpService = DeptEmpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DeptEmpService);
//# sourceMappingURL=dept-emp.service.js.map