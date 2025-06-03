import { RedisCacheProvider } from "../../../providers/implementations/RedisCacheProvider";
import { DBFavoritesRepository } from "../../../repositories/implementations/DBFavoritesRepository";
import { RemoveFavoriteController } from "./RemoveFavoriteController";
import { RemoveFavoriteUseCase } from "./RemoveFavoriteUseCase";

const dbfavoritesRepository = new DBFavoritesRepository();

const redisCacheProvider = new RedisCacheProvider();

const removeFavoriteUseCase = new RemoveFavoriteUseCase(dbfavoritesRepository, redisCacheProvider);

const removeFavoriteController = new RemoveFavoriteController(removeFavoriteUseCase);

export { removeFavoriteUseCase, removeFavoriteController }