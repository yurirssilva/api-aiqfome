import { DBUsersRepository } from "../../../repositories/implementations/DBUsersRepository";
import { EditUserController } from "./EditUserController";
import { EditUserUseCase } from "./EditUserUseCase";

const dbUsersRepository = new DBUsersRepository();

const editUserUseCase = new EditUserUseCase(dbUsersRepository);

const editUserController = new EditUserController(editUserUseCase);

export { editUserUseCase, editUserController }
