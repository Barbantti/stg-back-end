/*
 * Arquivo ParamIdDecorator
 *	Autor: Leonardo Barbanti
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Decorator para retornar o ID da requisição
export const GetId = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const requestId = ctx.switchToHttp().getRequest().params.id;
    if (requestId) {
      console.log('requestId OK', requestId);
      return requestId;
    } else {
      console.log('requestId FAIL', requestId);
      return null;
    }
  },
);
