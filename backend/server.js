import express from 'express'; 
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import {notFound, errorHandler} from './middleware/errorMiddleware.js'


dotenv.config()

connectDB();

const app = express();

//Lesson 37 - Adding this to be able to accept JSON data in the body from Postman - This is for user authentication
app.use(express.json());


//Lesson 11 - We added express and the backend folder and we added the start script in the root package.json file so we can use $npm start from the cmd terminal

app.get('/', (req, res) => {
    res.send('API is running...')
});

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

//Lesson 22 - set up the routes  and moved the calls to product-router.js
// app.get('/api/products', (req, res) => {
//     res.json(products)
// });

// app.get('/api/products/:id', (req, res) => {
//     const product = products.find((p) => p._id === req.params.id)
//     res.json(product)
// });

//Lesson 24: Creating middleware that will handle the errors in the get requests - moved the code to the middleware errorMiddleware.js file
app.use(notFound)

app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));