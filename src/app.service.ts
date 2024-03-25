/*
 * Arquivo AppService 
 *	Autor: Leonardo Barbanti
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
