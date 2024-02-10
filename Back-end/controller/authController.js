import userModel from "../models/userModel.js";
import Jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../utils/AuthUtils.js";

export const RegisterController = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    // validation

    if (!fname) {
      return res.send({ message: "First Name is Require" });
    }
    if (!lname) {
      return res.send({ message: "Last Name is Require" });
    }
    if (!email) {
      return res.send({ message: "Email is Require" });
    }
    if (!password) {
      return res.send({ message: "Password is Require" });
    }
    //chek user

    const existingUser = await userModel.findOne({ email });
    // existiing user

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already Register Please Login ",
      });
    }
    const hashedPassword = await hashPassword(password);

    // save

    const user = await userModel({
      fname,
      lname,
      email,
      password: hashedPassword,
    }).save();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration ",
      error,
    });
  }
};

// Login

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "invalid email or password",
      });
    }

    // chek user

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "email is allready register",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(404).send({
        success: false,
        message: "password Invalid",
      });
    }

    const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "User Login Successfully",
      user: {
        _id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};
