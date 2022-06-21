import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routers/user.routes";
import helloRouter from "./routers/hello.routes";
import databaseRouter from "./routers/database.routers";
import path from "path";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded());

mongoose.connect("mongodb://localhost:27017/projekat");
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("db connection ok");
});

const router = express.Router();
router.use("/users", userRouter);
router.use("/hello", helloRouter);
router.use("/database", databaseRouter);

app.use("/", router);

app.listen(4000, () => console.log(`Express server running on port 4000`));
