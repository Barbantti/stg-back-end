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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const date_fns_1 = require("date-fns");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createNewUser(data) {
        if (data) {
            data.password = await bcrypt.hash(data.password.toString(), await bcrypt.genSalt());
            if (data.birthDate) {
                data.birthDate = (0, date_fns_1.format)(new Date(data.birthDate), 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx');
            }
            const checkIsEmailOnDb = await this.prisma.user.findUnique({
                where: {
                    email: data.email,
                },
            });
            if (checkIsEmailOnDb) {
                throw new common_1.BadRequestException('Email ja cadastrado, por favor utilize outro!');
            }
            else {
                const newUser = await this.prisma.user.create({
                    data: {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        birthDate: data.birthDate,
                        email: data.email,
                        password: data.password,
                    },
                });
                return newUser;
            }
        }
        else {
            throw new common_1.BadRequestException('Dados inválidos, por favor tente novamente criar o cadastro!');
        }
    }
    async getAllUsers() {
        return await this.prisma.user.findMany();
    }
    async getUserById(guid_user) {
        const checkUserId = await this.checkUserId(guid_user);
        if (checkUserId) {
            const userData = await this.prisma.user.findUnique({
                where: {
                    guid_user,
                },
                include: {
                    projects: true,
                }
            });
            return userData;
        }
        else {
            throw new common_1.NotFoundException('Usuário não encontrado!');
        }
    }
    async updateUserById(guid_user, data) {
        const checkUserId = await this.checkUserId(guid_user);
        if (checkUserId && data) {
            data.password = await bcrypt.hash(data.password.toString(), await bcrypt.genSalt());
            if (data.birthDate) {
                data.birthDate = (0, date_fns_1.format)(new Date(data.birthDate), 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx');
            }
            const updatedUser = await this.prisma.user.update({
                where: {
                    guid_user,
                },
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    birthDate: data.birthDate,
                    password: data.password,
                },
            });
            return updatedUser;
        }
        else {
            throw new common_1.NotFoundException('ID inválido, por favor tente novamente realizar a atualização!');
        }
    }
    async deleteUserById(guid_user) {
        const checkUserId = await this.checkUserId(guid_user);
        if (checkUserId) {
            const deletedUser = await this.prisma.user.delete({
                where: {
                    guid_user,
                },
            });
            return deletedUser;
        }
        else {
            throw new common_1.NotFoundException('ID inválido, por favor tente novamente realizar a exclusão!');
        }
    }
    async checkUserId(guid_user) {
        if (!(await this.prisma.user.count({
            where: {
                guid_user,
            },
        }))) {
            throw new common_1.NotFoundException('ID inválido, por favor tente novamente!');
        }
        else {
            return true;
        }
    }
    async getUserRoleLevel(guid_user) {
        const user = await this.prisma.user.findUnique({
            where: {
                guid_user,
            }
        });
        return user.roleLevel;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map