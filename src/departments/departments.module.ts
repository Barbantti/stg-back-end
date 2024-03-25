/*
 * Arquivo DepartmentsModule
 *	Autor: Leonardo Barbanti
 */

import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { AuthModule } from 'src/auth/auth.module';
import { DeptEmpModule } from 'src/dept-emp/dept-emp.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { UsersModule } from 'src/users/users.module';
import { EmployeesModule } from 'src/employees/employees.module';


@Module({
  imports: [
    forwardRef(() => PrismaModule),
    forwardRef(() => DeptEmpModule),
    forwardRef(() => UsersModule),
    forwardRef(() => ProjectsModule),
    forwardRef(() => AuthModule),
    forwardRef(() => EmployeesModule),],
    controllers: [DepartmentsController],
  providers: [PrismaService, DepartmentsService],
    exports: [DepartmentsService],
})
export class DepartmentsModule {}
