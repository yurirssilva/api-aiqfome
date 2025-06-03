import { v4 as uuid } from "uuid";

export class Favorite {
    public readonly id: string;

    public id_client: uuid;
    public id_product: number;

    constructor(props: Omit<Favorite, "id">, id?: string) {
        Object.assign(this, props);
        if (!id) {
            this.id = uuid();
        }
    }
}