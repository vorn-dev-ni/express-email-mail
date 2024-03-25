import bcrypt from "bcrypt";
import UserModel from "../model/UserModel.js";

export const isPasswordValid = async (email, password) => {
  const user = await UserModel.findOne({ email: email }).select("password");
  return await bcrypt.compare(password, user.password);
};
