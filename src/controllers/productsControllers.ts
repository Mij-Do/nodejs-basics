import type { IProduct } from "../interfaces/index.js";
import type ProductService from "../services/productService.js";

class ProductsController {
    constructor (private productService: ProductService) {}

    getProducts (): IProduct[] {
        return this.productService.findAll();
    }
}

export default ProductsController;