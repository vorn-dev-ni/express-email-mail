import express from "express";
import UserController from "../controllers/User.js";
import AuthController from "../controllers/Auth.js";
import { restrictUser } from "../middleware/index.js";
export const UserRouter = express.Router();
UserRouter.get("/", AuthController.ProtectedRoute, restrictUser('admin','user'), UserController.FetchUser);

UserRouter.delete("/:id", AuthController.ProtectedRoute, restrictUser('admin'), UserController.DeleteUser);
