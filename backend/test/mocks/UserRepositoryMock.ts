
import { User } from '../../src/entites/User';
import { IUserRepository } from '../../src/repositories/IUserRepository';
import { UserPublicDTO } from '../../src/utils/sanitizeUser';

export const userRepositoryMock = (): jest.Mocked<IUserRepository> => ({
    findByEmail: jest.fn<Promise<User>, [string]>(),
    findById: jest.fn<Promise<User>, [string]>(),
    save: jest.fn<Promise<void>, [User]>(),
    list: jest.fn<Promise<UserPublicDTO[]>, []>(),
    remove: jest.fn<Promise<void>, [string]>(),
    edit: jest.fn<Promise<void>, [string, Partial<User>]>(),
});