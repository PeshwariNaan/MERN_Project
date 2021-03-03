import express from 'express';
const router = express.Router();
import * as userController from '../controllers/userController.js';
import {protect, admin} from '../middleware/authMiddleware.js';

router
  .route("/")
  .post(userController.registerUser)
  .get(protect, admin, userController.getUsers);
router.post("/login", userController.authUser);
router
  .route("/profile")
  .get(protect, userController.getUserProfile)
  .put(protect, userController.updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, userController.deleteUser)
  .get(protect, admin, userController.getUserById)
  .put(protect, admin, userController.updateUser);

export default router;



