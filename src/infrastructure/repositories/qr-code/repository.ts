import { Injectable } from '@nestjs/common'
import { QRCode, QRCodeNotFoundException } from '../../../domain/qr-code/entities/qr-code'
import { ORMService } from '../../../infrastructure/orm/service'

@Injectable()
export class QRCodeRepository {
  constructor(private readonly orm: ORMService) {}

  async create(qrCode: QRCode): Promise<QRCode> {
    try {
      return await this.orm.qRCode.create({
        data: {
          metadata: qrCode.metadata,
          createdAt: qrCode.createdAt,
        },
      })
    } catch (error) {
      console.error('Error creating QRCode:', error.message)
      throw new Error('Database error occurred')
    }
  }

  async findById(id: string): Promise<QRCode> {
    try {
      return await this.orm.qRCode.findUniqueOrThrow({
        where: { id },
      })
    } catch (error) {
      if (error.name === 'NotFoundError') {
        throw new QRCodeNotFoundException(id)
      }
      console.error('Error finding QRCode by ID:', error.message)
      throw new Error('Database error occurred')
    }
  }
}
