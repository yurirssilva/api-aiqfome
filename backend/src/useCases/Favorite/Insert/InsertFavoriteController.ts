import { NextFunction, Request, Response } from "express";
import { InsertFavoriteUseCase } from "./InsertFavoriteUseCase";
import { AppError } from "../../../helpers/AppError";

export class InsertFavoriteController {
    constructor(private insertFavoriteUseCase: InsertFavoriteUseCase) { }

    async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const { id_product } = request.body
            let id_client = request["auth"].id
            if (!id_product)
                throw new AppError('Informe o produto', 400);
            await this.insertFavoriteUseCase.execute(id_client, id_product);
            response.status(201).send({ message: 'Favorito adicionado com sucesso.' });
        } catch (err) {
            next(err)
        }

    }
}