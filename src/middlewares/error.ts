import StatusCodes from '@/utils/statusCode';
import dayjs from 'dayjs';
import { Request, Response, NextFunction } from 'express';

type TAppendError = Error & { user: string, timestamp: string }

export class CustomError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public customCode: string;

  constructor(message: string, statusCode: number, customCode?: string) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = true;
    if (customCode) this.customCode = customCode;
  }
}

class ErrorHandler {
  static async serverError(err: TAppendError, _req: Request, res: Response, _next: NextFunction) {
    const currentDate = dayjs().format('DD/MM/YYYY');
    const currentTime = dayjs().format('HH:MM');
    err.user = res.locals.user_id || null;
    err.timestamp = `${currentDate}-${currentTime}`;

    console.error(err);

    if (err instanceof CustomError) {
      return res
        .status(err.statusCode)
        .json({ error: err.message, code: err.customCode || null });
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message || 'Internal server error',
    });
  };

  static notFound(_req: Request, res: Response) {
    res.status(StatusCodes.NOT_FOUND).json({ error: "Resource not found" })
  }
}

export default ErrorHandler;
