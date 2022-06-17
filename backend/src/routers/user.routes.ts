import express from "express";
import { UserController } from "../controllers/user.controller";
const userRouter = express.Router();

userRouter
  .route("/getAllUsersWithFilter")
  .get((req, res) => new UserController().getAllUsersWithFilter(req, res));
userRouter
  .route("/addUser")
  .post((req, res) => new UserController().addUser(req, res));

userRouter
  .route("/login")
  .post((req, res) => new UserController().login(req, res));
userRouter
  .route("/changePassword")
  .post((req, res) => new UserController().changePassword(req, res));

userRouter
  .route("/setUserStatus")
  .post((req, res) => new UserController().setUserStatus(req, res));

userRouter
  .route("/updateUser")
  .post((req, res) => new UserController().updateUser(req, res));
export default userRouter;
