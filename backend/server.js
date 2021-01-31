const express = require('express'); 
const products = require('./data/products.js')

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



app.listen(5000, console.log('Server running on port 5000'));