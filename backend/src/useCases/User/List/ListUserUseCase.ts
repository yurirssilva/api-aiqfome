import { User } from "../../../entites/User";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { UserPublicDTO } from "../../../utils/sanitizeUser";

export class ListUserUseCase {
    constructor(private usersRepostitory: IUserRepository) { }
    async execute(): Promise<UserPublicDTO[]> {
        return await this.usersRepostitory.list();
    }
}