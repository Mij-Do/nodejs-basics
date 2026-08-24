
import {type Request, type Response} from 'express';
import type ProductService from '../services/productService.js';

class ProductsController {
    constructor (private productService: ProductService) {
        this.getProducts = this.getProducts.bind(this);
    }

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

    postNewProduct (req: Request, res: Response) {
        const productBody = req.body;
        this.productService.createNewProduct(productBody);
        res.status(201).send({
            id: this.productService.findAll().length + 1,
            title: productBody.title,
            description: productBody.description,
            price: productBody.price,
        });
    }

    updateProducts (req: Request, res: Response) {
        const productId = Number(req.params.id);
        if (isNaN(productId)) {
            return res.status(404).send({
                message: "Product not Found!",
            });
        }
        const productIndex: number | undefined = this.productService.findAll().findIndex(product => product.id === productId);
        const productBody = req.body;
        if (productIndex !== -1) {
            this.productService.updateProducts(productIndex, productBody)
            return res.status(200).send({
                message: "Product has been Updated!"
            });
        } else {
            return res.status(404).send({
                message: "Product not Found!",
            });
        }
    }

    deleteProducts (req: Request, res: Response) {
        const productId = Number(req.params.id);
    if (isNaN(productId)) {
        return res.status(404).send({
            message: "Product not Found!",
        });
    }
    const productIndex: number | undefined = this.productService.findAll().findIndex(product => product.id === productId);
    if (productIndex !== -1) {
        const filteredProducts = this.productService.deleteProducts(productId);
        return res.status(200).send(filteredProducts);
    } else {
        return res.status(404).send({
            message: "Product not Found!",
        });
    }
    }

    renderProductsList (req: Request, res: Response) {
        res.render("products", {
            pageTitle: "Products List",
            description: "Most of Our Awesome Products",
            products: this.productService.findAll()
        })
    }

    renderProductPage (req: Request, res: Response) {
        const productId = Number(req.params.id);
        res.render("product", {
            product: this.productService.getProductById(productId)
        })
    }
};

export default ProductsController;