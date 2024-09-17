import { HttpException, HttpStatus } from '@nestjs/common';

export default class RuralProducerNotExistsException extends HttpException {
  constructor() {
    super(
      'O produtor rural informado não existe. Por favor, informe um id de produtor rural válido',
      HttpStatus.BAD_REQUEST,
    );
  }
}
