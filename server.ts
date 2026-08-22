import express from 'express';
import ProductService from './services/productService.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateFakeData } from './utils/fakeData.js';
import ProductsController from './controllers/productsControllers.js';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// public 
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.render("index");
});

// Endpoint
const fakeProductData =  generateFakeData();

// services
const productService = new ProductService(fakeProductData);
// controller
const productsController = new ProductsController(productService);

// get products
app.get('/products', (req, res) => productsController.getProducts(req, res));

app.get(`/products/:id`, (req, res) => productsController.getProductById(req, res));

// post || create a new product
app.post("/products", (req, res) => productsController.postNewProduct(req, res));
// console.log(req.body);
// const newProduct = req.body;

// fakeProductData.push({id: fakeProductData.length + 1, ...newProduct});

// res.status(201).send({
//     id: fakeProductData.length + 1,
//     title: newProduct.title,
//     description: newProduct.description,
//     price: newProduct.price,
// });

// patch || update the products
app.patch("/products/:id", (req, res) => productsController.updateProducts(req, res));
// const productId = +req.params.id;
// if (isNaN(productId)) {
//     return res.status(404).send({
//         message: "Product not Found!",
//     });
// }

// const productIndex: number | undefined = fakeProductData.findIndex(product => product.id === productId);
// const productBody = req.body;

// if (productIndex !== -1) {
//     fakeProductData[productIndex] = {...fakeProductData[productIndex], ...productBody};
//     return res.status(200).send({
//         message: "Product has been Updated!"
//     });
// } else {
//     return res.status(404).send({
//         message: "Product not Found!",
//     });
// }

// delete || delete the product
app.delete("/products/:id", (req, res) => productsController.deleteProducts(req, res));
// const productId = +req.params.id;
// if (isNaN(productId)) {
//     return res.status(404).send({
//         message: "Product not Found!",
//     });
// }

// const productIndex: number | undefined = fakeProductData.findIndex(product => product.id === productId);

// if (productIndex !== -1) {
//     const filteredProducts = fakeProductData.filter(product => product.id !== productId);
//     return res.status(200).send(filteredProducts);
// } else {
//     return res.status(404).send({
//         message: "Product not Found!",
//     });
// }

const PORT = 5000;
app.listen(PORT ,() => {
    console.log(`Server is Running at => http://localhost:${PORT}`)
});