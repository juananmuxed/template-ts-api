import { ERRORS } from '@config/data/Errors';
import { BaseError } from '@models/Errors';

export class NotFileError extends BaseError {
  constructor(message?: string) {
    super(message || ERRORS.NOT_FILE_ERROR, 404);
    Object.setPrototypeOf(this, NotFileError.prototype);
  }
}
