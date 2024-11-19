
import { QRCode } from '@domain/qr-code/entities/qr-code'
import { CreateQRCodeDto } from '@application/dto/qr-code/create'
import { RetrieveQRCodeDto } from '@application/dto/qr-code/retrieve'

export interface QRCodeServiceInterface {
  createQRCode(dto: CreateQRCodeDto): Promise<QRCode>
  retrieveQRCode(dto: RetrieveQRCodeDto): Promise<QRCode | null>
}
