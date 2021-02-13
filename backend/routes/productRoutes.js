import express from 'express';
const router = express.Router();
import * as productController from '../controllers/productController.js';



router.route('/').get(productController.getProducts);

router.route('/:id').get(productController.getProductById);


export default router