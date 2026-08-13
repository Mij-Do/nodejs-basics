import express from 'express';
import { generateFakeData } from './utils/fakeData.js';
import type { IProduct } from './interfaces/index.js';


const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`<h1> Hello Express.JS! </h1>`);
});

// Endpoint
const DUMMY_DATA =  generateFakeData();
// get products
app.get('/products', (req, res) => {
    const filteredQuery = req.query.filter as string;
    
    if (filteredQuery) {
        const propertiesToFilter = filteredQuery.split(",");

        let filteredProducts = [];

        filteredProducts = DUMMY_DATA.map(product => {
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
    return res.send(DUMMY_DATA);
});

app.get(`/products/:id`, (req, res) => {
    const productId = +req.params.id;
    if (isNaN(productId)) {
        res.status(404).send({message: `Invalid Product ID => ${productId}`});
    }
    const findProduct = DUMMY_DATA.find(product => product.id === productId);
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

    DUMMY_DATA.push({id: DUMMY_DATA.length + 1, ...newProduct});
    
    res.status(201).send({
        id: DUMMY_DATA.length + 1,
        title: newProduct.title,
        description: newProduct.description,
        price: newProduct.price,
    });
});


const PORT = 5000;
app.listen(PORT ,() => {
    console.log(`Server is Running at => http://localhost:${PORT}`)
});