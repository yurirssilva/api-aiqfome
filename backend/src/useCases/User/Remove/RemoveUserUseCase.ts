import { AppError } from "../../../helpers/AppError";
import { IUserRepository } from "../../../repositories/IUserRepository";

export class RemoveUserUseCase {
    constructor(private usersRepository: IUserRepository) { }

    async execute(id: string) {
        const user = await this.usersRepository.findById(id);
        if (!user) {
            throw new AppError('Usuário não encontrado', 404);
        }
        await this.usersRepository.remove(id);
    }
}