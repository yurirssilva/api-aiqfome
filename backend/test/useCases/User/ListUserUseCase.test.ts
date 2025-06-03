import { ListUserUseCase } from "../../../src/useCases/User/List/ListUserUseCase";
import { UserPublicDTO } from "../../../src/utils/sanitizeUser";
import { userRepositoryMock } from "../../mocks/UserRepositoryMock";

describe('ListUserUseCase', () => {
    const userRepositoryMocked = userRepositoryMock();
    const useCase = new ListUserUseCase(userRepositoryMocked);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve retornar a lista de usuários', async () => {
        const mockUsers: UserPublicDTO[] = [
            { id: '1', name: 'User One', email: 'user1@example.com', role: 'client' },
            { id: '2', name: 'User Two', email: 'user2@example.com', role: 'admin' },
        ];

        userRepositoryMocked.list.mockResolvedValue(mockUsers);

        const result = await useCase.execute();

        expect(userRepositoryMocked.list).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockUsers);
    });

    it('deve retornar uma lista vazia quando não houver usuários', async () => {
        userRepositoryMocked.list.mockResolvedValue([]);

        const result = await useCase.execute();

        expect(userRepositoryMocked.list).toHaveBeenCalledTimes(1);
        expect(result).toEqual([]);
    });
});