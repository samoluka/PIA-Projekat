import express from "express";
import { PaymentController } from "../controllers/payment.controller";
const paymentRouter = express.Router();

paymentRouter.route("/addReceipt").post((req, res) => new PaymentController().addReceipt(req, res));
paymentRouter
  .route("/getReceipts")
  .get((req, res) => new PaymentController().getReceipts(req, res));

paymentRouter.route("/getLatest").get((req, res) => new PaymentController().getLatest(req, res));
export default paymentRouter;
