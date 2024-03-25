import {
  checkHeaderToken,
  generateToken,
  verifyToken,
} from "../actions/SignToken.js";
import { isEmailExist } from "../actions/CheckEmail.js";
import { isPasswordValid } from "../actions/CheckPassword.js";
import UserModel from "../model/UserModel.js";
import ApiResponse  from "../model/ApiResponse.js";

const LoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await isEmailExist(email);
    if (user) {
      if (!(await isPasswordValid(email, password))) {
        const error = new ApiResponse(
          "Password is not match",
          "ValidationError",
          404
        );
        return next(error);
      }

      req.user = user;
      const token = await generateToken(email, password);
      return res.status(200).json({
        token,
      });
    }

    const error = new ApiResponse(
      "Email does not exist",
      "ValidationError",
      404
    );
    return next(error);
  } catch (error) {
    const ErrorResponse = new ApiResponse(
      error.message,
      error.name || "InValid",
      400
    );
    return next(ErrorResponse);
  }
};
const ProtectedRoute = async (req, res, next) => {
  try {
    const oldToken = await checkHeaderToken(req, next);
    const decoded = await verifyToken(oldToken, next);
    const user = await UserModel.findOne({ email: decoded?.email }).select(
      "-password"
    );
    req.user = user;
    return next();
  } catch (error) {
    const ErrorResponse = new ApiResponse(error.message, error.name, 400);
    return next(ErrorResponse);
  }
};
const RegisterUser = async (req, res, next) => {
  try {
    const { username, email, password, cfpassword } = req.body;

    if (await isEmailExist(email)) {
      const error = new ApiResponse(
        "Email is already existed",
        "MongoDBError",
        404
      );
      return next(error);
    }

    const user = new UserModel({
      username,
      email,
      password,
      cfpassword,
    });
    const token = await generateToken(email, password);
    await user.save();

    return res.status(200).json({
      data: {
        username,
        email,
        token,
      },
    });
  } catch (error) {
    const ErrorResponse = new ApiResponse(error.message, error.name, 400);
    next(ErrorResponse);
  }
};

const AuthController = {
  LoginUser,
  ProtectedRoute,
  RegisterUser,
};

export default AuthController;
