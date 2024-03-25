"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const prisma_service_1 = require("../prisma/prisma.service");
const departments_controller_1 = require("./departments.controller");
const departments_service_1 = require("./departments.service");
const auth_module_1 = require("../auth/auth.module");
const dept_emp_module_1 = require("../dept-emp/dept-emp.module");
const projects_module_1 = require("../projects/projects.module");
const users_module_1 = require("../users/users.module");
const employees_module_1 = require("../employees/employees.module");
let DepartmentsModule = class DepartmentsModule {
};
exports.DepartmentsModule = DepartmentsModule;
exports.DepartmentsModule = DepartmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            (0, common_1.forwardRef)(() => dept_emp_module_1.DeptEmpModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => projects_module_1.ProjectsModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => employees_module_1.EmployeesModule),
        ],
        controllers: [departments_controller_1.DepartmentsController],
        providers: [prisma_service_1.PrismaService, departments_service_1.DepartmentsService],
        exports: [departments_service_1.DepartmentsService],
    })
], DepartmentsModule);
//# sourceMappingURL=departments.module.js.map