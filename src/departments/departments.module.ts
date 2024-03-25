/*
 * Arquivo DepartmentsModule
 *	Autor: Leonardo Barbanti
 */

import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { AuthModule } from '../auth/auth.module';
import { DeptEmpModule } from '../dept-emp/dept-emp.module';
import { ProjectsModule } from '../projects/projects.module';
import { UsersModule } from '../users/users.module';
import { EmployeesModule } from '../employees/employees.module';


@Module({
  imports: [
    PrismaModule,
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
