/*
 * Arquivo DeptEmpModule 
 *	Autor: Leonardo Barbanti
 */

import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeptEmpController } from './dept-emp.controller';
import { DeptEmpService } from './dept-emp.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { DepartmentsModule } from 'src/departments/departments.module';

@Module({
  imports: [
    forwardRef(() => PrismaModule),
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
