// import { cacheEvents } from "../../../src/events/cacheEvents";
import { AppError } from "../../../src/helpers/AppError";
import { RemoveFavoriteUseCase } from "../../../src/useCases/Favorite/Remove/RemoveFavoriteUseCase";
import { cacheProviderMock } from "../../mocks/CacheProviderMock";
import { favoritesRepositoryMock } from "../../mocks/FavoriteRepositoryMock";

describe('RemoveFavoriteUseCase', () => {
    const favoritesRepository = favoritesRepositoryMock();
    const cacheProvider = cacheProviderMock();
    const useCase = new RemoveFavoriteUseCase(favoritesRepository, cacheProvider);

    const clienteId = 'cliente-1';
    const produtoId = 10;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve remover produto dos favoritos e invalidar cache', async () => {
        favoritesRepository.list.mockResolvedValue([10, 20]);
        favoritesRepository.remove.mockResolvedValue();

        await useCase.execute(clienteId, produtoId);

        expect(favoritesRepository.list).toHaveBeenCalledWith(clienteId);
        expect(favoritesRepository.remove).toHaveBeenCalledWith(clienteId, produtoId);
        expect(cacheProvider.invalidate).toHaveBeenCalledWith(`user:${clienteId}:favorites`);
    });

    it('deve lançar erro se produto não estiver nos favoritos', async () => {
        favoritesRepository.list.mockResolvedValue([5, 6, 7]);

        await expect(useCase.execute(clienteId, produtoId)).rejects.toThrow(AppError);
        expect(favoritesRepository.remove).not.toHaveBeenCalled();
    });

    it('deve lançar AppError em erro inesperado', async () => {
        favoritesRepository.list.mockRejectedValue(new Error('Erro interno'));

        await expect(useCase.execute(clienteId, produtoId)).rejects.toThrow(AppError);
    });
});