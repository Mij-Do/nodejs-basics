import type ProductService from "../services/productService.js";
import {type Request, type Response} from 'express';

class ProductsViewController {
    constructor (private productService: ProductService) {
        this.renderProductsList = this.renderProductsList.bind(this);
        this.renderProductPage = this.renderProductPage.bind(this);
    }


    renderProductsList (req: Request, res: Response) {
        // throw new Error("Something Went Wrong!!");
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
}

export default ProductsViewController;