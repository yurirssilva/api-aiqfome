import { User } from "../../../entites/User";
import { AppError } from "../../../helpers/AppError";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { ICreateUserDTO } from "./ICreateUserDTO";

export class CreateUserUseCase {
    constructor(private usersRepository: IUserRepository) { }

    async execute(data: ICreateUserDTO) {
        const userExists = await this.usersRepository.findByEmail(data.email);
        if (userExists) 
            throw new AppError("Email já utilizado", 409);

        const user = new User(data);

        await this.usersRepository.save(user);
    }
}