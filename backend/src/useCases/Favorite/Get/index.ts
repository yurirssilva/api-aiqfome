import { APIProductsProvider } from "../../../providers/implementations/APIProductsProvider";
import { RedisCacheProvider } from "../../../providers/implementations/RedisCacheProvider";
import { DBFavoritesRepository } from "../../../repositories/implementations/DBFavoritesRepository";
import { GetFavoriteController } from "./GetFavoriteController";
import { GetFavoriteUseCase } from "./GetFavoriteUseCase";

const dbfavoritesRepository = new DBFavoritesRepository();

const apiProductsProvider = new APIProductsProvider();

const redisCacheProvider = new RedisCacheProvider();

const getFavoriteUseCase = new GetFavoriteUseCase(dbfavoritesRepository, apiProductsProvider, redisCacheProvider);

const getFavoriteController = new GetFavoriteController(getFavoriteUseCase);

export { getFavoriteUseCase, getFavoriteController }