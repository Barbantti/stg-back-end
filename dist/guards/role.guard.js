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
exports.RoleGuard = void 0;
const common_1 = require("@nestjs/common");
const employees_service_1 = require("../employees/employees.service");
const users_service_1 = require("../users/users.service");
let RoleGuard = class RoleGuard {
    constructor(userService, employeeService) {
        this.userService = userService;
        this.employeeService = employeeService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        if (request.employee) {
            const guid_emp = request.employee.guid_emp;
            const employeeRoleLevel = await this.employeeService.getEmployeeRoleLevel(guid_emp);
            if (employeeRoleLevel === 'employee' || employeeRoleLevel === 'developer' || employeeRoleLevel === 'admin') {
                console.log('EMPLOYEE ROLE LEVEL: "ACCESS ALLOWED"');
                return true;
            }
        }
        if (request.user) {
            const guid_user = request.user.guid_user;
            const userRoleLevel = await this.userService.getUserRoleLevel(guid_user);
            if (userRoleLevel === 'user') {
                console.log('USER ROLE LEVEL: "ACCESS ALLOWED"');
                return true;
            }
        }
        return false;
    }
};
exports.RoleGuard = RoleGuard;
exports.RoleGuard = RoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        employees_service_1.EmployeesService])
], RoleGuard);
//# sourceMappingURL=role.guard.js.map