import axios from "axios";
import { Product } from "../../entites/Product";
import { AppError } from "../../helpers/AppError";
import { IProductsProvider } from "../IProductsProvider";

const API_URL = 'https://fakestoreapi.com/'
export class APIProductsProvider implements IProductsProvider {
    async findById(id_product: any): Promise<Product> {
        try {
            const endpoint = `products/${id_product}`
            const product: Product = await axios.get(API_URL + endpoint)
                .then(response => { return response.data });
            return product

        } catch (error) {
            throw new AppError(error)
        }
    }

}