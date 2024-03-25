import mongoose from "mongoose";
import validator from "validator";
const { Schema } = mongoose;
const authScheme = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: [true, "Email must be unique"],
    required: [true, "Email is Required"],
    index: true,
    validate: [validator.isEmail, "Email is incorrect format"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is Required"],
    maxlength: [10, "Password must be less then 10 character"],
    minlength: [4, "Password must be more then 4 character"],
    select: false,
  },
  login_At: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

const AuthModel = mongoose.model("auth", authScheme);

export default AuthModel;
