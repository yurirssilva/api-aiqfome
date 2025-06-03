export class Product {
    public readonly id: number;

    public title: string;
    public price: number;
    public description: string;
    public category: string;
    public image: string;
  
    public rating: {
      rate: number;
      count: number;
    };
  
    constructor(props: Omit<Product, 'id'>, id?: number) {
      Object.assign(this, props);
  
      if (id) {
        this.id = id;
      }
    }
}