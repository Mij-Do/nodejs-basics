// the old way to create a server "common JS"
// const http = require("node:http");

import * as http from "node:http";
import fs, {promises as fsPromises} from "fs";
import path from "path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
    const productsFilePath = path.join(__dirname, "data", "products.json");
    const assetsPath = path.join(__dirname, "assets");

    if (req.url === "/") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end("<h1>Welcome Back!</h1>");
    } else if (req.url === "/products") {
        fs.access(productsFilePath, err => {
            if (err) {
                console.log("this path does not exists", productsFilePath);
                return;
            };
            fs.readFile(productsFilePath, "utf8", (err, data) => {
                const jsonProducts: 
                    {products: [{id: number, title: string, description: string}]} = JSON.parse(data);
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
        req.on("end", async () => {
            const data = new URLSearchParams(body);
            const title = data.get("title");
            const description = data.get("description");

            // ## the old way 

            // fs.readFile(productsFilePath, "utf8", (err, data) => {
            //     if (err) {
            //         res.writeHead(500, { 'Content-Type': 'text/html' });
            //         return res.end("<h1>Something went wrong reading products</h1>");
            //     }

            //     const jsonProducts: 
            //         {products: [{id: number, title: string, description: string}]} = JSON.parse(data);
            //         jsonProducts.products.push({
            //             id: jsonProducts.products.length + 1,
            //             title: title as string,
            //             description: description as string
            //         });
            //         const updatedData = JSON.stringify(jsonProducts, null, 2);
            //     // writeFile
            //     fs.writeFile(
            //         productsFilePath, 
            //         updatedData,
            //         {flag: "w"},
            //         err => { console.log(err)},
            //     );
            //     console.error("error =>", err);
            //     console.log("data =>", jsonProducts);
            // });

            // the new way
            try {
                const jsonData = await fsPromises.readFile(productsFilePath, "utf8");
                const jsonProducts: 
                    {products: [{id: number, title: string, description: string}]} = JSON.parse(jsonData);
                jsonProducts.products.push({
                    id: jsonProducts.products.length + 1,
                    title: title as string,
                    description: description as string
                });
                const updatedData = JSON.stringify(jsonProducts, null, 2);
                fsPromises.writeFile(
                    productsFilePath, 
                    updatedData,
                    {flag: "w"},
                );
                console.log("data =>", jsonProducts);
            } catch (error) {
                console.log(error)
            }

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
    } else if (req.method === "GET" && req.url === "/assets") {
        fs.access(assetsPath, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            fs.readdir(assetsPath, (err, files) => {
                res.writeHead(200, {"content-type": "text/html"});
                res.write("<h1> Here is your Files ... </h1>");
                res.write("<ul>");
                files.forEach(file => {
                    res.write(`<li> <a href="/delete?file=${encodeURIComponent(file)}"> ${file} </a> </li>`)
                });
                res.write("</ul>");
                res.end();
            })
        })
    } else if (req.method === "GET" && req.url?.startsWith('/delete')) {
        res.write("<h1> This file has been deleted! </h1>");
        res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end("<h1>Not Found!</h1>");
    }
});

const PORT = 8000;

server.listen(PORT, () => {
    console.log(`the server is running in the local host => http://localhost:${PORT}`);
}); // => http://localhost:5000;