import express from "express";
import {
  getUserController,
  deleteController,
  getUserUpdateController,
  getAllUsersController,
  postUserUpdateController,
  postUserUpdateDoubleController,
} from "../controllers/users.js";
const router = express.Router();
import { createTransport } from "nodemailer";

import { SendMail, forgotPasswordMail } from "../helpers/sendMail.js";
import {
  generateAccessToken,
  passToken,
  verifyToken,
  generateNewPasswordToken,
} from "../helpers/jwt.js";
import { upload } from "../helpers/multer.js";
router.get("/", (req, res, next) => {
  res.send("We are on users");
});

router.get("/:id", getUserController); // USER (GET)
router.delete("/delete/:id", deleteController); // DELETE USER (DELETE)
router.get("/update/:id", verifyToken, getUserUpdateController); // UPDATE USER (GET)
router.post("/update/:id", upload, postUserUpdateController, getUserController); // UPDATE USER (POST)
router.get("/get/all", getAllUsersController); // ALL USERS (GET)
router.get("profile/:id", verifyToken, getUserController); // PROFILE (GET")

router.post("/updateDouble/:id", upload, postUserUpdateDoubleController, getUserController); // UPDATE USER (POST)

export default router;
