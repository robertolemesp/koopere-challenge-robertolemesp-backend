import { Test, TestingModule } from '@nestjs/testing'

import { CreateQRCodeDto } from '@application/dto/qr-code/create'
import { QRCodeController } from '.'
import { QRCodeService } from '@application/services/qr-code'

describe('QRCodeController', () => {
  let controller: QRCodeController
  let service: Partial<QRCodeService>

  beforeEach(async () => {
    service = {
      createQRCode: jest.fn(),
      retrieveQRCode: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [QRCodeController],
      providers: [{ provide: QRCodeService, useValue: service }],
    }).compile()

    controller = module.get<QRCodeController>(QRCodeController)
  })

  it('should create a QR code via POST request', async () => {
    const dto: CreateQRCodeDto = { metadata: 'Unit test' };
    (service.createQRCode as jest.Mock).mockResolvedValue({
      ...dto,
      createdAt: new Date(),
    })

    const result = await controller.createQRCode(dto)
    expect(result.metadata).toEqual('Unit test')
    expect(service.createQRCode).toHaveBeenCalledWith(dto)
  })
})
