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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const employees_service_1 = require("../employees/employees.service");
const users_service_1 = require("../users/users.service");
let AuthGuard = class AuthGuard {
    constructor(auth, employeesService, userService) {
        this.auth = auth;
        this.employeesService = employeesService;
        this.userService = userService;
    }
    async checkTokenValidation(token) {
        try {
            const data = await this.auth.checkTokenValidation(token);
            return data;
        }
        catch (error) {
            throw new common_1.BadRequestException('Error ao validar o token, por favor contate o setor operacional para mais informações!', error);
        }
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const { authorization } = request.headers;
        const token = (authorization ?? '').split(' ')[1];
        if (token) {
            try {
                const data = await this.checkTokenValidation(token);
                if (data.aud === 'user') {
                    request.tokenPayload = data;
                    const user = await this.userService.getUserById(data.guid_user);
                    if (user) {
                        request.user = user;
                        return true;
                    }
                }
                else if (data.aud === 'employee' || data.aud === 'developer' || data.aud === 'admin') {
                    request.tokenPayload = data;
                    const employee = await this.employeesService.getEmployeeById(data.guid_emp);
                    if (employee) {
                        request.employee = employee;
                        return true;
                    }
                }
            }
            catch (error) {
                console.error('Erro ao validar o token', error);
            }
        }
        return false;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        employees_service_1.EmployeesService,
        users_service_1.UsersService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map