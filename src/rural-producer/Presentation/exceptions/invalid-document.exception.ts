import { HttpException, HttpStatus } from '@nestjs/common';

export default class InvalidDocumentException extends HttpException {
  constructor() {
    super(
      'Documento inválido. Por favor, fornecer CPF ou CNPJ válidos.',
      HttpStatus.BAD_REQUEST,
    );
  }
}
