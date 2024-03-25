/*
 * Arquivo EmployeesModule 
 *	Autor: Leonardo Barbanti
 */

import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { DepartmentsModule } from 'src/departments/departments.module';
import { DeptEmpModule } from 'src/dept-emp/dept-emp.module';

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
