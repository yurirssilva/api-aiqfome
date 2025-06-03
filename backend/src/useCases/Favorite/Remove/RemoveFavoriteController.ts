import { NextFunction, Request, Response } from "express";
import { RemoveFavoriteUseCase } from "./RemoveFavoriteUseCase";
import { AppError } from "../../../helpers/AppError";

export class RemoveFavoriteController {
    constructor(private removeFavoriteUseCase: RemoveFavoriteUseCase) { }
    async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const { idProduct } = request.params;
            const id_product = Number(idProduct);
            if (isNaN(id_product)) {
                throw new AppError('O ID do produto deve ser um número', 400);
            }
            let id_client = request["auth"].id
            if (!idProduct)
                throw new AppError('Informe o produto', 400);
            await this.removeFavoriteUseCase.execute(id_client, id_product);
            response.status(204).send();
        } catch (err) {
            next(err)
        }
    }

}