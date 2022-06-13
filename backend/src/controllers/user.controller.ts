import * as express from "express";
import user from "../models/user";
import User from "../models/user";

export class UserController {
  allUsers = (req: express.Request, res: express.Response) => {
    User.find({}, (err, users) => {
      if (err) console.log(err);
      else res.json(users);
    });
  };
  addUser = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let password = req.body.password;
    let user = new User({ username: username, password: password });
    user
      .save()
      .then((user) => {
        res.status(200).json({ message: "uspesno dodat korisnik" });
      })
      .catch((err) => {
        res.status(400).json({ message: "doslo je do greske" });
      });
  };

  login = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let password = req.body.password;
    User.findOne(
      { username: req.body.username, password: password },
      (err, user) => {
        if (err) console.log(err);
        else res.json(user);
      }
    );
  };
}
