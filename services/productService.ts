import type { IProduct, IProductBody } from "../interfaces/index.js";


export default class ProductService {

    constructor (private products: IProduct[]) {
        this.products = products;
    }

    findAll (): IProduct[] {
        return this.products;
    }

    filterByQuery (filteredQuery?: string) {
        if (filteredQuery) {
            const propertiesToFilter = filteredQuery.split(",");

            let filteredProducts = [];

            filteredProducts = this.findAll().map(product => {
                const filteredProduct: any = {};
                propertiesToFilter.forEach(property => {
                    if (product.hasOwnProperty(property as keyof IProduct)) {
                        filteredProduct[property] = product[property as keyof IProduct];
                    }
                });
                return {id: product.id, ...filteredProduct};
            });
            return filteredProducts;
        }
        return this.findAll();
    }

    getProductById (productId: number) {
        return this.findAll().find(product => product.id === productId);
    }

    createNewProduct (newProduct: IProductBody) {
        return this.findAll().push({id: this.findAll().length + 1, ...newProduct});
    }

    updateProducts (index: number, productBody: IProduct) {
        return this.findAll()[index] = {...this.findAll()[index], ...productBody};
    }

    deleteProducts (productId: number) {
        return this.findAll().filter(product => product.id !== productId)
    }
}