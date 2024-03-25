/*
 * Arquivo AuthModule
 *	Autor: Leonardo Barbanti
 */

import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DepartmentsModule } from 'src/departments/departments.module';
import { DeptEmpModule } from 'src/dept-emp/dept-emp.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1 day' },
    }),
    PrismaModule,
    forwardRef(() => DeptEmpModule),
    forwardRef(() => UsersModule),
    forwardRef(() => ProjectsModule),
    forwardRef(() => DepartmentsModule),
    forwardRef(() => EmployeesModule),
  ],
  controllers: [AuthController],
  providers: [PrismaService, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
