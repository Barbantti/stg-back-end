/*
 * Arquivo DeptEmpController 
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
import { DeptEmpService } from './dept-emp.service';
import { IDept_emp } from '../interfaces/interfaces';
import { GetId } from '../decorators/param-id.decorator';
import { Roles } from '../decorators/roles.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

@Controller('dept-emp')
export class DeptEmpController {
  constructor(private readonly deptEmpService: DeptEmpService) {}

  // Rota para criar a Juncão entre departamento e funcionário
  @Post()
  async createNewDeptEmp(@Body() data: IDept_emp) {
    return await this.deptEmpService.createNewDeptEmp(data);
  }

  // Rota para buscar todas as Junções entre departamentos e funcionários
  @Get()
  async getAllDeptEmp() {
    return await this.deptEmpService.getAllDeptEmp();
  }

  // Rota para buscar uma Juncão entre departamento e funcionário pelo id
  @Get('query/:id')
  async getDeptEmpById(@GetId() guid_deptEmp: string) {
    return await this.deptEmpService.getDeptEmpById(guid_deptEmp);
  }

  // Rota para atualizar uma Juncão entre departamento e funcionário pelo id
  @Roles(['admin, developer'])
  @Patch('update/:id')
  async updateDeptEmpById(
    @GetId() guid_deptEmp: string,
    @Body() data: IDept_emp,
  ) {
    return await this.deptEmpService.updateDeptEmpById(guid_deptEmp, data);
  }

  // Rota para deletar uma Juncão entre departamento e funcionário pelo id
  @Roles(['admin, developer'])
  @UseGuards(AuthGuard, RoleGuard)
  @Delete('delete/:id')
  async deleteDeptEmpById(@GetId() guid_deptEmp: string) {
    return await this.deptEmpService.deleteDeptEmpById(guid_deptEmp);
  }
}
