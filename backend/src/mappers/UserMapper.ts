import { UserModel } from "../database/models/UserModel";
import { User as UserEntity} from "../entites/User";

export class UserMap {
  public static toDomain(user: UserModel): UserEntity {
    return new UserEntity(
      { name: user.name, email: user.email, password: user.password, role: user.role },
      user.id
    );
  }

  public static async toPersistence(user: UserEntity): Promise<UserModel> {
    return await UserModel.build({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role
    });
  }
}
