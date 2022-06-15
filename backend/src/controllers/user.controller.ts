import * as express from "express";
import User from "../models/user";
import { Md5 } from "ts-md5";

export class UserController {
  getAllPendingCompanies = (_req: express.Request, res: express.Response) => {
    User.find({ type: "company", status: "pending" }, (err, users) => {
      if (err) console.log(err);
      else res.json(users);
    });
  };

  addUser = (req: express.Request, res: express.Response) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let username = req.body.username;
    let password = Md5.hashStr(req.body.password);
    let phone = req.body.phone;
    let email = req.body.email;
    let name = req.body.name;
    let pib = req.body.pib;
    let matBroj = req.body.matBroj;

    let user = new User({
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      phone: phone,
      email: email,
      name: name,
      pib: pib,
      matBroj: matBroj,
      type: "company",
      status: "pending",
    });
    user
      .save()
      .then((_user: any) => {
        res.status(200).json({ message: "uspesno dodat korisnik kurcina" });
      })
      .catch((err: any) => {
        // res.statusMessage = "doslo je do greske kurcina";
        // res.status(400).end();
        res.status(400).json({ message: "doslo je do greske" });
      });
  };

  login = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let password = Md5.hashStr(req.body.password);
    User.findOne(
      { username: username, password: password },
      (err: any, user: any) => {
        if (err) {
          // res.statusMessage = `doslo je do greske ${err}`;
          // res.status(400).end();
          res.status(400).json({ message: "doslo je do greske" });
        } else res.status(200).json(user);
      }
    );
  };

  changePassword = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    User.findOne(
      {
        username: username,
        password: Md5.hashStr(oldPassword),
      },
      (err: any, user: any) => {
        if (user != null) {
          user.password = Md5.hashStr(newPassword);
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
}
