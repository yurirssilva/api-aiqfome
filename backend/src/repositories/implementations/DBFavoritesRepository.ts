import { FavoriteModel } from "../../database/models/FavoriteModel";
import { AppError } from "../../helpers/AppError";
import { IFavoritesRepository } from "../IFavoritesRepository";

export class DBFavoritesRepository implements IFavoritesRepository {
    async insert(id_client: string, id_product: number): Promise<void> {
        try {
            await FavoriteModel.build({
                user_id: id_client,
                product_id: id_product
            }).save();
        } catch (error) {
            throw new AppError(`Database error: ${error}`);
        }
    }

    async list(id_client: string): Promise<number[]> {
        try {
            const favorites = await FavoriteModel.findAll({
                where: {
                    user_id: id_client
                }, attributes: ['product_id'], raw: true
            })
            return favorites.map(reg => reg.product_id);
        } catch (error) {
            throw new AppError(`Database error: ${error}`);
        }
    }

    async remove(id_client: string, id_product: number): Promise<void> {
        try {
            await FavoriteModel.destroy({
                where: {
                    user_id: id_client,
                    product_id: id_product
                }
            });
            return null;
        } catch (e) {
            throw new AppError(`Database error: ${e}`)
        }
    }

}