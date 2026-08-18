import type { IProduct } from "../interfaces/index.js";
import type ProductService from "../services/productService.js";
import {type Request} from 'express';

class ProductsController {
    constructor (private productService: ProductService) {}

    getProducts (req: Request): IProduct[] {
        const filteredQuery = req.query.filter as string;
        if (filteredQuery) {
            return this.productService.filterByQuery(filteredQuery);
        };
        return this.productService.findAll();
    };
};

export default ProductsController;