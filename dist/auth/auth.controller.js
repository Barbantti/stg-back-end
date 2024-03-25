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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const user_decorator_1 = require("../decorators/user.decorator");
const employee_decorator_1 = require("../decorators/employee.decorator");
const auth_guard_1 = require("../guards/auth.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async userLogin({ email, password }) {
        return await this.authService.userLogin(email, password);
    }
    async employeeLogin({ email, password }) {
        console.log('email, password: ', email, password);
        return await this.authService.employeeLogin(email, password);
    }
    async userRegister(data) {
        return await this.authService.userRegister(data);
    }
    async employeeRegister(data) {
        return await this.authService.employeeRegister(data);
    }
    async forgotUserPassword({ email }) {
        return await this.authService.forgotUserPassword(email);
    }
    async forgotEmployeePassword({ email }) {
        return await this.authService.forgotEmployeePassword(email);
    }
    async userResetPassword({ token, password }) {
        return await this.authService.userResetPassword(token, password);
    }
    async employeeResetPassword({ token, password }) {
        return await this.authService.employeeResetPassword(token, password);
    }
    async userProfile(user) {
        return { user };
    }
    async employeeProfile(employee) {
        return { employee };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('user/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userLogin", null);
__decorate([
    (0, common_1.Post)('employee/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "employeeLogin", null);
__decorate([
    (0, common_1.Post)('user/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userRegister", null);
__decorate([
    (0, common_1.Post)('employee/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "employeeRegister", null);
__decorate([
    (0, common_1.Post)('user/forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotUserPassword", null);
__decorate([
    (0, common_1.Post)('employee/forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotEmployeePassword", null);
__decorate([
    (0, common_1.Post)('user/reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userResetPassword", null);
__decorate([
    (0, common_1.Post)('employee/reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "employeeResetPassword", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('user/profile'),
    __param(0, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userProfile", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('employee/profile'),
    __param(0, (0, employee_decorator_1.EmployeeDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "employeeProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map