import { QRCode } from '../entities/qr-code'
import {InvalidQRCodeContentException } from '../entities/qr-code'

export class QRCodeDomainService {
  /**
   * Validates QRCode metadata and creates a valid QRCode entity.
   * @param metadata - The metadata for the QR code.
   * @returns QRCode
   */
  createQRCode(metadata: string): QRCode {
    this.validateMetadata(metadata)

    // Create the QRCode entity
    return new QRCode(metadata, new Date())
  }

  /**
   * Validates the metadata content for a QRCode.
   * @param metadata - The metadata for the QR code.
   */
  private validateMetadata(metadata: string): void {
    if (!metadata || metadata.length < 1 || metadata.length > 40) {
      throw new InvalidQRCodeContentException(
        'Invalid QR Code format. Metadata length must be between 1 and 40 characters.'
      )
    }
  }
}
