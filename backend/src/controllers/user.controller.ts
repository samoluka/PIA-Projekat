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
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let username = req.body.username;
    let password = req.body.password;
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
    });
    user
      .save()
      .then((user) => {
        res.status(200).json({ message: "uspesno dodat korisnik" });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: `doslo je do greske ${err}` });
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
