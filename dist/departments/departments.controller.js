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
exports.DepartmentsController = void 0;
const common_1 = require("@nestjs/common");
const departments_service_1 = require("./departments.service");
const param_id_decorator_1 = require("../decorators/param-id.decorator");
let DepartmentsController = class DepartmentsController {
    constructor(departmentsService) {
        this.departmentsService = departmentsService;
    }
    async createNewDept(data) {
        return await this.departmentsService.createNewDept(data);
    }
    async getAllDepts() {
        return await this.departmentsService.getAllDepts();
    }
    async getDeptById(guid_dept) {
        return await this.departmentsService.getDeptById(guid_dept);
    }
    async updateDeptById(guid_dept, data) {
        return await this.departmentsService.updateDeptById(guid_dept, data);
    }
    async deleteDeptById(guid_dept) {
        return await this.departmentsService.deleteDeptById(guid_dept);
    }
};
exports.DepartmentsController = DepartmentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "createNewDept", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "getAllDepts", null);
__decorate([
    (0, common_1.Get)('query/:id'),
    __param(0, (0, param_id_decorator_1.GetId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "getDeptById", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, param_id_decorator_1.GetId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "updateDeptById", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, param_id_decorator_1.GetId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "deleteDeptById", null);
exports.DepartmentsController = DepartmentsController = __decorate([
    (0, common_1.Controller)('departments'),
    __metadata("design:paramtypes", [departments_service_1.DepartmentsService])
], DepartmentsController);
//# sourceMappingURL=departments.controller.js.map