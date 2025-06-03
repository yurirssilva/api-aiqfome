import { Product } from "../../../src/entites/Product";
import { AppError } from "../../../src/helpers/AppError";
import { InsertFavoriteUseCase } from "../../../src/useCases/Favorite/Insert/InsertFavoriteUseCase";
import { favoritesRepositoryMock } from "../../mocks/FavoriteRepositoryMock";
import { productsProviderMock } from "../../mocks/ProductProviderMock";



import { cacheProviderMock } from "../../mocks/CacheProviderMock";

describe('InsertFavoriteUseCase', () => {
    const favoritesRepository = favoritesRepositoryMock();
    const productsProvider = productsProviderMock();
    const cacheProvider = cacheProviderMock();

    const useCase = new InsertFavoriteUseCase(favoritesRepository, productsProvider, cacheProvider);

    const sampleProduct = new Product({
        title: 'Camisa',
        price: 50,
        description: 'Camisa de algodão',
        category: 'Roupas',
        image: 'camisa.jpg',
        rating: {
            rate: 4.5,
            count: 100,
        },
    }, 123);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve adicionar produto aos favoritos com sucesso', async () => {
        productsProvider.findById.mockResolvedValue(sampleProduct);
        cacheProvider.getOrSet.mockResolvedValue([]);
        favoritesRepository.insert.mockResolvedValue();

        await expect(useCase.execute('user-id', 123)).resolves.not.toThrow();

        expect(productsProvider.findById).toHaveBeenCalledWith(123);
        expect(favoritesRepository.insert).toHaveBeenCalledWith('user-id', 123);
        expect(cacheProvider.invalidate).toHaveBeenCalledWith('user:user-id:favorites');
    });

    it('deve lançar erro se produto não existir', async () => {
        productsProvider.findById.mockResolvedValue(null);

        await expect(useCase.execute('user-id', 123)).rejects.toThrow(AppError);

        expect(favoritesRepository.insert).not.toHaveBeenCalled();
        expect(cacheProvider.invalidate).not.toHaveBeenCalled();
    });

    it('deve lançar erro se produto já estiver nos favoritos', async () => {
        productsProvider.findById.mockResolvedValue(sampleProduct);
        cacheProvider.getOrSet.mockResolvedValue([sampleProduct]);

        await expect(useCase.execute('user-id', 123)).rejects.toThrow(AppError);

        expect(favoritesRepository.insert).not.toHaveBeenCalled();
        expect(cacheProvider.invalidate).not.toHaveBeenCalled();
    });
});