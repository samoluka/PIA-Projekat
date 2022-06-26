import express from "express";
import multer from "multer";
import { ProductController } from "../controllers/product.controller";

const productRouter = express.Router();

const upload = multer({
  dest: "./tmp/",
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

productRouter
  .route("/addProduct")
  .post(
    upload.single("file" /* name attribute of <file> element in your form */),
    (req, res) => new ProductController().addProductToCompany(req, res)
  );

export default productRouter;
