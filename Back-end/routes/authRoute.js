import express from "express";
import {
  RegisterController,
  loginController,
} from "../controller/authController.js";

const router = express.Router();

//routing
//Register || Method POST

// register

router.post("/register", RegisterController);

// login

router.post("/login", loginController);

export default router;
