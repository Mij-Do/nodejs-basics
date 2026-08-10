import express from 'express';


const app = express();

app.get('/', (req, res) => {
    res.send(`<h1> Hello Express.JS! </h1>`);
});

// Endpoint
const DUMMY_DATA = [
        {
            "id": 1,
            "title": "product title",
            "description": "product description"
        },
        {
            "id": 2,
            "title": "new title",
            "description": "new description "
        },
        {
            "id": 3,
            "title": "the third product",
            "description": "third product description "
        }
    ];
app.get('/products', (req, res) => {
    res.send(DUMMY_DATA);
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
                "title": "product title",
                "description": "product description"
            });
    } else {
        res.status(404).send({message: `Can not find Product with ID => ${productId}`});
    }
})

const PORT = 5000;
app.listen(PORT ,() => {
    console.log(`Server is Running at => http://localhost:${PORT}`)
});