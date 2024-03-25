/*
 * Arquivo AppModule 
 *	Autor: Leonardo Barbanti
 */

import { ProjectsModule } from './projects/projects.module';
import { ProjectsService } from './projects/projects.service';
import { ProjectsController } from './projects/projects.controller';
import { DeptEmpModule } from './dept-emp/dept-emp.module';
import { DeptEmpService } from './dept-emp/dept-emp.service';
import { DeptEmpController } from './dept-emp/dept-emp.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { DepartmentsModule } from './departments/departments.module';
import { DepartmentsService } from './departments/departments.service';
import { DepartmentsController } from './departments/departments.controller';
import { EmployeesModule } from './employees/employees.module';
import { EmployeesService } from './employees/employees.service';
import { EmployeesController } from './employees/employees.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    forwardRef(() =>ProjectsModule),
    forwardRef(() =>DeptEmpModule),
    forwardRef(() =>UsersModule),
    forwardRef(() =>DepartmentsModule),
    forwardRef(() =>EmployeesModule),
    forwardRef(() => AuthModule),
    forwardRef(() => JwtModule),
  ],
  controllers: [
    ProjectsController,
    DeptEmpController,
    UsersController,
    DepartmentsController,
    EmployeesController,
    AuthController,
    AppController,
  ],
  providers: [
    ProjectsService,
    DeptEmpService,
    UsersService,
    DepartmentsService,
    EmployeesService,
    AuthService,
    PrismaService,
    AppService,
  ],
})
export class AppModule {}
