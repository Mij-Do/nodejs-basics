import { Router } from "express";
import { generateFakeData } from "../utils/fakeData.js";
import ProductService from "../services/productService.js";
import ProductsController from "../controllers/productsControllers.js";


// Endpoint
const fakeProductData =  generateFakeData();

// services
const productService = new ProductService(fakeProductData);
// controller
const {getProducts, postNewProduct, getProductById, updateProducts, deleteProducts} = new ProductsController(productService);


const productsRoutes = Router();

productsRoutes.route("/").get(getProducts).post(postNewProduct);
productsRoutes.route("/:id").get(getProductById).patch(updateProducts).delete(deleteProducts);

export default productsRoutes;


