import { Product } from '../../../src/entites/Product';
import { AppError } from '../../../src/helpers/AppError';
import { GetFavoriteUseCase } from '../../../src/useCases/Favorite/Get/GetFavoriteUseCase';
import { cacheProviderMock } from '../../mocks/CacheProviderMock';
import { favoritesRepositoryMock } from '../../mocks/FavoriteRepositoryMock';
import { productsProviderMock } from '../../mocks/ProductProviderMock';

describe('GetFavoriteUseCase', () => {
    const favoritesRepository = favoritesRepositoryMock();
    const productsProvider = productsProviderMock();
    const cacheProvider = cacheProviderMock();

    const useCase = new GetFavoriteUseCase(favoritesRepository, productsProvider, cacheProvider);

    const produtoExemplo = new Product({
        title: 'Produto Teste',
        price: 99.9,
        description: 'Descrição',
        category: 'Categoria',
        image: 'imagem.jpg',
        rating: { rate: 4.3, count: 12 }
    }, 1);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve retornar produtos favoritos do cache', async () => {
        cacheProvider.getOrSet.mockResolvedValue([produtoExemplo]);

        const result = await useCase.execute('cliente-1');

        expect(result).toEqual([produtoExemplo]);
        expect(cacheProvider.getOrSet).toHaveBeenCalledWith(expect.objectContaining({
            key: 'user:cliente-1:favorites',
            ttl: 300,
            fetchFn: expect.any(Function),
        }));
    });

    it('deve retornar lista vazia se não houver favoritos', async () => {
        cacheProvider.getOrSet.mockResolvedValue([]);

        const result = await useCase.execute('cliente-1');

        expect(result).toEqual([]);
    });

    it('deve lançar AppError em caso de erro inesperado', async () => {
        cacheProvider.getOrSet.mockImplementation(() => {
            throw new Error('Falha no cache');
        });

        await expect(useCase.execute('cliente-1')).rejects.toThrow(AppError);
    });
});