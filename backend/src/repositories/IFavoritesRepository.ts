export interface IFavoritesRepository {
    insert(id_client: string, id_product: number): Promise<void>
    list(id_client: string): Promise<number[]>
    remove(id_client: string, id_product: number): Promise<void>
}