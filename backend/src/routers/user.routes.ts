import express from "express";
import { UserController } from "../controllers/user.controller";
const userRouter = express.Router();

userRouter
  .route("/allUsers")
  .get((req, res) => new UserController().allUsers(req, res));
userRouter
  .route("/addUser")
  .post((req, res) => new UserController().addUser(req, res));

userRouter
  .route("/login")
  .post((req, res) => new UserController().login(req, res));
export default userRouter;
