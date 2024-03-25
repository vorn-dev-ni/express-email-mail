import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
const { Schema } = mongoose;
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is Required"],
    maxlength: [10, "Username must be less then 10 character"],
  },
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
  cfpassword: {
    type: String,
    trim: true,
    required: [true, "Password is Required"],
    maxlength: [10, "Password must be less then 10 character"],
    minlength: [4, "Password must be more then 4 character"],
    select: false,
    validate: {
      validator(value) {
        return value === this.password;
      },
      message: "Password is not match",
    },
  },
  created_At: {
    type: Date,
    default: Date.now,
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  console.log(this);
  // Only run this function if password was moddified (not on other update functions)
  if (!this.isModified("password")) return next();
  // Hash password with strength of 12
  this.password = await bcrypt.hash(this.password, 12);
  //remove the confirm field
  this.cfpassword = undefined;
  next();
});
const UserModel = mongoose.model("user", userSchema);

export default UserModel;
