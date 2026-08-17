import express from 'express';
import { generateFakeData } from './utils/fakeData.js';
import type { IProduct } from './interfaces/index.js';
import ProductsController from './controllers/productsControllers.js';
import { ProductService } from './services/productService.js';


const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`<h1> Hello Express.JS! </h1>`);
});

// Endpoint
const fakeProductData =  generateFakeData();

// services
const productService = new ProductService();
// controller
const productsController = new ProductsController(productService);

// get products
app.get('/products', (req, res) => {
    return res.send(productsController.getProducts());
    const filteredQuery = req.query.filter as string;
    
    if (filteredQuery) {
        const propertiesToFilter = filteredQuery.split(",");

        let filteredProducts = [];

        filteredProducts = fakeProductData.map(product => {
            const filteredProduct: any = {};
            propertiesToFilter.forEach(property => {
                if (product.hasOwnProperty(property as keyof IProduct)) {
                    filteredProduct[property] = product[property as keyof IProduct];
                }
            });
            return {id: product.id, ...filteredProduct};
        });
        return res.send(filteredProducts);
    }
    return res.send(fakeProductData);
});

app.get(`/products/:id`, (req, res) => {
    const productId = +req.params.id;
    if (isNaN(productId)) {
        res.status(404).send({message: `Invalid Product ID => ${productId}`});
    }
    const findProduct = fakeProductData.find(product => product.id === productId);
    if (findProduct) {
        res.send({
                "id": productId,
                "title": findProduct.title,
                "description": findProduct.description,
                "price": findProduct.price,
            });
    } else {
        res.status(404).send({message: `Can not find Product with ID => ${productId}`});
    }
});

// post || create a new product
app.post("/products", (req, res) => {
    // console.log(req.body);
    const newProduct = req.body;

    fakeProductData.push({id: fakeProductData.length + 1, ...newProduct});
    
    res.status(201).send({
        id: fakeProductData.length + 1,
        title: newProduct.title,
        description: newProduct.description,
        price: newProduct.price,
    });
});

// patch || update the products
app.patch("/products/:id", (req, res) => {
    const productId = +req.params.id;
    if (isNaN(productId)) {
        return res.status(404).send({
            message: "Product not Found!",
        });
    }

    const productIndex: number | undefined = fakeProductData.findIndex(product => product.id === productId);
    const productBody = req.body;

    if (productIndex !== -1) {
        fakeProductData[productIndex] = {...fakeProductData[productIndex], ...productBody};
        return res.status(200).send({
            message: "Product has been Updated!"
        });
    } else {
        return res.status(404).send({
            message: "Product not Found!",
        });
    }
});

// delete || delete the product
app.delete("/products/:id", (req, res) => {
    const productId = +req.params.id;
    if (isNaN(productId)) {
        return res.status(404).send({
            message: "Product not Found!",
        });
    }

    const productIndex: number | undefined = fakeProductData.findIndex(product => product.id === productId);

    if (productIndex !== -1) {
        const filteredProducts = fakeProductData.filter(product => product.id !== productId);
        return res.status(200).send(filteredProducts);
    } else {
        return res.status(404).send({
            message: "Product not Found!",
        });
    }
});

const PORT = 5000;
app.listen(PORT ,() => {
    console.log(`Server is Running at => http://localhost:${PORT}`)
});