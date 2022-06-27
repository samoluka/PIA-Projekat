import * as express from "express";
import path, { dirname } from "path";

import Product from "../models/products";
import User from "../models/user";

export class ProductController {
  appDir = dirname(require.main.filename);
  fs = require("fs");

  uploadImage = async (file, imageName) => {
    const tempPath = file.path;
    const targetPath = path.join(
      this.appDir,
      `../public/productImage/${imageName}`
    );
    await this.fs.rename(tempPath, targetPath, (err) => {
      if (err) console.log(`greska ${err}`);
    });
  };

  addProductToCompany = (req, res) => {
    const code = req.body.code;
    const name = req.body.name;
    const taxRate = req.body.taxRate;
    const companyUsername = req.body.companyUsername;
    const unit = req.body.unit;

    console.log(req.body);

    let handleError = (err: any, res: express.Response) => {
      console.log(err);
      res
        .status(400)
        .json({ message: "doslo je do greske", err: err.toString() });
    };
    User.findOne({
      username: companyUsername,
    })
      .then((user) => {
        if (user != null) {
          let product = new Product({
            code: code,
            name: name,
            taxRate: taxRate,
            company: user._id,
            unit: unit,
            ...(req.body.additionlData && {
              additionalData: req.body.additionlData,
            }),
          });

          product
            .save()
            .then(async (product: any) => {
              if (req.file) {
                const fileType = path
                  .extname(req.file.originalname)
                  .toLowerCase();
                console.log(`tip fajla: ${fileType}`);
                if (fileType === ".jpg" || fileType === ".png") {
                  await this.uploadImage(req.file, `${product._id}${fileType}`);
                  product.photo = `${product._id}${fileType}`;
                  await product.save();
                } else {
                  console.log("fajl nije u zadatom formatu");
                }
              }
              user.products.push(product);
              user
                .save()
                .then((user: any) => {
                  res.status(200).json({ message: "uspesno dodat proizvod" });
                })
                .catch((err: any) => {
                  handleError(err, res);
                });
            })
            .catch((err) => {
              handleError(err, res);
            });
        } else {
          res.status(400).json({ message: "ne postoji takva kompanija" });
        }
      })
      .catch((err: any) => {
        handleError(err, res);
      });
  };

  deleteProduct = (req, res) => {
    console.log(req.body.id);
    Product.findByIdAndDelete(req.body.id)
      .then((product: any) => {
        if (product) res.status(200).json({ message: "proizvod obrisan" });
        else res.status(400).json({ message: "ne postoji takav proizvod" });
      })
      .catch((err: any) => {
        res
          .status(400)
          .json({ message: "doslo je do greske", err: err.toString() });
      });
  };
  updateProduct = (req, res) => {
    let update = req.body.update;
    delete update.photo;
    Product.findByIdAndUpdate(req.body.id, update, { new: true })
      .then((product: any) => {
        if (product)
          res
            .status(200)
            .json({ message: "proizvod izmenjen", product: product });
        else res.status(400).json({ message: "ne postoji takav proizvod" });
      })
      .catch((err: any) => {
        res
          .status(400)
          .json({ message: "doslo je do greske", err: err.toString() });
      });
  };
}
