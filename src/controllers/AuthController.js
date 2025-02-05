import { User } from "../models/UserModel.js";
import { appConfig } from "../config/app_config.js";
import jwt from "jsonwebtoken";

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) {
      throw { message: "User not found", status: 404 };
    }

    const validPassword = password === user.password;

    if (!validPassword) {
      throw { message: "Invalid email or password", status: 401 };
    }

    const payload = {
      id: user.id,
      role: user.role,
    };
    // expires in 20 minutes
    const token = jwt.sign(payload, appConfig.secret, {
      expiresIn: "20m",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: 'none',
      secure: appConfig.env === "production",
      maxAge: 20 * 60 * 1000,
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
}

export async function profile(req, res, next) {
  try {
    const { auth } = req;

    const user = await User.find(auth.id);

    if (!user) {
      throw { message: "User not found", status: 404 };
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
}

export default login;
