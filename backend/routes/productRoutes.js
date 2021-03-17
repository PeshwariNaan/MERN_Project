import express from 'express';
const router = express.Router();
import * as productController from '../controllers/productController.js';
import {protect, admin} from '../middleware/authMiddleware.js';



router
  .route("/")
  .get(productController.getProducts)
  .post(protect, admin, productController.createProduct);
  router
  .route("/:id/reviews")
  .post(protect, productController.createProductReview)
router.get('/top', productController.getTopProducts)  
router
  .route("/:id")
  .get(productController.getProductById)
  .delete(protect, admin, productController.deleteProduct)
  .put(protect, admin, productController.updateProduct);

export default router;