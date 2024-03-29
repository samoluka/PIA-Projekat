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
productRouter
  .route("/delete")
  .delete((req, res) => new ProductController().deleteProduct(req, res));
productRouter
  .route("/update")
  .post((req, res) => new ProductController().updateProduct(req, res));
productRouter
  .route("/getImage")
  .get((req, res) => new ProductController().getImage(req, res));

productRouter
  .route("/addCategoty")
  .post((req, res) => new ProductController().addCategory(req, res));
productRouter
  .route("/addSubcategory")
  .post((req, res) => new ProductController().addSubcategory(req, res));
productRouter
  .route("/getCategories")
  .get((req, res) => new ProductController().getCategories(req, res));

productRouter
  .route("/addToCategory")
  .post((req, res) => new ProductController().addToCategory(req, res));

productRouter
  .route("/numberOfProducts")
  .get((req, res) => new ProductController().getNumberOfProducts(req, res));

export default productRouter;
