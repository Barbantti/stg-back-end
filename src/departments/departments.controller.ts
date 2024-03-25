/*
 * Arquivo DepartmentsController
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
import { DepartmentsService } from './departments.service';
import { IDepartments } from "../interfaces/interfaces";
import { GetId } from '../decorators/param-id.decorator';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) { }
  
  // Rota para criar novo departamento
  @Post()
  async createNewDept(@Body() data: IDepartments) {
    return await this.departmentsService.createNewDept(data);
  }

  // Rota para buscar todos os departamentos
  @Get()
  async getAllDepts() {
    return await this.departmentsService.getAllDepts();
  }

  // Rota para buscar um departamento pelo id
  @Get('query/:id')
  async getDeptById(@GetId() guid_dept: string) {
    return await this.departmentsService.getDeptById(guid_dept);
  }

  // Rota para atualizar um departamento pelo id
  @Patch('update/:id')
  async updateDeptById(@GetId() guid_dept: string, @Body() data: IDepartments) {
    return await this.departmentsService.updateDeptById(guid_dept, data);
  }

  // Rota para deletar um departamento pelo id
  @Delete('delete/:id')
  async deleteDeptById(@GetId() guid_dept: string) {
    return await this.departmentsService.deleteDeptById(guid_dept);
  }
}
