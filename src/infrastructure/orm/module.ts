import { Module } from '@nestjs/common'
import { ORMService } from './service'

@Module({
  providers: [ORMService],
  exports: [ORMService],
})
export class ORMModule {}
