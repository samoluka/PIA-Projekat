import express from "express";
import { PaymentController } from "../controllers/payment.controller";
const paymentRouter = express.Router();

paymentRouter.route("/addReceipt").post((req, res) => new PaymentController().addReceipt(req, res));

export default paymentRouter;
