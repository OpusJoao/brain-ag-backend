import { Injectable } from '@nestjs/common';
import ValidationDocumentServiceInterface from '../interfaces/validation-document-service.interface';
import { isCPF, isCNPJ } from 'validation-br';

@Injectable()
export default class ValidationBrDocumentService
  implements ValidationDocumentServiceInterface
{
  constructor() {}
  isCpf(document: string): boolean {
    return isCPF(document);
  }
  isCnpj(document: string): boolean {
    return isCNPJ(document);
  }

  isValidDocument(document: string): boolean {
    if (this.isCpf(document) || this.isCnpj(document)) {
      return true;
    }

    return false;
  }
}
