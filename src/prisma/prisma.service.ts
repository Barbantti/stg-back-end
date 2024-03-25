/*
 * Arquivo PrismaService 
 *	Autor: Leonardo Barbanti
 */

import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

  // Conecta ao Prisma Client
	async onModuleInit() {
		await this.$connect();
	}

  // Desconecta do Prisma Client
	async enableShutdownHooks(app: INestApplication) {
		process.on('beforeExit', async () => {
			await app.close();
		});
	}
}
