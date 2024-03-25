/*
 * Arquivo DeptEmpModule 
 *	Autor: Leonardo Barbanti
 */

import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { DeptEmpController } from './dept-emp.controller';
import { DeptEmpService } from './dept-emp.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { EmployeesModule } from '../employees/employees.module';
import { ProjectsModule } from '../projects/projects.module';
import { DepartmentsModule } from '../departments/departments.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    forwardRef(() => ProjectsModule),
    forwardRef(() => EmployeesModule),
    forwardRef(() => DepartmentsModule),
  ],
  controllers: [DeptEmpController],
  providers: [PrismaService, DeptEmpService],
  exports: [DeptEmpService],
})
export class DeptEmpModule {}
