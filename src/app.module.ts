import { Module } from '@nestjs/common'

import { ORMModule } from './infrastructure/orm/module'

import { AppController } from './app.controller'

import { AppService } from './app.service'
import { QRCodeController } from './infrastructure/controllers/qr-code'
import { QRCodeModule } from './infrastructure/modules/qr-code'

@Module({
  imports: [ORMModule, QRCodeModule],
  controllers: [AppController, QRCodeController],
  providers: [AppService],
})

export class AppModule {}
