import { Test, TestingModule } from '@nestjs/testing'
import { QRCodeRepository } from './repository'
import { ORMService } from '../../orm/service'
import { QRCode } from '@domain/qr-code/entities/qr-code'

describe('QRCodeRepository', () => {
  let repository: QRCodeRepository
  let ormService: Partial<ORMService>

  beforeEach(async () => {
    ormService = {
      qRCode: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findUniqueOrThrow: jest.fn()
      } as any
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QRCodeRepository,
        { provide: ORMService, useValue: ormService },
      ],
    }).compile()

    repository = module.get<QRCodeRepository>(QRCodeRepository)
  })

  describe('create', () => {
    it('should create a QR code successfully', async () => {
      const qrCode = new QRCode('test-content', new Date())
      const createdQRCode = {
        id: '123',
        metadata: qrCode.metadata,
        createdAt: qrCode.createdAt,
      }

      ;(ormService.qRCode.create as jest.Mock).mockResolvedValue(createdQRCode)

      const result = await repository.create(qrCode)

      expect(result).toEqual(createdQRCode)
      expect(ormService.qRCode.create).toHaveBeenCalledWith({
        data: {
          metadata: qrCode.metadata,
          createdAt: qrCode.createdAt,
        },
      })
    })

    it('should throw an error if ORMService fails', async () => {
      const qrCode = new QRCode('test-content', new Date())

      ;(ormService.qRCode.create as jest.Mock).mockRejectedValue(
        new Error('Database error occurred')
      )

      await expect(repository.create(qrCode)).rejects.toThrow('Database error occurred')
    })
  })

  describe('findById', () => {
    it('should find a QR code by ID successfully', async () => {
      const qrCodeId = '123'
      const foundQRCode = {
        id: qrCodeId,
        metadata: 'test-content',
        createdAt: new Date(),
      }

      ;(ormService.qRCode.findUniqueOrThrow as jest.Mock).mockResolvedValue(
        foundQRCode,
      )

      const result = await repository.findById(qrCodeId)

      expect(result).toEqual(foundQRCode)
      expect(ormService.qRCode.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id: qrCodeId },
      })
    })

    it('should throw an error if QR code is not found', async () => {
      const qrCodeId = 'non-existing-id'

      ;(ormService.qRCode.findUniqueOrThrow as jest.Mock).mockRejectedValue(
        new Error('Database error occurred')
      )

      await expect(repository.findById(qrCodeId)).rejects.toThrow('Database error occurred')
      expect(ormService.qRCode.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id: qrCodeId },
      })
    })

    it('should throw an error if ORMService fails', async () => {
      const qrCodeId = '123'

      ;(ormService.qRCode.findUniqueOrThrow as jest.Mock).mockRejectedValue(
        new Error('Database error occurred')
      )

      await expect(repository.findById(qrCodeId)).rejects.toThrow(
        'Database error occurred',
      )
    })
  })
})
