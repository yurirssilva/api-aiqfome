import { ICacheProvider } from "../../src/providers/ICacheProvider";

export const cacheProviderMock = (): jest.Mocked<ICacheProvider> => ({
    getOrSet: jest.fn(),
    invalidate: jest.fn(),
});