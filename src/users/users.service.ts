/*
 * Arquivo UsersService 
 *	Autor: Leonardo Barbanti
 */

import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from 'src/interfaces/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import moment from 'moment';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // Logica para criar o cadastro de um novo usuário
  async createNewUser(data: IUser) {
    if (data) {
      // Usando o bcrypt para criptografar a senha do usuário
      data.password = await bcrypt.hash(
        data.password.toString(),
        await bcrypt.genSalt(),
      );
      // Usando o moment para tratar a data de nascimento
      if (data.birthDate) {
        data.birthDate = moment(data.birthDate, 'YYYY-MM-DD').format(
          'YYYY-MM-DDT00:00:00.000-00:00',
        );
      }

      // Apos tratar os dados checamos se o email ja existe na base de dados
      const checkIsEmailOnDb = await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (checkIsEmailOnDb) {
        throw new BadRequestException(
          'Email ja cadastrado, por favor utilize outro!',
        );
      } else {
        // Se nao existir o email no db, então agora criamos o novo cadastro do usuário
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
    } else {
      throw new BadRequestException(
        'Dados inválidos, por favor tente novamente criar o cadastro!',
      );
    }
  }

  // Logica para buscar todos os usuários  cadastrados no db
  async getAllUsers() {
    return await this.prisma.user.findMany();
  }

  // Logica para buscar um usuário pelo id no db
  async getUserById(guid_user: string) {
    // Checando se o id existe
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
    } else {
      throw new NotFoundException('Usuário não encontrado!');
    }
  }

  // Logica para atualizar um usuário pelo id no db
  async updateUserById(guid_user: string, data: IUser) {
    const checkUserId = await this.checkUserId(guid_user);


    if (checkUserId && data) {
      // Usando o bcrypt para criptografar a senha do usuário
      data.password = await bcrypt.hash(
        data.password.toString(),
        await bcrypt.genSalt(),
      );
      // Usando o moment para tratar a data de nascimento
      if (data.birthDate) {
        data.birthDate = moment(data.birthDate, 'YYYY-MM-DD').format(
          'YYYY-MM-DDT00:00:00.000-00:00',
        );
      }

      // Apos dados serem tratados, atualizamos o cadastro do usuário

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
    } else {
      throw new NotFoundException(
        'ID inválido, por favor tente novamente realizar a atualização!',
      );
    }
  }

  // Logica para deletar um usuário pelo id no db
  async deleteUserById(guid_user: string) {
    const checkUserId = await this.checkUserId(guid_user);

    if (checkUserId) {
      const deletedUser = await this.prisma.user.delete({
        where: {
          guid_user,
        },
      });
      return deletedUser;
    } else {
      throw new NotFoundException(
        'ID inválido, por favor tente novamente realizar a exclusão!',
      );
    }
  }

  // Logica para checar se o id existe
  async checkUserId(guid_user: string): Promise<boolean> {
    if (
      !(await this.prisma.user.count({
        where: {
          guid_user,
        },
      }))
    ) {
      throw new NotFoundException('ID inválido, por favor tente novamente!');
    } else {
      return true;
    }
  }

  // Logica para checar o nível de permissão
  async getUserRoleLevel(guid_user: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        guid_user,
      }
    });

    return user.roleLevel;
  }
}
