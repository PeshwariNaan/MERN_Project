import express from 'express';
const router = express.Router();
import * as orderController from '../controllers/orderController.js';
import {protect} from '../middleware/authMiddleware.js';

//For future reference - the order of the routes matters. Example: The get my orders route will not work correctly if the '/:id' route is above it - Take caution
router.route('/').post(protect, orderController.addOrderItems);
router.route('/myorders').get(protect, orderController.getMyOrders);
router.route('/:id').get(protect, orderController.getOrderById);
router.route('/:id/pay').put(protect, orderController.updateOrderToPaid)



export default router;
