import type { IProduct } from "../interfaces/index.js";
import type ProductService from "../services/productService.js";
import {type Request, type Response} from 'express';

class ProductsController {
    constructor (private productService: ProductService) {}

    getProducts (req: Request, res: Response) {
        const filteredQuery = req.query.filter as string;
        if (filteredQuery) {
            return res.send(this.productService.filterByQuery(filteredQuery));
        };
        return res.send(this.productService.findAll());
    };

    getProductById (req: Request, res: Response) {
        const productId = Number(req.params.id);

        if (isNaN(productId)) {
            res.status(404).send({message: `Invalid Product ID => ${productId}`});
        }
        const product = this.productService.getProductById(productId);
        if (product) {
            res.send({
                    "id": productId,
                    "title": product.title,
                    "description": product.description,
                    "price": product.price,
                });
        } else {
            res.status(404).send({message: `Can not find Product with ID => ${productId}`});
        }
    }
};

export default ProductsController;