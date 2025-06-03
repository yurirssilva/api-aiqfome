import { NextFunction, Request, Response } from "express";
import { GetSessionUseCase } from "./GetSessionUseCase";
import { AppError } from "../../../helpers/AppError";

export class GetSessionController {
    constructor(private getSessionUseCase: GetSessionUseCase) { }
    async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = request.body
            if (!email || !password)
                throw new AppError('Informe todos os campos', 400);
            const token = await this.getSessionUseCase.execute({ email, password });
            response.status(200).send(token);
        } catch (e) {
            throw new AppError (e);
        }
    }
}