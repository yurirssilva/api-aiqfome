import { Login } from "../../../entites/Login";
import { ISessionRepository } from "../../../repositories/ISessionRepository";
import { ISessionDTO } from "./ISessionDTO";

export class GetSessionUseCase {
    constructor(private sessionRepository: ISessionRepository) { }
    async execute(data: Login): Promise<ISessionDTO> {
        const session: ISessionDTO = await this.sessionRepository.login(data);
        return session;
    }
}