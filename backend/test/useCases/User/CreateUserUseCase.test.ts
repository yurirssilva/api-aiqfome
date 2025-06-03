import { User } from '../../../src/entites/User';
import { AppError } from '../../../src/helpers/AppError';
import { CreateUserUseCase } from '../../../src/useCases/User/Create/CreateUserUseCase';
import { userRepositoryMock } from '../../mocks/UserRepositoryMock';

describe('CreateUserUseCase', () => {
    const userRepositoryMocked = userRepositoryMock();
    const useCase = new CreateUserUseCase(userRepositoryMocked);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve criar um usuário com sucesso', async () => {
        userRepositoryMocked.findByEmail.mockResolvedValueOnce(null);

        await expect(useCase.execute({
            name: 'Alice',
            email: 'alice@example.com',
            password: '123456', // assume que o hash é feito pelo model
            role: 'client',
        })).resolves.toBeUndefined();

        expect(userRepositoryMocked.save).toHaveBeenCalled();
    });

    it('deve lançar erro se o e-mail já estiver em uso', async () => {
        const existingUser = new User({
            name: 'Bob',
            email: 'bob@example.com',
            password: '123456',
            role: 'client',
        })

        userRepositoryMocked.findByEmail.mockResolvedValue(existingUser);

        await expect(useCase.execute({
            name: 'Bob',
            email: 'bob@example.com',
            password: '123456',
            role: 'client',
        })).rejects.toBeInstanceOf(AppError);

        expect(userRepositoryMocked.save).not.toHaveBeenCalled();
    });
});