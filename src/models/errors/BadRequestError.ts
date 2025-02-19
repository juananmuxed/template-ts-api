import { ERRORS } from '@config/data/Errors';
import { BaseError } from '@models/Errors';

export class BadRequestError extends BaseError {
  constructor(message?: string) {
    super(message || ERRORS.BAD_REQUEST, 400);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
