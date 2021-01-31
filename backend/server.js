import express from 'express'; 
import products from './data/products.js'; //don't forget the .js
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config()

connectDB();

const app = express();


//Lesson 11 - We added express and the backend folder and we added the start script in the root package.json file so we can use $npm start from the cmd terminal

app.get('/', (req, res) => {
    res.send('API is running...')
})
;
app.get('/api/products', (req, res) => {
    res.json(products)
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id)
    res.json(product)
});

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));