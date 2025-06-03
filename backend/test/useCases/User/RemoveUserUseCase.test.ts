import { User } from "../../../src/entites/User";
import { AppError } from "../../../src/helpers/AppError";
import { RemoveUserUseCase } from "../../../src/useCases/User/Remove/RemoveUserUseCase";
import { userRepositoryMock } from "../../mocks/UserRepositoryMock";

describe('RemoveUserUseCase', () => {
    const userRepositoryMocked = userRepositoryMock();
    const useCase = new RemoveUserUseCase(userRepositoryMocked);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve remover o usuário quando encontrado', async () => {
        const userId = '123';
        const fakeUser = new User({ name: 'João', email: 'joao@email.com', password: 'senha123', role: 'client' }, userId);

        userRepositoryMocked.findById.mockResolvedValueOnce(fakeUser);

        await useCase.execute(userId);

        expect(userRepositoryMocked.findById).toHaveBeenCalledWith(userId);
        expect(userRepositoryMocked.remove).toHaveBeenCalledWith(userId);
    });

    it('deve lançar erro 404 se o usuário não for encontrado', async () => {
        const userId = '456';

        userRepositoryMocked.findById.mockResolvedValueOnce(undefined as unknown as User); // Simula não encontrado

        await expect(useCase.execute(userId)).rejects.toBeInstanceOf(AppError);

        expect(userRepositoryMocked.findById).toHaveBeenCalledWith(userId);
        expect(userRepositoryMocked.remove).not.toHaveBeenCalled();
    });
});