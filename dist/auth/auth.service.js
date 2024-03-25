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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
const employees_service_1 = require("../employees/employees.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(prisma, jwtService, usersService, employeesService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.employeesService = employeesService;
        this.userIssuer = 'userLogin';
        this.employeeIssuer = 'employeeLogin';
        this.userAudience = 'user';
        this.employeeAudience = 'employee';
    }
    async checkTokenValidation(token) {
        try {
            if (token) {
                const userData = await this.jwtService.verify(token, {
                    secret: process.env.JWT_SECRET,
                    issuer: this.userIssuer,
                    audience: this.userAudience,
                });
                return userData;
            }
            else {
                throw new common_1.BadRequestException('Token invalido, por favor contate o setor operacional para mais informações!');
            }
        }
        catch (userError) {
            try {
                const employeeData = await this.jwtService.verify(token, {
                    secret: process.env.JWT_SECRET,
                    issuer: this.employeeIssuer,
                    audience: this.employeeAudience,
                });
                return employeeData;
            }
            catch {
                throw new common_1.BadRequestException('Token do invalido, por favor contate o setor operacional para mais informações!');
            }
        }
    }
    async createUserToken(user) {
        if (user) {
            const UserToken = await this.jwtService.signAsync({
                guid_user: user.guid_user,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }, {
                secret: process.env.JWT_SECRET,
                expiresIn: '1 day',
                subject: String(user.guid_user),
                issuer: this.userIssuer,
                audience: this.userAudience,
            });
            return UserToken;
        }
        else {
            throw new common_1.BadRequestException('Erro ao gerar novo token de acesso, por favor tente novamente!');
        }
    }
    async createEmployeeToken(employee) {
        if (employee) {
            const EmployeeToken = await this.jwtService.signAsync({
                guid_emp: employee.guid_emp,
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
            }, {
                secret: process.env.JWT_SECRET,
                expiresIn: '1 day',
                subject: String(employee.guid_emp),
                issuer: this.employeeIssuer,
                audience: this.employeeAudience,
            });
            return EmployeeToken;
        }
        else {
            throw new common_1.BadRequestException('Erro ao gerar novo token de acesso, por favor tente novamente!');
        }
    }
    async checkUserTokenValidation(userToken) {
        try {
            if (userToken) {
                const userData = await this.jwtService.verify(userToken, {
                    issuer: this.userIssuer,
                    audience: this.userAudience,
                });
                return userData;
            }
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Token inválido, por favor contate o setor operacional para mais informações!');
        }
    }
    async checkEmployeeTokenValidation(employeeToken) {
        try {
            if (employeeToken) {
                const employeeData = await this.jwtService.verify(employeeToken, {
                    issuer: this.employeeIssuer,
                    audience: this.employeeAudience,
                });
                return employeeData;
            }
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Token inválido, por favor contate o setor operacional para mais informações!');
        }
    }
    isUserValidToken(userToken) {
        if (userToken) {
            return true;
        }
        else {
            return false;
        }
    }
    isEmployeeValidToken(employeeToken) {
        if (employeeToken) {
            return true;
        }
        else {
            return false;
        }
    }
    async userLogin(email, password) {
        const user = await this.prisma.user.findFirst({
            where: {
                email,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('Email inválido, por favor tente novamente!');
        }
        else if (!(await bcrypt.compare(password, user.password))) {
            throw new common_1.NotFoundException('Senha inválido, por favor tente novamente!');
        }
        else {
            return this.createUserToken(user);
        }
    }
    async employeeLogin(email, password) {
        const employee = await this.prisma.employees.findFirst({
            where: {
                email,
            },
        });
        if (!employee) {
            throw new common_1.UnauthorizedException('Dados incorretos, por favor tente novamente.');
        }
        if (!(await bcrypt.compare(password, employee.password))) {
            throw new common_1.UnauthorizedException('Dados da senha incorretos, por favor tente novamente.');
        }
        return this.createEmployeeToken(employee);
    }
    async forgotUserPassword(email) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    email,
                },
            });
            if (!user) {
                throw new common_1.NotFoundException('Email inválido, por favor tente novamente!');
            }
            else {
                const newUserToken = await this.jwtService.signAsync({
                    guid_user: user.guid_user,
                }, {
                    secret: process.env.JWT_SECRET,
                    expiresIn: '15 minutes',
                    subject: String(user.guid_user),
                    issuer: 'userForgotPassword',
                    audience: this.userAudience,
                });
                return user.guid_user, newUserToken;
            }
        }
        catch (error) {
            throw new common_1.BadRequestException('Erro ao gerar novo token de acesso, por favor tente novamente!');
        }
    }
    async forgotEmployeePassword(email) {
        try {
            const employee = await this.prisma.employees.findFirst({
                where: {
                    email,
                },
            });
            if (!employee) {
                throw new common_1.NotFoundException('Email inválido, por favor tente novamente!');
            }
            else {
                const newEmployeeToken = await this.jwtService.signAsync({
                    guid_emp: employee.guid_emp,
                }, {
                    secret: process.env.JWT_SECRET,
                    expiresIn: '15 minutes',
                    subject: String(employee.guid_emp),
                    issuer: 'employeeForgotPassword',
                    audience: this.employeeAudience,
                });
                return employee.guid_emp, newEmployeeToken;
            }
        }
        catch (error) {
            throw new common_1.BadRequestException('Erro ao gerar novo token de acesso, por favor tente novamente!');
        }
    }
    async userResetPassword(token, password) {
        try {
            const isValidToken = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
                issuer: 'userForgotPassword',
                audience: this.userAudience,
            });
            if (!isValidToken.guid_user) {
                throw new common_1.UnauthorizedException('Token inválido, por favor contate o setor operacional para mais informações!');
            }
            else {
                password = await bcrypt.hash(password.toString(), await bcrypt.genSalt());
                const user = await this.prisma.user.update({
                    where: {
                        guid_user: String(isValidToken.guid_user),
                    },
                    data: {
                        password: password,
                    },
                });
                return this.createUserToken(user);
            }
        }
        catch (error) {
            throw new common_1.BadRequestException('Erro ao resetar a senha, por favor tente novamente!', error);
        }
    }
    async employeeResetPassword(token, password) {
        try {
            const isValidToken = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
                issuer: 'employeeForgotPassword',
                audience: this.employeeAudience,
            });
            if (!isValidToken.guid_emp) {
                throw new common_1.BadRequestException('Token inválido, por favor contate o setor operacional para mais informações!');
            }
            password = await bcrypt.hash(password, await bcrypt.genSalt());
            const employee = await this.prisma.employees.update({
                where: {
                    guid_emp: String(isValidToken.guid_emp),
                },
                data: {
                    password,
                },
            });
            return this.createEmployeeToken(employee);
        }
        catch (error) {
            console.log('error', error);
            throw new common_1.BadRequestException('Erro ao resetar a senha, por favor tente novamente!');
        }
    }
    async userRegister(data) {
        if (data) {
            const user = await this.usersService.createNewUser(data);
            return this.createUserToken(user);
        }
        else {
            throw new common_1.BadRequestException('Erro ao registrar novo usuário, por favor tente novamente!');
        }
    }
    async employeeRegister(data) {
        if (data) {
            const employee = await this.employeesService.createNewEmployee(data);
            return this.createEmployeeToken(employee);
        }
        else {
            throw new common_1.BadRequestException('Erro ao registrar novo colaborador, por favor tente novamente!');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        users_service_1.UsersService,
        employees_service_1.EmployeesService])
], AuthService);
//# sourceMappingURL=auth.service.js.map