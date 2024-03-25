"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const projects_module_1 = require("./projects/projects.module");
const projects_service_1 = require("./projects/projects.service");
const projects_controller_1 = require("./projects/projects.controller");
const dept_emp_module_1 = require("./dept-emp/dept-emp.module");
const dept_emp_service_1 = require("./dept-emp/dept-emp.service");
const dept_emp_controller_1 = require("./dept-emp/dept-emp.controller");
const users_module_1 = require("./users/users.module");
const users_service_1 = require("./users/users.service");
const users_controller_1 = require("./users/users.controller");
const departments_module_1 = require("./departments/departments.module");
const departments_service_1 = require("./departments/departments.service");
const departments_controller_1 = require("./departments/departments.controller");
const employees_module_1 = require("./employees/employees.module");
const employees_service_1 = require("./employees/employees.service");
const employees_controller_1 = require("./employees/employees.controller");
const auth_module_1 = require("./auth/auth.module");
const auth_service_1 = require("./auth/auth.service");
const auth_controller_1 = require("./auth/auth.controller");
const prisma_module_1 = require("./prisma/prisma.module");
const prisma_service_1 = require("./prisma/prisma.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const jwt_1 = require("@nestjs/jwt");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            prisma_module_1.PrismaModule,
            (0, common_1.forwardRef)(() => projects_module_1.ProjectsModule),
            (0, common_1.forwardRef)(() => dept_emp_module_1.DeptEmpModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => departments_module_1.DepartmentsModule),
            (0, common_1.forwardRef)(() => employees_module_1.EmployeesModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => jwt_1.JwtModule),
        ],
        controllers: [
            projects_controller_1.ProjectsController,
            dept_emp_controller_1.DeptEmpController,
            users_controller_1.UsersController,
            departments_controller_1.DepartmentsController,
            employees_controller_1.EmployeesController,
            auth_controller_1.AuthController,
            app_controller_1.AppController,
        ],
        providers: [
            projects_service_1.ProjectsService,
            dept_emp_service_1.DeptEmpService,
            users_service_1.UsersService,
            departments_service_1.DepartmentsService,
            employees_service_1.EmployeesService,
            auth_service_1.AuthService,
            prisma_service_1.PrismaService,
            app_service_1.AppService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map