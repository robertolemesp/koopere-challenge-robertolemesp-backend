import { Injectable } from '@nestjs/common'
import { QRCode } from '../../../domain/qr-code/entities/qr-code'
import { QRCodeRepository } from '../../../infrastructure/repositories/qr-code/repository'
import { CreateQRCodeDto } from '../../dto/qr-code/create'
import { RetrieveQRCodeDto } from '../../dto/qr-code/retrieve'

@Injectable()
export class QRCodeService {
  constructor(private readonly qrCodeRepository: QRCodeRepository) {}

  async createQRCode({ metadata }: CreateQRCodeDto): Promise<QRCode> {
    const qrCode = new QRCode(metadata, new Date())

    return this.qrCodeRepository.create(qrCode)
  }

  async retrieveQRCode(dto: RetrieveQRCodeDto): Promise<QRCode | null> {
    return this.qrCodeRepository.findById(dto.id)
  }
}
