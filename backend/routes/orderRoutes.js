import express from 'express';
const router = express.Router();
import * as orderController from '../controllers/orderController.js';
import {protect} from '../middleware/authMiddleware.js';

router.route('/').post(protect, orderController.addOrderItems);
router.route('/:id').get(protect, orderController.getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid)



export default router;
