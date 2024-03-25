/*
 * Arquivo EmployeesController 
 *	Autor: Leonardo Barbanti
 */

import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { IEmployees } from 'src/interfaces/interfaces';
import { GetId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('employee')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  // Rota para criar o cadastro de um novo funcionário
  @Post()
  async createNewEmployee(@Body() data: IEmployees) {
    return await this.employeesService.createNewEmployee(data);
  }

  // Rota para buscar todos os funcionários cadastrados no db
  @Get()
  async getAllEmployees() {
    return await this.employeesService.getAllEmployees();
  }

  // Rota para buscar um funcionário pelo id no db
  @Get('query/:id')
  async getEmployeeById(@GetId() guid_emp: string) {
    return await this.employeesService.getEmployeeById(guid_emp);
  }

  // Rota para atualizar um funcionário pelo id no db
  @Patch('update/:id')
  async updateEmployeeById(
    @GetId() guid_emp: string,
    @Body() data: IEmployees,
  ) {
    return await this.employeesService.updateEmployeeById(guid_emp, data);
  }

  // Rota para deletar um funcionário pelo id no db
  @Roles(['admin, developer'])
  @UseGuards(AuthGuard, RoleGuard)
  @Delete('delete/:id')
  async deleteEmployeeById(@GetId() guid_emp: string) {
    console.log('object: ', guid_emp);
    return await this.employeesService.deleteEmployeeById(guid_emp);
  }
}
