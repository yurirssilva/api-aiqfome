import { Product } from "../entites/Product"

export interface IProductsProvider {
    findById(id_product): Promise<Product>;
}