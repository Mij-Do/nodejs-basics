// the old way to create a server "common JS"
// const http = require("node:http");

import * as http from "node:http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end("<h1>Welcome Back!</h1>");
    } else if (req.url === "/products") {
        const productsFilePath = path.join(__dirname, "data", "products.json");
        fs.access(productsFilePath, err => {
            if (err) {
                console.log("this path does not exists", productsFilePath);
                return;
            };
            fs.readFile(productsFilePath, "utf8", (err, data) => {
                const jsonProducts: 
                    {products: [{id: number, title: string, description: string}]} = JSON.parse(data);
                    const submittedProduct = {
                            "id": 2,
                            "title": "Second Products",
                            "description": "second description"
                        }
                    jsonProducts.products.push(submittedProduct);
                    const updatedData = JSON.stringify(jsonProducts, null, 2);
                // writeFile
                fs.writeFile(
                    productsFilePath, 
                    updatedData,
                    {flag: "w"},
                    err => { console.log(err)},
                );
                console.error("error =>", err);
                console.log("data =>", jsonProducts);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(data);
                res.end();
            });
        })
    } else if (req.url === "/products/new") {
        res.writeHead(200 ,{"content-type": "text/html"});
        res.write(`
                <html>
                    <head>
                        <title> Add New Product </title>
                    </head>
                    <body>
                        <h2> Add New Product </h2>
                        <form method="POST" action="add-product">
                            <label for="title"> Title: </label> <br>
                            <input type="text" id="title" name="title" required> <br> <br>
                            <label for="description"> Description: </label> <br>
                            <textarea type="text" id="description" name="description"> </textarea> <br> <br>
                            <button type="submit"> Add Product </button>
                        </form>
                    </body>
                </html>
            `);
        res.end();
    } else if (req.method === "POST" && req.url === "/products/add-product") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            const data = new URLSearchParams(body);
            const title = data.get("title");
            const description = data.get("description");

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(`
                    <div>
                        <h1> Product have added Successfully !!! </h1>
                        <h2>Title: ${title}</h2>
                        <h2>Description: ${description}</h2>
                    </div>
                `);
            res.end();
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end("<h1>Not Found!</h1>");
    }
});

const PORT = 8000;

server.listen(PORT, () => {
    console.log(`the server is running in the local host => http://localhost:${PORT}`);
}); // => http://localhost:5000;