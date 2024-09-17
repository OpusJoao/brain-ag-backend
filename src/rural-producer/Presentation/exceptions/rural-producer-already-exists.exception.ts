import { HttpException, HttpStatus } from '@nestjs/common';

export default class RuralProducerAlreadyExistsException extends HttpException {
  constructor() {
    super(
      'Já existe um produtor rural com o mesmo documento. Por favor, informe outro documento.',
      HttpStatus.BAD_REQUEST,
    );
  }
}
