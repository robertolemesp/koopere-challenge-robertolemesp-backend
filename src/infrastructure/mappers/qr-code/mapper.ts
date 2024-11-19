import { QRCode } from '../../../domain/qr-code/entities/qr-code'

export class QRCodeMapper {
  static toDomain(raw: any): QRCode {
    return new QRCode(raw.metadata,  raw.createdAt, raw.expiresAt)
  }
}
