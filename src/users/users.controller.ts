/*
 * Arquivo UsersController
 *	Autor: Leonardo Barbanti
 */

import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from '../interfaces/interfaces';
import { GetId } from '../decorators/param-id.decorator';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  // Rota para criar o cadastro de um novo usuário
  @Post()
  async createNewUser(@Body() data: IUser) {
    return await this.usersService.createNewUser(data);
  }

  // Rota para buscar todos os usuários  cadastrados no db
  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  // Rota para buscar um usuário pelo id no db
  @Get('query/:id')
  async getUserById(@GetId() guid_user: string) {
    return await this.usersService.getUserById(guid_user);
  }

  // Rota para atualizar um usuário pelo id no db
  @Patch('update/:id')
  async updateUserById(@GetId() guid_user: string, @Body() data: IUser) {
    return await this.usersService.updateUserById(guid_user, data);
  }

  // Rota para deletar um usuário pelo id no db
  @Delete('delete/:id')
  async deleteUserById(@GetId() guid_user: string) {
    return await this.usersService.deleteUserById(guid_user);
  }
}
