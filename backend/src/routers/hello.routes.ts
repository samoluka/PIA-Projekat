import express from "express";
import { HelloController } from "../controllers/hello.controller";
const helloRouter = express.Router();

helloRouter.route("/").get((req, res) => new HelloController().hello(req, res));

export default helloRouter;
