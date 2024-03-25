"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeptEmpModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const prisma_service_1 = require("../prisma/prisma.service");
const dept_emp_controller_1 = require("./dept-emp.controller");
const dept_emp_service_1 = require("./dept-emp.service");
const auth_module_1 = require("../auth/auth.module");
const users_module_1 = require("../users/users.module");
const employees_module_1 = require("../employees/employees.module");
const projects_module_1 = require("../projects/projects.module");
const departments_module_1 = require("../departments/departments.module");
let DeptEmpModule = class DeptEmpModule {
};
exports.DeptEmpModule = DeptEmpModule;
exports.DeptEmpModule = DeptEmpModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => projects_module_1.ProjectsModule),
            (0, common_1.forwardRef)(() => employees_module_1.EmployeesModule),
            (0, common_1.forwardRef)(() => departments_module_1.DepartmentsModule),
        ],
        controllers: [dept_emp_controller_1.DeptEmpController],
        providers: [prisma_service_1.PrismaService, dept_emp_service_1.DeptEmpService],
        exports: [dept_emp_service_1.DeptEmpService],
    })
], DeptEmpModule);
//# sourceMappingURL=dept-emp.module.js.map