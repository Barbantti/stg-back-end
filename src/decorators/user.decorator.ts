/*
 * Arquivo UserDecorator
 *	Autor: Leonardo Barbanti
 */

import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';


// Decorator para retornar o usuário da requisição
export const UserDecorator = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.user) {
      request.user[filter];
      if (filter) {
      } else {
        return request.user;
      }
    } else {
      throw new NotFoundException(
        'O usuário não foi encontrado na base de dados.',
      );
    }
  },
);
