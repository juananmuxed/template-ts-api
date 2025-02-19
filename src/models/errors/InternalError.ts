import { ValidationError } from 'sequelize';

import { ERRORS } from '@config/data/Errors';
import { BaseError } from '@models/Errors';

export class InternalError extends BaseError {
  constructor(message?: string, errors?: ValidationError) {
    super(message || ERRORS.INTERNAL_ERROR, 500, errors);
    Object.setPrototypeOf(this, InternalError.prototype);
  }
}
