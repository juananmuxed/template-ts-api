import { ERRORS } from '@config/data/Errors';
import { BaseError } from '@models/Errors';

export class AuthError extends BaseError {
  constructor(message?: string) {
    super(message || ERRORS.UNAUTHORIZED, 401);
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}
