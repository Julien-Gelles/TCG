import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

export const validate =
  <T>(schema: ZodType<T>, source: 'body' | 'params' | 'query' = 'body') =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      next(result.error);
      return;
    }
    req[source] = result.data as never;
    next();
  };
