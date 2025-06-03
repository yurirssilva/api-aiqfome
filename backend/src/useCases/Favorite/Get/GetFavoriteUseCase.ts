import { Product } from "../../../entites/Product";
import { AppError } from "../../../helpers/AppError";
import { ICacheProvider } from "../../../providers/ICacheProvider";
import { IProductsProvider } from "../../../providers/IProductsProvider";
import { IFavoritesRepository } from "../../../repositories/IFavoritesRepository";

export class GetFavoriteUseCase {
    constructor(
        private favoritesRepository: IFavoritesRepository,
        private productsProvider: IProductsProvider,
        private cacheProvider: ICacheProvider
    ) { }
    async execute(id_client: string): Promise<Product[]> {
        try {
            const cacheKey = `user:${id_client}:favorites`;
            return await this.cacheProvider.getOrSet({
                key: cacheKey,
                ttl: 300,
                fetchFn: async () => {
                    const ids = await this.favoritesRepository.list(id_client);
                    if (!ids.length) return [];
                    const products = await Promise.all(ids.map(id => this.productsProvider.findById(id)));
                    return products;
                },
                onHit: () => console.log(`Cache hit: favorites ${id_client}`),
                onMiss: () => console.log(`Cache miss: favorites ${id_client}`),
            });
        } catch (e) {
            throw new AppError(e)
        }
    }
}