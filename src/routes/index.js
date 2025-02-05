import { Router, static as static_ } from "express";
import { user_router } from "./UserRouter.js";
import { auth_router } from "./AuthRouter.js";
 

import auth from "../middlewares/Auth.js";
import path from "path";

const app_router = Router();
const __dirname = path.resolve();
/**
 * @description Register all routes
 * @param {Router} app
 */
export function routes(app) {
  app.use("/api/v1", app_router);
 
  app_router.use("/auth", auth_router);
  app_router.use("/users", auth, user_router);
 
}

export default routes;
