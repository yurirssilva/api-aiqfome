import { AppError } from "../../../helpers/AppError";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IEditUserDTO } from "./IEditUserDTO";

export class EditUserUseCase {
    constructor(private usersRepository: IUserRepository) { }

    async execute({ id, name, email }: IEditUserDTO) {
        const user = await this.usersRepository.findById(id);
        if (!user) {
            throw new AppError('Usuário não encontrado', 404);
        }

        if (email && email !== user.email) {
            const userExists = await this.usersRepository.findByEmail(email);
            if (userExists)
                throw new AppError("Email já utilizado", 409);
        }

        const update = {
            name: name ?? user.name,
            email: email ?? user.email
        }
        await this.usersRepository.edit(id, update)
    }
}