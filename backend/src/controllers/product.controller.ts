import * as express from "express";
import path, { dirname } from "path";

import Product from "../models/products";
import User from "../models/user";
import Category from "../models/category";

export class ProductController {
  appDir = dirname(require.main.filename);
  fs = require("fs");

  uploadImage = async (file, imageName) => {
    const tempPath = file.path;
    const targetPath = path.join(
      this.appDir,
      `../public/productImages/${imageName}`
    );
    await this.fs.rename(tempPath, targetPath, (err) => {
      if (err) console.log(`greska ${err}`);
    });
  };

  handleError = (err: any, res: express.Response) => {
    console.log(err);
    res
      .status(400)
      .json({ message: "doslo je do greske", err: err.toString() });
  };
  addProductToCompany = (req, res) => {
    const code = req.body.code;
    const name = req.body.name;
    const taxRate = req.body.taxRate;
    const companyUsername = req.body.companyUsername;
    const unit = req.body.unit;

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
            ...(req.body.additionalData && {
              additionalData: JSON.parse(req.body.additionalData),
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
                  this.handleError(err, res);
                });
            })
            .catch((err) => {
              this.handleError(err, res);
            });
        } else {
          res.status(400).json({ message: "ne postoji takva kompanija" });
        }
      })
      .catch((err: any) => {
        this.handleError(err, res);
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
  getImage = (req, res) => {
    res.sendFile(
      path.join(this.appDir, `../public/productImages/${req.query.image}`)
    );
  };

  addCategory = (req, res) => {
    const name = req.body.name;
    const company = req.body.company;

    let category = new Category({
      name: name,
      company: company,
    });
    category
      .save()
      .then((category: any) => {
        User.findById(company).then((user) => {
          if (user) {
            user.categories.push(category);
            user.save().then((user) => {
              res.status(200).json({ message: "uspesno dodata kategorija" });
            });
          } else {
            res.status(400).json({ message: "ne postoji trazeni korisnik" });
          }
        });
      })
      .catch((err: any) => {
        this.handleError(err, res);
      });
  };

  getCategories = (req, res) => {
    User.findById(req.query.id)
      .populate({
        path: "categories",
        populate: {
          path: "subcategories",
          model: "Category",
          populate: {
            path: "supercategory",
            model: "Category",
          },
        },
      })
      .then(async (user) => {
        if (user) {
          res.status(200).json(user.categories);
        } else {
          res.status(400).json({ message: "ne postoji trazeni korisnik" });
        }
      })
      .catch((err: any) => {
        this.handleError(err, res);
      });
  };
  addSubcategory = (req, res) => {
    const name = req.body.name;
    const company = req.body.company;
    const category = req.body.category;

    let subcategory = new Category({
      name: name,
      company: company,
      supercategory: category,
    });
    subcategory
      .save()
      .then((subcategory: any) => {
        Category.findById(category).then((category) => {
          if (category) {
            category.subcategories.push(subcategory);
            category.save().then((category) => {
              res.status(200).json({ message: "uspesno dodata podkategorija" });
            });
          } else {
            res.status(400).json({ message: "ne postoji trazena kategorija" });
          }
        });
      })
      .catch((err: any) => {
        this.handleError(err, res);
      });
  };

  addToCategory = (req, res) => {
    const product = req.body.product;
    const category = req.body.category;

    Product.findById(product).then((product) => {
      if (product) {
        if (!product.category) {
          Category.findById(category)
            .then((category) => {
              if (category) {
                category.products.push(product);
                category.save().then((category) => {
                  product.category = category._id;
                  product.save().then((product) => {
                    res.status(200).json({ message: "dodato u kategoriju" });
                  });
                });
              } else {
                res
                  .status(400)
                  .json({ message: "ne postoji trazena kategorija" });
              }
            })
            .catch((err) => this.handleError(err, res));
        } else {
          res
            .status(400)
            .json({ message: "proizvod se vec nalazi u kategoriji" });
        }
      } else {
        res.status(400).json({ message: "ne postoji trazeni proizvod" });
      }
    });
  };
}
