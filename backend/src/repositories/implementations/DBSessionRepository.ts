import { UserModel } from "../../database/models/UserModel";
import { Login } from "../../entites/Login";
import { AppError } from "../../helpers/AppError";
import { ISessionDTO } from "../../useCases/Session/Get/ISessionDTO";
import { ISessionRepository } from "../ISessionRepository";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class DBSessionRepository implements ISessionRepository {
    async login({ email, password }: Login): Promise<ISessionDTO> {
        try {
            let user = await UserModel.findOne({ where: { email } });
            if (!user) throw new AppError('Usuário não encontrado', 404);
            let compare: boolean = await bcrypt.compare(password, user.password);
            if (!compare) throw new AppError("Senha incorreta", 401);
            let token = this.generateToken(user.id, user.role);
            let session: ISessionDTO = {
                name: user.name,
                email: user.email,
                token: token,
            };
            return session;

        } catch (error) {
            throw new AppError(error)
        }
    }

    generateToken(id: string, role: string): string {
        return jwt.sign({ id, role, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) }, process.env.APP_SECRET);
    }

}