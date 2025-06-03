import { Product } from "../../../entites/Product";
import { AppError } from "../../../helpers/AppError";
import { ICacheProvider } from "../../../providers/ICacheProvider";
import { IProductsProvider } from "../../../providers/IProductsProvider";
import { IFavoritesRepository } from "../../../repositories/IFavoritesRepository";

export class InsertFavoriteUseCase {

    constructor(
        private favoritesRepository: IFavoritesRepository,
        private productsProvider: IProductsProvider,
        private cacheProvider: ICacheProvider
    ) { }
    async execute(id_client: string, id_product: number) {
        try {
            const productExists = await this.productsProvider.findById(id_product);
            if (!productExists)
                throw new AppError("Produto não existente", 404)

            const cacheKey = `user:${id_client}:favorites`;
            const favorites = await this.cacheProvider.getOrSet<Product[]>({
                key: cacheKey,
                ttl: 300,
                fetchFn: async () => {
                    const ids = await this.favoritesRepository.list(id_client);
                    const products = await Promise.all(ids.map(id => this.productsProvider.findById(id)));
                    return products;
                },
                onHit: () => console.log(`Cache hit: favorites ${id_client}`),
                onMiss: () => console.log(`Cache miss: favorites ${id_client}`),
            });

            if (favorites.some(fav => fav.id === id_product))
                throw new AppError('Produto já está nos favoritos.', 409);
            else {
                await this.favoritesRepository.insert(id_client, id_product);
                await this.cacheProvider.invalidate(cacheKey);
            }

        } catch (e) {
            throw new AppError(e)
        }
    }
}