/*
 * Arquivo ProjectsController 
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
import { ProjectsService } from './projects.service';
import { IProjects } from '../interfaces/interfaces';
import { GetId } from '../decorators/param-id.decorator';
import { Roles } from '../decorators/roles.decorator';
import { RoleGuard } from '../guards/role.guard';
import { AuthGuard } from '../guards/auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // Rota para criação de um novo projeto
  @Post()
  async createNewProject(@Body() data: IProjects) {
    return await this.projectsService.createNewProject(data);
  }

  // Rota para buscar todos os projetos no db
  @Get()
  async getAllProjects() {
    return await this.projectsService.getAllProjects();
  }

  // Rota para buscar um projeto pelo id no db
  @Get('query/:id')
  async getProjectById(@GetId() guid_projects: string) {
    return await this.projectsService.getProjectById(guid_projects);
  }

  // Rota para atualizar um projeto pelo id no db
  @Patch('update/:id')
  async updateProjectById(
    @GetId() guid_projects: string,
    @Body() data: IProjects,
  ) {
    return await this.projectsService.updateProjectById(guid_projects, data);
  }

  // Rota para deletar um projeto pelo id no db
  @Roles(['admin, developer'])
  @UseGuards(AuthGuard, RoleGuard)
  @Delete('delete/:id')
  async deleteProjectById(@GetId() guid_projects: string) {
    return await this.projectsService.deleteProjectById(guid_projects);
  }
}
