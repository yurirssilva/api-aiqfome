import { DBUsersRepository } from "../../../repositories/implementations/DBUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const dbUsersRepository = new DBUsersRepository();

const createUserUseCase = new CreateUserUseCase(dbUsersRepository);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController }