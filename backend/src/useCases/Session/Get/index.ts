import { DBSessionRepository } from "../../../repositories/implementations/DBSessionRepository";
import { GetSessionController } from "./GetSessionController";
import { GetSessionUseCase } from "./GetSessionUseCase";

const sessionRepository = new DBSessionRepository();

const getSessionUseCase = new GetSessionUseCase(sessionRepository);

const getSessionController = new GetSessionController(getSessionUseCase);

export { getSessionUseCase, getSessionController };