import UserModel from "../model/UserModel.js";
export const isEmailExist = async (email) => {
  const result = await UserModel.findOne({ email: email }).select('-password');

  if (result?.email) {
    return result;
  }

  return false;
};
