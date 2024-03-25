/*
 * Arquivo ProjectsModule 
 *	Autor: Leonardo Barbanti
 */

import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { DeptEmpModule } from 'src/dept-emp/dept-emp.module';
import { DepartmentsModule } from 'src/departments/departments.module';


@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    forwardRef(() => EmployeesModule),
    forwardRef(() => DeptEmpModule),
    forwardRef(() => DepartmentsModule),
  ],
  controllers: [ProjectsController],
  providers: [PrismaService, ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
