import { BaseError } from '@models/Errors';

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 404);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
