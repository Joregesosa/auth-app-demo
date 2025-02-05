import jwt from "jsonwebtoken";
import { appConfig } from "../config/app_config.js";
/**
 * @description Middleware to verify if the token is valid
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Next function
 * @returns {object} - Status code and message
 */

export function authenticateToken(req, res, next) {
  try {
    const token = req.cookies?.token;
    const authHeader = req.headers["Authorization"];
    if (!token && !authHeader) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decode = authHeader ? authHeader : token;
    const decoded = jwt.verify(token, appConfig.secret);
    
    req.auth = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
}

export default authenticateToken;
