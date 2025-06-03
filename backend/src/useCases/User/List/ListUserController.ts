import { User } from "../../../entites/User";
import { ListUserUseCase } from "./ListUserUseCase";
import { NextFunction, Request, Response } from "express";

export class ListUserController {
    constructor(private listUserUseCase: ListUserUseCase) { }
    async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const users = await this.listUserUseCase.execute();
            response.status(200).send(users);
        } catch (err) {
            next(err)
        }
    }
}