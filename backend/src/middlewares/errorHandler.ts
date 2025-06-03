import { Request, Response, NextFunction } from 'express';
import { AppError } from '../helpers/AppError';

export function errorHandler(err: any, request: Request, response: Response, next: NextFunction) {
    const status = err instanceof AppError ? err.statusCode : 500;
    const message = err.message || 'Erro interno no servidor';

    response.status(status).json({ erro: message });
}