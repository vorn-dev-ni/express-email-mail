import UserModel from "../model/UserModel.js";
const FetchUser = async (req, res, next) => {
  try {
    const user = await UserModel.find({}).select("-__v");
    res.status(200).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
const DeleteUser = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const {id} = req.params.id
    const user = await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
const UserController = {
  FetchUser,
  DeleteUser,
};

export default UserController;
