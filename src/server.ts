import express from 'express';


const app = express();

app.get('/', (req, res) => {});

const PORT = 5000;
app.listen(() => {
    console.log(`Server is Running at => http://localhost:${PORT}`)
});