import express from "express";
import { DatabaseController } from "../controllers/database.controller";
const databaseRouter = express.Router();

databaseRouter
  .route("/migrate")
  .get((req, res) => new DatabaseController().migrate(req, res));

export default databaseRouter;
