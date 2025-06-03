import { NextFunction, Request, Response } from "express";
import { RemoveUserUseCase } from "./RemoveUserUseCase";

export class RemoveUserController {
    constructor(private removeUserUseCase: RemoveUserUseCase) { }
    async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const id = request.params.id
            await this.removeUserUseCase.execute(id)
            response.status(204).send(request["auth"]);
        } catch (err) {
            next(err)
        }
    }

}