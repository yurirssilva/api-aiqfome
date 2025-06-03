import { DBUsersRepository } from "../../../repositories/implementations/DBUsersRepository";
import { RemoveUserController } from "./RemoveUserController";
import { RemoveUserUseCase } from "./RemoveUserUseCase";

const dbUsersRepository = new DBUsersRepository();

const removeUserUseCase = new RemoveUserUseCase(dbUsersRepository);

const removeUserController = new RemoveUserController(removeUserUseCase);

export { removeUserUseCase, removeUserController };