import { User } from "../entites/User";
import { UserPublicDTO } from "../utils/sanitizeUser";

export interface IUserRepository {
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  save(user: User): Promise<void>;
  list(): Promise<UserPublicDTO[]>
  remove(id: string): Promise<void>;
  edit(id: string, dados:Partial<User>): Promise<void>;
}
