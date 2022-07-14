import * as express from "express";
import User from "../models/user";
import { Md5 } from "ts-md5";
import path, { dirname } from "path";

export class UserController {
  appDir = dirname(require.main.filename);
  fs = require("fs");

  getAllUsersWithFilter = (req: express.Request, res: express.Response) => {
    let filter = JSON.parse(req.query.filter.toString());
    console.log(filter);
    User.find(filter, (err, users) => {
      if (err) console.log(err);
      else res.json(users);
    });
  };

  uploadImage = async (file, imageName) => {
    const tempPath = file.path;
    const targetPath = path.join(this.appDir, `../public/userImages/${imageName}`);
    await this.fs.rename(tempPath, targetPath, (err) => {
      if (err) console.log(`greska ${err}`);
    });
  };

  addUser = (req: express.Request, res: express.Response) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let username = req.body.username;
    // let password = Md5.hashStr(req.body.password);
    let password = req.body.password;
    let phone = req.body.phone;
    let email = req.body.email;
    let name = req.body.name;
    let pib = req.body.pib;
    let matBroj = req.body.matBroj;
    let type = req.body.type;

    // console.log(req.body);

    let user = new User({
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      phone: phone,
      pib: pib,
      type: type,
      status: type == "customer" ? "active" : "pending",
      photo: "default.png",
      ...(req.body.address && { address: JSON.parse(req.body.address) }),
    });

    if (email != null) {
      user.email = email;
    }
    if (name != null) {
      user.name = name;
    }
    if (matBroj != null) {
      user.matBroj = matBroj;
    }
    if (req.file) {
      const fileType = path.extname(req.file.originalname).toLowerCase();
      console.log(`tip fajla: ${fileType}`);
      if (fileType === ".jpg" || fileType === ".png") {
        let imgName = `${user._id}${fileType}`;
        this.uploadImage(req.file, imgName);
        user.photo = imgName;
      } else {
        res.status(400).json({ message: "slika nije u odgovarajucem formatu" });
      }
    }
    user
      .save()
      .then((user: any) => {
        res.status(200).json({ message: "uspesno dodat korisnik" });
      })
      .catch((err: any) => {
        res.status(400).json({ message: "doslo je do greske", err: err });
      });
  };

  login = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    // let password = Md5.hashStr(req.body.password);
    let password = req.body.password;
    User.findOne({ username: username, password: password }, (err: any, user: any) => {
      if (err) {
        res.status(400).json({ message: "doslo je do greske" });
      } else res.status(200).json({ user: user });
    });
  };

  changePassword = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    console.log(req.body);

    User.findOne(
      {
        username: username,
        password: oldPassword,
      },
      (err: any, user: any) => {
        if (user != null) {
          user.password = newPassword;
          user.save().then((user) => {
            res.status(200).json({ message: "sve je okej" });
          });
        } else {
          // res.statusMessage = `doslo je do greske ${err}`;
          res.status(400).json({ message: "doslo je do greske" });
          // res.status(400).end();
        }
      }
    );
  };

  setUserStatus = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let status = req.body.status;
    User.findOneAndUpdate(
      {
        username: username,
      },
      {
        status: status,
      }
    ).then((user) => {
      if (user != null) res.status(200).json({ message: "sve ok" });
      else res.status(400).json({ message: "doslo je do greske" });
    });
  };

  updateUser = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let update = req.body.update;
    console.log(update);

    User.findOneAndUpdate(
      {
        username: username,
      },
      update,
      { new: true }
    ).then((user) => {
      if (user != null) res.status(200).json({ message: "sve ok ", user: user });
      else res.status(400).json({ message: "doslo je do greske" });
    });
  };

  setCompanyAdditionInfo = (req: express.Request, res: express.Response) => {
    let additionInfo = req.body.additionInfo;
    let username = req.body.username;
    User.findOneAndUpdate(
      {
        username: username,
        type: "company",
      },
      {
        additionInfo: additionInfo,
      },
      { new: true }
    ).then((user) => {
      if (user != null) res.status(200).json({ message: "sve ok ", user: user });
      else res.status(400).json({ message: "doslo je do greske" });
    });
  };

  addPartnerToCompany = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let partner = req.body.partner;
    User.findOne({
      username: partner,
    }).then((partnerUser) => {
      User.findOneAndUpdate(
        {
          username: username,
        },
        {
          $push: { partners: partnerUser._id },
        },
        { new: true, useFindAndModify: false }
      ).then((newUser) => {
        res.status(200).json({ message: "sve ok", user: newUser });
      });
    });
  };

  findUserWithPartners = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    User.findOne({ username: username })
      .populate("partners")
      .then((user) => {
        res.status(200).json(user);
      });
  };
  findUserWithProducts = (req: express.Request, res: express.Response) => {
    let username = req.query.username;
    let start = req.query.start;
    let end = req.query.end;

    User.findOne({ username: username })
      .populate({
        path: "products",
        ...(Number.parseInt(start.toString()) >= 0 && {
          options: {
            skip: Number.parseInt(start.toString()),
            limit: Number.parseInt(end.toString()),
          },
        }),
        populate: {
          path: "category",
          model: "Category",
          populate: {
            path: "supercategory",
            model: "Category",
          },
        },
      })
      .then((user) => {
        res.status(200).json(user);
      });
  };
  uploadImageEndpoint = (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(this.appDir, `../public/userImages/${req.file.originalname}`);
    if (path.extname(req.file.originalname).toLowerCase() === ".jpg") {
      this.fs.rename(tempPath, targetPath, (err) => {
        if (err) return this.handleError(err, res);

        res.status(200).json({ message: "File uploaded!" });
      });
    } else {
      this.fs.unlink(tempPath, (err) => {
        if (err) return this.handleError(err, res);
        res.status(403).json({ message: "Only .webp files are allowed!" });
      });
    }
  };

  getImage = (req, res) => {
    res.sendFile(path.join(this.appDir, `../public/userImages/${req.query.image}`));
  };

  handleError = (err, res) => {
    console.log(err);

    res.status(500).json({ message: "Oops! Something went wrong!" });
  };

  addRoom(req, res) {
    let user = req.body.id;
    let name = req.body.name;
    console.log(req.body);

    User.findOneAndUpdate(
      {
        _id: user,
      },
      {
        $push: {
          rooms: {
            name: name,
            tables: [],
          },
        },
      },
      { new: true, useFindAndModify: false }
    ).then((user) => {
      console.log(user);
      res.status(200).json(user);
    });
  }

  updateTables(req, res) {
    let id = req.body.id;
    let name = req.body.name;
    let tables = req.body.tables;
    console.log(req.body);
    User.findOne({
      _id: id,
    }).then((user) => {
      if (user) {
        let index = user.rooms.findIndex((r) => r.name == name);
        if (index != -1) {
          user.rooms[index].tables = tables;
          user.save().then((user) => res.status(200).json(user));
        } else {
          res.status(400).json("ne postoji takva soba");
        }
      } else {
        res.status(400).json("ne postoji takav korisnik");
      }
    });
  }

  getTables(req, res) {
    let id = req.body.id;
    let name = req.body.name;
    User.findOne({
      _id: id,
    }).then((user) => {
      if (user) {
        let index = user.rooms.findIndex((r) => r.name == name);
        if (index != -1) {
          res.status(200).json(user.rooms[index].tables);
        } else {
          res.status(400).json("ne postoji takva soba");
        }
      } else {
        res.status(400).json("ne postoji takav korisnik");
      }
    });
  }
  findUserById(req, res) {
    User.findById(req.query.id)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => res.status(400).json(err));
  }
}
