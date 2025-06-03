import { DBUsersRepository } from "../../../repositories/implementations/DBUsersRepository";
import { ListUserController } from "./ListUserController";
import { ListUserUseCase } from "./ListUserUseCase";

const dbUsersRepository = new DBUsersRepository();

const listUserUseCase = new ListUserUseCase(dbUsersRepository);

const listUserController = new ListUserController(listUserUseCase);

export { listUserUseCase, listUserController };