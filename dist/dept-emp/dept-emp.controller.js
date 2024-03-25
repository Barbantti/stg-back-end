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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeptEmpController = void 0;
const common_1 = require("@nestjs/common");
const dept_emp_service_1 = require("./dept-emp.service");
const param_id_decorator_1 = require("../decorators/param-id.decorator");
const roles_decorator_1 = require("../decorators/roles.decorator");
const auth_guard_1 = require("../guards/auth.guard");
const role_guard_1 = require("../guards/role.guard");
let DeptEmpController = class DeptEmpController {
    constructor(deptEmpService) {
        this.deptEmpService = deptEmpService;
    }
    async createNewDeptEmp(data) {
        return await this.deptEmpService.createNewDeptEmp(data);
    }
    async getAllDeptEmp() {
        return await this.deptEmpService.getAllDeptEmp();
    }
    async getDeptEmpById(guid_deptEmp) {
        return await this.deptEmpService.getDeptEmpById(guid_deptEmp);
    }
    async updateDeptEmpById(guid_deptEmp, data) {
        return await this.deptEmpService.updateDeptEmpById(guid_deptEmp, data);
    }
    async deleteDeptEmpById(guid_deptEmp) {
        return await this.deptEmpService.deleteDeptEmpById(guid_deptEmp);
    }
};
exports.DeptEmpController = DeptEmpController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeptEmpController.prototype, "createNewDeptEmp", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DeptEmpController.prototype, "getAllDeptEmp", null);
__decorate([
    (0, common_1.Get)('query/:id'),
    __param(0, (0, param_id_decorator_1.GetId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeptEmpController.prototype, "getDeptEmpById", null);
__decorate([
    (0, roles_decorator_1.Roles)(['admin, developer']),
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, param_id_decorator_1.GetId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DeptEmpController.prototype, "updateDeptEmpById", null);
__decorate([
    (0, roles_decorator_1.Roles)(['admin, developer']),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RoleGuard),
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, param_id_decorator_1.GetId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeptEmpController.prototype, "deleteDeptEmpById", null);
exports.DeptEmpController = DeptEmpController = __decorate([
    (0, common_1.Controller)('dept-emp'),
    __metadata("design:paramtypes", [dept_emp_service_1.DeptEmpService])
], DeptEmpController);
//# sourceMappingURL=dept-emp.controller.js.map