import { Request, Response } from 'express';

export interface ExpressParams {
  req: Request;
  res: Response;
}
