import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  getUserController,
  updateUserController,
} from "../controllers/userController.js";

// router object
const router = express.Router();

// routes
//Get user
router.post("/getUser", userAuth, getUserController);
// get user
// UPDATE USER
router.put("/update-user", userAuth, updateUserController);
export default router;
