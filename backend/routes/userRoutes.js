import express from 'express';
const router = express.Router();
import * as userController from '../controllers/userController.js';
import {protect} from '../middleware/authMiddleware.js';

router.route('/').post(userController.registerUser);
router.post('/login', userController.authUser);
router.route('/profile').get(protect, userController.getUserProfile).put(protect, userController.updateUserProfile);

export default router;



