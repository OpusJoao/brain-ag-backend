import { HttpException, HttpStatus } from '@nestjs/common';

export default class NullIdException extends HttpException {
  constructor() {
    super(
      'O Id não pode ser nulo ou branco. Por favor informar um Id válido.',
      HttpStatus.BAD_REQUEST,
    );
  }
}
