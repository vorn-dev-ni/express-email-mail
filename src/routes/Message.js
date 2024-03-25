import express from "express";
import MessageController from "../controllers/Message.js";
import AuthController from "../controllers/Auth.js";
import { restrictUser } from "../middleware/index.js";
import Message from "../model/UserMessage.js";
import ApiResponse from "../model/ApiResponse.js";

const messageRouter = express.Router();

messageRouter
  .route("/")
  .get(
    AuthController.ProtectedRoute,
    restrictUser("admin", "user"),
    MessageController.getAllMessage
  )
  .post(MessageController.postMessage);

messageRouter.param("messageId", async (req, res, next, value) => {
  const result = await Message.findById(value);
  if (!result?.id) {
    const errorData = new ApiResponse("Message does not exist with the id","Data Error",404)
    return next(errorData);
  }
  return next()

});
messageRouter.delete(
  "/:messageId",
  AuthController.ProtectedRoute,
  restrictUser("admin", "user"),
  MessageController.deleteSingleMessage
);

export default messageRouter;
