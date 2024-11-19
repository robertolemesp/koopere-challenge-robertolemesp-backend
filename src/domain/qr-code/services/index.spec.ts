import { QRCodeDomainService } from '.'
import { InvalidQRCodeContentException } from '../entities/qr-code'

describe('QRCodeDomainService', () => {
  let service: QRCodeDomainService

  beforeEach(() => {
    service = new QRCodeDomainService()
  })

  it('should validate QR code content successfully', () => {
    expect(() => service['validateMetadata']('Valid Content')).not.toThrow()
  })

  it('should throw an error for invalid content (too long)', () => {
    expect(() => service['validateMetadata']('a'.repeat(3000))).toThrow(
      InvalidQRCodeContentException,
    )
  })

  it('should throw an error for invalid content (empty)', () => {
    expect(() => service['validateMetadata']('')).toThrow(
      InvalidQRCodeContentException,
    )
  })

  it('should create a valid QR code', () => {
    const qrCode = service.createQRCode('Valid Content')
    expect(qrCode).toBeDefined()
    expect(qrCode.metadata).toEqual('Valid Content')
    expect(qrCode.createdAt).toBeInstanceOf(Date)
  })

  it('should throw an error when creating a QR code with invalid content', () => {
    expect(() => service.createQRCode('a'.repeat(3000))).toThrow(
      InvalidQRCodeContentException,
    )
  })
})
