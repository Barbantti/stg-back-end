/*
 * Arquivo ProjectsModule 
 *	Autor: Leonardo Barbanti
 */

import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { EmployeesModule } from '../employees/employees.module';
import { DeptEmpModule } from '../dept-emp/dept-emp.module';
import { DepartmentsModule } from '../departments/departments.module';


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
