import express from "express";
import multer from "multer";
import { UserController } from "../controllers/user.controller";
const userRouter = express.Router();

const upload = multer({
  dest: "./tmp/",
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

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

userRouter
  .route("/setCompanyAdditionInfo")
  .post((req, res) => new UserController().setCompanyAdditionInfo(req, res));

userRouter
  .route("/findUserWithProducts")
  .get((req, res) => new UserController().findUserWithProducts(req, res));

userRouter
  .route("/findUserWithPartners")
  .post((req, res) => new UserController().findUserWithPartners(req, res));
userRouter
  .route("/addPartnerToCompany")
  .post((req, res) => new UserController().addPartnerToCompany(req, res));

userRouter
  .route("/upload")
  .post(
    upload.single("file" /* name attribute of <file> element in your form */),
    (req, res) => new UserController().uploadImage(req, res)
  );
userRouter
  .route("/getImage")
  .get((req, res) => new UserController().getImage(req, res));
export default userRouter;
