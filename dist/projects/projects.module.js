"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const prisma_service_1 = require("../prisma/prisma.service");
const projects_controller_1 = require("./projects.controller");
const projects_service_1 = require("./projects.service");
const auth_module_1 = require("../auth/auth.module");
const users_module_1 = require("../users/users.module");
const employees_module_1 = require("../employees/employees.module");
const dept_emp_module_1 = require("../dept-emp/dept-emp.module");
const departments_module_1 = require("../departments/departments.module");
let ProjectsModule = class ProjectsModule {
};
exports.ProjectsModule = ProjectsModule;
exports.ProjectsModule = ProjectsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => employees_module_1.EmployeesModule),
            (0, common_1.forwardRef)(() => dept_emp_module_1.DeptEmpModule),
            (0, common_1.forwardRef)(() => departments_module_1.DepartmentsModule),
        ],
        controllers: [projects_controller_1.ProjectsController],
        providers: [prisma_service_1.PrismaService, projects_service_1.ProjectsService],
        exports: [projects_service_1.ProjectsService],
    })
], ProjectsModule);
//# sourceMappingURL=projects.module.js.map