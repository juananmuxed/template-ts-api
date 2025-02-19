import { ERRORS } from '@config/data/Errors';
import { BaseError } from '@models/Errors';

export class InvalidLogin extends BaseError {
  constructor(message?: string) {
    super(message || ERRORS.INVALID_LOGIN, 401);
    Object.setPrototypeOf(this, InvalidLogin.prototype);
  }
}
