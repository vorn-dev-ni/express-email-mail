import express from "express";
import AuthController from "../controllers/Auth.js";
export const AuthRouter = express.Router();
AuthRouter.post("/register", AuthController.RegisterUser);
AuthRouter.post("/login", AuthController.LoginUser);

// define your other controller route handler here
