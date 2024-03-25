/*
 * Arquivo UsersModule 
 *	Autor: Leonardo Barbanti
 */

import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
import { DeptEmpModule } from 'src/dept-emp/dept-emp.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { DepartmentsModule } from 'src/departments/departments.module';


@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => DeptEmpModule),
    forwardRef(() => EmployeesModule),
    forwardRef(() => ProjectsModule),
    forwardRef(() => DepartmentsModule),
  ],
  controllers: [UsersController],
  providers: [PrismaService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
