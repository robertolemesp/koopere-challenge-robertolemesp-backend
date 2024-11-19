import { Module } from '@nestjs/common'

import { QRCodeRepository } from '../../../infrastructure/repositories/qr-code/repository'
import { ORMService } from '../../../infrastructure/orm/service'
import { QRCodeController } from '../../../infrastructure/controllers/qr-code'
import { QRCodeService } from '../../../application/services/qr-code'

@Module({
  imports: [],
  controllers: [QRCodeController],
  providers: [QRCodeService, QRCodeRepository, ORMService],
  exports: [QRCodeService]
})
export class QRCodeModule {}
