import { NextFunction, Request, Response } from "express";
import { AppError } from "../helpers/AppError";
async function authorization(request: Request, response: Response, next: NextFunction) {

  const user = request['auth']
      
  if (user.role !== 'admin')
    throw new AppError("Acesso negado", 403)

  next();
}

export { authorization };
