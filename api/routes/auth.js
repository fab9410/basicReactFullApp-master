// Imports
import express from "express";
import { 
  registerController, 
  loginController, 
  confirmEmailController, 
  getForgotPasswordController,
  postForgotPasswordController,
  getResetPasswordController,
  postResetPasswordController
} from "../controllers/auth.js";
import { SendMail, forgotPasswordMail } from "../helpers/sendMail.js";
import {
  generateAccessToken,
  passToken,
  verifyToken,
  generateNewPasswordToken,
} from "../helpers/jwt.js";

// Initialisation du Router
const router = express.Router();

// Routes
router.get("/", (req, res, next) => {
  res.send("We are on users");
});
router.post("/register", generateAccessToken, registerController, SendMail); // CREATE USER
router.get("/confirmation/:token/:email", confirmEmailController, passToken); // CONFIRMATION EMAIL
router.post("/login", loginController); // LOGIN USER
router.get("/forgotPassword/forget", getForgotPasswordController); // FORGOT EMAIL USER (GET)
router.post("/forgotPassword/requestNew", generateNewPasswordToken, postForgotPasswordController, forgotPasswordMail); 

router.get("/resetPassword/:token", getResetPasswordController); //  RENEW EMAIL (GET)
router.post("/resetPassword/:token", postResetPasswordController); //  RENEW EMAIL (POST)

export default router;