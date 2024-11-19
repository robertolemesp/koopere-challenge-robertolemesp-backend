
import { QRCodeRepository } from '../../../infrastructure/repositories/qr-code/repository'
import { QRCodeService } from './'
import { CreateQRCodeDto } from '../../dto/qr-code/create'

describe('QRCodeService (Unit)', () => {
  let service: QRCodeService
  let mockRepository: Partial<QRCodeRepository>

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
    }
    service = new QRCodeService(mockRepository as QRCodeRepository)
  })

  it('should create a QR code successfully', async () => {
    const dto: CreateQRCodeDto = { metadata: 'Unit test' };
    (mockRepository.create as jest.Mock).mockResolvedValue({
      ...dto,
      createdAt: new Date(),
    })

    const result = await service.createQRCode(dto)

    expect(result.metadata).toEqual('Unit test')
    expect(mockRepository.create).toHaveBeenCalledWith(expect.any(Object))
  })

  it('should retrieve a QR code by ID', async () => {
    const expectedQRCode = { id: '123', metadata: 'test', createdAt: new Date() };
    (mockRepository.findById as jest.Mock).mockResolvedValue(expectedQRCode)

    const result = await service.retrieveQRCode({ id: '123' })

    expect(result).toEqual(expectedQRCode)
    expect(mockRepository.findById).toHaveBeenCalledWith('123')
  })

  it('should return error for non-existing QR code', async () => {
    (mockRepository.findById as jest.Mock).mockResolvedValue(null)

    const result = await service.retrieveQRCode({ id: 'non-existing-id' })

    expect(result).toBeNull()
    expect(mockRepository.findById).toHaveBeenCalledWith('non-existing-id')
  })
})
