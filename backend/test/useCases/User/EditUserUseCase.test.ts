
import { userRepositoryMock } from "../../mocks/UserRepositoryMock";
import { EditUserUseCase } from "../../../src/useCases/User/Edit/EditUserUseCase";
import { AppError } from "../../../src/helpers/AppError";

describe('EditUserUseCase', () => {
    const userRepositoryMocked = userRepositoryMock();
    const useCase = new EditUserUseCase(userRepositoryMocked);

    beforeEach(() => {
        jest.clearAllMocks();
    });


    it('deve lançar erro se usuário não for encontrado', async () => {
        userRepositoryMocked.findById.mockResolvedValue(null);

        await expect(
            useCase.execute({ id: '123', name: 'Novo Nome', email: 'novo@email.com' })
        ).rejects.toBeInstanceOf(AppError);;
    });

    it('deve lançar erro se email já estiver em uso por outro usuário', async () => {
        // Retorna usuário atual
        userRepositoryMocked.findById.mockResolvedValue({
            id: '123',
            name: 'Usuário Antigo',
            email: 'old@email.com',
            password: 'hashed',
            role: 'client'
        });

        // Retorna usuário diferente com mesmo email
        userRepositoryMocked.findByEmail.mockResolvedValue({
            id: '456',
            name: 'Outro Usuário',
            email: 'novo@email.com',
            password: 'hashed',
            role: 'client'
        });

        await expect(
            useCase.execute({ id: '123', name: 'Novo Nome', email: 'novo@email.com' })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('deve atualizar usuário corretamente quando dados válidos', async () => {
        const userMock = {
            id: '123',
            name: 'Usuário Antigo',
            email: 'old@email.com',
            password: 'hashed',
            role: 'client'
        };

        userRepositoryMocked.findById.mockResolvedValue(userMock);
        userRepositoryMocked.findByEmail.mockResolvedValue(null);

        await useCase.execute({ id: '123', name: 'Novo Nome', email: 'novo@email.com' });

        expect(userRepositoryMocked.edit).toHaveBeenCalledWith('123', {
            name: 'Novo Nome',
            email: 'novo@email.com'
        });
    });

    it('deve manter dados originais se nome e email não forem passados', async () => {
        const userMock = {
            id: '123',
            name: 'Usuário Antigo',
            email: 'old@email.com',
            password: 'hashed',
            role: 'client'
        };

        userRepositoryMocked.findById.mockResolvedValue(userMock);

        // Não atualiza email nem nome
        await useCase.execute({ id: '123' });

        expect(userRepositoryMocked.edit).toHaveBeenCalledWith('123', {
            name: 'Usuário Antigo',
            email: 'old@email.com'
        });
    });
});