import * as express from "express";
import Receipt from "../models/receipt";
export class PaymentController {
  addReceipt = (req: express.Request, res: express.Response) => {
    let productsInfo = req.body.productsInfo;
    let paymentInfo = req.body.paymentInfo;
    let company = req.body.company;

    let product = new Receipt({
      productsInfo: productsInfo,
      paymentInfo: paymentInfo,
      company: company,

      date: new Date(),
    });
    product
      .save()
      .then((product) => {
        res.status(200).json(product);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };

  getReceipts = (req: express.Request, res: express.Response) => {
    let user = req.query.id;
    Receipt.find({
      company: user,
    })
      .then((receipts) => {
        res.status(200).json(receipts);
      })
      .catch((err) => res.status(400).json(err));
  };

  getLatest(req, res) {
    Receipt.find()
      .sort({ date: -1 })
      .then((receipts) => {
        res.status(200).json(receipts);
      });
  }

  getReceiptsByIdCard(req, res) {
    Receipt.find().then((rec) => {
      res.status(200).json(rec);
    });
  }
}
