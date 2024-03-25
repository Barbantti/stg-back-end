/*
 * Arquivo EmployeeDecorator
 *	Autor: Leonardo Barbanti
 */

import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';

// Decorator para retornar o colaborador da requisição

export const EmployeeDecorator = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    
    if (request.employee) {
      request.employee[filter];
      if (filter) {
      } else {
        return request.employee;
      }
    } else {
      throw new NotFoundException(
        'O colaborador não foi encontrado na base de dados.',
      );
    }
  },
);
