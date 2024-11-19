import { Test, TestingModule } from '@nestjs/testing'
import { QRCode } from '@domain/qr-code/entities/qr-code'
import { ORMService } from '@infrastructure/orm/service'
import { QRCodeRepository } from './repository'
import { QRCodeNotFoundException } from '@domain/qr-code/entities/qr-code'

describe('QRCodeRepository (Integration)', () => {
  let repository: QRCodeRepository
  let ormService: ORMService

  beforeAll(async () => {
    ormService = new ORMService()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QRCodeRepository,
        { provide: ORMService, useValue: ormService },
      ],
    }).compile()

    repository = module.get<QRCodeRepository>(QRCodeRepository)

    await ormService.$connect()
  })

  afterAll(async () => {
    await ormService.$disconnect()
  })

  it('should save a QR code in the database', async () => {
    const createdAt = new Date()
    const qrCode = new QRCode('integration-test-content', createdAt)

    const result = await repository.create(qrCode)

    expect(result).toMatchObject({
      metadata: 'integration-test-content',
      createdAt,
    })

    await ormService.qRCode.delete({ where: { id: result.id } })
  })

  it('should retrieve a QR code by ID', async () => {
    const qrCode = new QRCode('test-find-content', new Date())
    const createdQRCode = await repository.create(qrCode)

    const result = await repository.findById(createdQRCode.id)

    expect(result).toMatchObject({
      id: createdQRCode.id,
      metadata: 'test-find-content',
    })

    await ormService.qRCode.delete({ where: { id: createdQRCode.id } })
  })

  it('should throw QRCodeNotFoundException if QR code does not exist', async () => {
    const nonExistingId = 'non-existing-id'

    await expect(repository.findById(nonExistingId)).rejects.toThrowError(
      QRCodeNotFoundException,
    )

    await expect(repository.findById(nonExistingId)).rejects.toThrowError(
      expect.objectContaining({
        name: 'QRCodeNotFoundException',
        message: `QR Code with ID '${nonExistingId}' not found`,
      }),
    )
  })
})
