/*
 * Arquivo RolesDecorator
 *	Autor: Leonardo Barbanti
 */

import { SetMetadata } from '@nestjs/common';

// Decorator para retornar o nível de acesso
export const Roles = (roleLevels: string[]) =>
  SetMetadata('roleLevels', roleLevels);
