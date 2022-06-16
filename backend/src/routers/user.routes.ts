import express from "express";
import { UserController } from "../controllers/user.controller";
const userRouter = express.Router();

userRouter
  .route("/getAllPendingCompanies")
  .get((req, res) => new UserController().getAllPendingCompanies(req, res));
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
  .route("/approveCompany")
  .post((req, res) => new UserController().approveCompany(req, res));
userRouter
  .route("/rejectCompany")
  .post((req, res) => new UserController().rejectCompany(req, res));

userRouter
  .route("/updateUser")
  .post((req, res) => new UserController().updateUser(req, res));
export default userRouter;
