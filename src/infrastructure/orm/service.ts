import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class ORMService extends PrismaClient implements OnModuleInit {
	async onModuleInit() {
		await this.$connect()
	}

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
