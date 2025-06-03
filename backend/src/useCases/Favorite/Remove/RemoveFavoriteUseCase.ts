// import { cacheEvents } from "../../../events/cacheEvents";
import { AppError } from "../../../helpers/AppError";
import { ICacheProvider } from "../../../providers/ICacheProvider";
import { IFavoritesRepository } from "../../../repositories/IFavoritesRepository";

export class RemoveFavoriteUseCase {
    constructor(
        private favoritesRepository: IFavoritesRepository,
        private cacheProvider: ICacheProvider) { }
    async execute(id_client: string, id_product: number) {
        try {
            const ids = await this.favoritesRepository.list(id_client);

            if (!ids.includes(id_product))
                throw new AppError('Produto não está na lista de favoritos', 404);

            await this.favoritesRepository.remove(id_client, id_product);

            const cacheKey = `user:${id_client}:favorites`;
            await this.cacheProvider.invalidate(cacheKey);
        } catch (e) {
            throw new AppError(e)
        }
    }
}