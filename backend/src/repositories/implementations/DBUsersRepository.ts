import { UserModel } from "../../database/models/UserModel";
import { User } from "../../entites/User";
import { AppError } from "../../helpers/AppError";
import { UserMap } from "../../mappers/UserMapper";
import { sanitizeUser, UserPublicDTO } from "../../utils/sanitizeUser";
import { IUserRepository } from "../IUserRepository";

export class DBUsersRepository implements IUserRepository {
    async findByEmail(email: string): Promise<User> {
        try {
            let user = await UserModel.findOne({ where: { email: email } });
            if (user) return UserMap.toDomain(user);
            return null;
        } catch (e) {
            throw new AppError(`Database error: ${e}`)
        }
    }

    async findById(id: string): Promise<User> {
        try {
            let user = await UserModel.findOne({ where: { id: id } });
            if (user) return UserMap.toDomain(user);
            return null;
        } catch (e) {
            throw new AppError(`Database error: ${e}`)
        }
    }

    async save(user: User): Promise<void> {
        try {
            let userA = await UserMap.toPersistence(user);
            userA.save();
        } catch (e) {
            throw new AppError(`Database error: ${e}`)
        }
    }

    async list(): Promise<UserPublicDTO[]> {
        try {
            const users = await UserModel.findAll();
            return users.map(sanitizeUser);
        } catch (e) {
            throw new AppError(`Database error: ${e}`)
        }
    }

    async remove(id: string): Promise<void> {
        try {
            await UserModel.destroy({
                where: {
                    id: id
                }
            });
            return null;
        } catch (e) {
            throw new AppError(`Database error: ${e}`)
        }
    }

    async edit(id: string, dados: Partial<User>): Promise<void> {
        console.log("dados:", dados)
        try {
            await UserModel.update(dados, {
                where: {
                    id: id
                }
            })
            return null;
        } catch (e) {
            throw new AppError(`Database error: ${e}`)
        }
    }
}
