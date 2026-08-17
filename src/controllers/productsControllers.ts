import type { ProductService } from "../services/productService.js";

class ProductsController {
    constructor (private productService: ProductService) {}

    getProducts () {
        return this.productService.findAll();
    }
}

export default ProductsController;