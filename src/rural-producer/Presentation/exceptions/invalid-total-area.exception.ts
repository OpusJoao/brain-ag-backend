import { HttpException, HttpStatus } from '@nestjs/common';

export default class InvalidTotalAreaException extends HttpException {
  constructor() {
    super(
      'A soma da área Agricultável e vegetação não devem ser maiores que a área total da fazenda informada. Por favor, informe corretamente os valores.',
      HttpStatus.BAD_REQUEST,
    );
  }
}
