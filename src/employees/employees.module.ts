/*
 * Arquivo EmployeesModule 
 *	Autor: Leonardo Barbanti
 */

import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { ProjectsModule } from '../projects/projects.module';
import { DepartmentsModule } from '../departments/departments.module';
import { DeptEmpModule } from '../dept-emp/dept-emp.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    forwardRef(() => ProjectsModule),
    forwardRef(() => DepartmentsModule),
    forwardRef(() => DeptEmpModule),
  ],
  controllers: [EmployeesController],
  providers: [PrismaService, EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
