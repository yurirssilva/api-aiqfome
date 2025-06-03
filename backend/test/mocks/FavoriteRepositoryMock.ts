import { IFavoritesRepository } from "../../src/repositories/IFavoritesRepository";

export const favoritesRepositoryMock = (): jest.Mocked<IFavoritesRepository> => ({
    insert: jest.fn<Promise<void>, [string, number]>(),
    list: jest.fn<Promise<number[]>, [string]>(),
    remove: jest.fn<Promise<void>, [string, number]>(),
});