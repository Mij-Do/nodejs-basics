import type { IProduct } from "../interfaces/index.js";
import { generateFakeData } from "../utils/fakeData.js";


const fakeProductData =  generateFakeData();

export class ProductService {
    private readonly products: IProduct[] = fakeProductData;

    constructor () {}

    findAll () {
        return this.products;
    }
}