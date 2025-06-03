import { NextFunction, Request, Response } from "express";
import { EditUserUseCase } from "./EditUserUseCase";
import { AppError } from "../../../helpers/AppError";

export class EditUserController {
    constructor(private editUserUseCase: EditUserUseCase) { }

    async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const { name, email } = request.body
            let id = request.params.id
            if (!name && !email)
                throw new AppError('Informe pelo menos um campo', 400);

            await this.editUserUseCase.execute({ id, name, email })
            response.status(200).send();
        } catch (err) {
            next(err)
        }
    }
}