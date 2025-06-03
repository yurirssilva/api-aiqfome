import { NextFunction, Request, Response } from "express";
import { GetFavoriteUseCase } from "./GetFavoriteUseCase";

export class GetFavoriteController {
    constructor(private getFavoriteUseCase: GetFavoriteUseCase) {

    }
    async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            let id_client = request["auth"].id
            const favorites = await this.getFavoriteUseCase.execute(id_client);
            response.status(201).send(favorites);
        } catch (err) {
            next(err)
        }
    }

}