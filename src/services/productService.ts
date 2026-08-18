import type { IProduct } from "../interfaces/index.js";

export default class ProductService {

    constructor (private products: IProduct[]) {
        this.products = products;
    }

    findAll (): IProduct[] {
        return this.products;
    }
}


    // const filteredQuery = req.query.filter as string;
    
    // if (filteredQuery) {
    //     const propertiesToFilter = filteredQuery.split(",");

    //     let filteredProducts = [];

    //     filteredProducts = fakeProductData.map(product => {
    //         const filteredProduct: any = {};
    //         propertiesToFilter.forEach(property => {
    //             if (product.hasOwnProperty(property as keyof IProduct)) {
    //                 filteredProduct[property] = product[property as keyof IProduct];
    //             }
    //         });
    //         return {id: product.id, ...filteredProduct};
    //     });
    //     return res.send(filteredProducts);
    // }
    // return res.send(fakeProductData);