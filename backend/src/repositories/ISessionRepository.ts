import { Login } from "../entites/Login";
import { ISessionDTO } from "../useCases/Session/Get/ISessionDTO";

export interface ISessionRepository {
    login(user:Login): Promise<ISessionDTO>
}