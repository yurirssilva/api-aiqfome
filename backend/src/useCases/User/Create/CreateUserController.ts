import { NextFunction, Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { AppError } from "../../../helpers/AppError";

export class CreateUserController {
    constructor(private createUserUseCase: CreateUserUseCase) { }
    async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const { name, email, role, password } = request.body;

            if (!name || !email || !role || !password)
                throw new AppError('Informe todos os campos', 400);
            await this.createUserUseCase.execute({
                name, email, role, password
            });
            response.status(201).send();
        } catch (err) {
            next(err)
        }
    }
}