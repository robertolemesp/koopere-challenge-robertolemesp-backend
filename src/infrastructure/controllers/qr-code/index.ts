import { Controller, Post, Get, Body, Param, NotFoundException, UnprocessableEntityException, InternalServerErrorException } from '@nestjs/common'
import { QRCodeService } from '../../../application/services/qr-code/'
import { CreateQRCodeDto } from '../../../application/dto/qr-code/create'
import { RetrieveQRCodeDto } from '../../../application/dto/qr-code/retrieve'
import { InvalidQRCodeContentException, QRCodeNotFoundException } from '../../../domain/qr-code/entities/qr-code'

@Controller('qrcode')
export class QRCodeController {
  constructor(private readonly qrCodeService: QRCodeService) {}

  @Post('create')
  async createQRCode(@Body() dto: CreateQRCodeDto) {
    try {
      return this.qrCodeService.createQRCode(dto)
    } catch (error) {
      if (error instanceof InvalidQRCodeContentException) 
        throw new UnprocessableEntityException(error.message)

      throw new InternalServerErrorException(error.message)
    }
  }

  @Get(':id')
  async getQRCode(@Param('id') id: string) {
    try {
      return await this.qrCodeService.retrieveQRCode({ id })
    } catch (error) {
      if (error instanceof QRCodeNotFoundException) 
        throw new NotFoundException(error.message)

      throw error
    }
  }
}
