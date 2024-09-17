import { Module } from '@nestjs/common';
import ValidationBrDocumentService from './application/services/validation-br-document.service';

@Module({
  providers: [ValidationBrDocumentService],
  exports: [ValidationBrDocumentService],
})
export default class UtilsModule {}
