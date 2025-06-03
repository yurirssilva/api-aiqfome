import { Product } from "../../src/entites/Product";
import { IProductsProvider } from "../../src/providers/IProductsProvider";

export const productsProviderMock = (): jest.Mocked<IProductsProvider> => ({
  findById: jest.fn<Promise<Product | null>, [number]>(),
});