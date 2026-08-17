import type { IProduct } from "../interfaces/index.js";

class ProductsController {
    products: IProduct[];
    constructor(products: IProduct[]) {
        this.products = products;
    }
}

export default ProductsController;