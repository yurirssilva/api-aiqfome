import { APIProductsProvider } from "../../../providers/implementations/APIProductsProvider";
import { RedisCacheProvider } from "../../../providers/implementations/RedisCacheProvider";
import { DBFavoritesRepository } from "../../../repositories/implementations/DBFavoritesRepository";
import { InsertFavoriteController } from "./InsertFavoriteController";
import { InsertFavoriteUseCase } from "./InsertFavoriteUseCase";

const dbfavoritesRepository = new DBFavoritesRepository();

const apiProductsProvider = new APIProductsProvider();

const redisCacheProvider = new RedisCacheProvider();

const insertFavoriteUseCase = new InsertFavoriteUseCase(dbfavoritesRepository, apiProductsProvider, redisCacheProvider);

const insertFavoriteController = new InsertFavoriteController(insertFavoriteUseCase);

export { insertFavoriteUseCase, insertFavoriteController }