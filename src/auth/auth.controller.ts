/*
 * Arquivo AuthController
 *	Autor: Leonardo Barbanti
 */

import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUser, IEmployees, IResetPass } from "src/interfaces/interfaces";
import { UserDecorator } from 'src/decorators/user.decorator';
import { EmployeeDecorator } from 'src/decorators/employee.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // Rota para login autenticado
  @Post('user/login')
  async userLogin(@Body() {email, password}: IUser) {
    return await this.authService.userLogin(email, password);
  }

  // Rota para login autenticado
  @Post('employee/login') 
  async employeeLogin(@Body() {email, password}: IEmployees) {
    return await this.authService.employeeLogin(email, password);
  }

  // Rota para registrar um novo usuário com autenticação
  @Post('user/register')
    async userRegister(@Body() data: IUser) {
      return await this.authService.userRegister(data);
  }
  
  // Rota para registrar um novo funcionário com autenticação
  @Post('employee/register')
    async employeeRegister(@Body() data: IEmployees) {
      return await this.authService.employeeRegister(data);
    }

  // Rota para realizar o forgot password de um usuário
  @Post('user/forgot-password')
  async forgotUserPassword(@Body() {email}: IUser) {
    return await this.authService.forgotUserPassword(email);
  }

  // Rota para realizar o forgot password de um funcionário
  @Post('employee/forgot-password')
  async forgotEmployeePassword(@Body() {email}: IEmployees) {
    return await this.authService.forgotEmployeePassword(email);
  }

  // Rota para realizar reset na senha de um usuário
  @Post('user/reset-password')
  async userResetPassword(@Body() { token, password }: IResetPass) {
    return await this.authService.userResetPassword(token, password);
  }

  @Post('employee/reset-password')
  async employeeResetPassword(@Body() {token, password}: IResetPass) {
    return await this.authService.employeeResetPassword(token, password);
  }

  @UseGuards(AuthGuard)
  @Post('user/profile')
  async userProfile(@UserDecorator() user) {
    return { user };
  }

  @UseGuards(AuthGuard)
  @Post('employee/profile')
  async employeeProfile(@EmployeeDecorator() employee) {
    return { employee };
  }
}
