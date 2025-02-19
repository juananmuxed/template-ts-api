import { Request, Response, NextFunction } from 'express';

import { BaseError } from '../models/Errors';
import { ERRORS } from '../config/data/Errors';
import { NotFoundError } from '@models/errors/NotFoundError';
import { useLoggerServer } from '@config/UseLoggerServer';

const logger = useLoggerServer();

export const logError = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  logger.simpleMessage(err.message, 'red');
  next(err);
};

export const useErrorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BaseError) {
    if (err.isOperational) {
      res.status(err.status).json({
        status: err.status < 500 && err.status >= 400 ? 'fail' : 'error',
        message: err.message,
        internalErrors: err.errors,
      });
      return;
    }

    res.status(err.status).json({
      status: 'error',
      message: 'Something went wrong',
    });
    return;
  }
  next();
};

export const useDefaultErrorHandler = (_req: Request, _res: Response, next: NextFunction) => {
  next(new NotFoundError(ERRORS.NOT_FOUND('Endpoint')));
};
