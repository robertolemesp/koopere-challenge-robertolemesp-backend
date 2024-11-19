export class QRCode {
  constructor(
    public metadata: string,
    public createdAt: Date,
    public id?: string,
  ) {}
}

export class QRCodeNotFoundException extends Error {
  constructor(id: string) {
    super(`QR Code with ID '${id}' not found`)
    this.name = 'QRCodeNotFoundException'
  }
}

export class InvalidQRCodeContentException extends Error {
  constructor(message = 'Invalid QR Code content.') {
    super(message)
  }
}
