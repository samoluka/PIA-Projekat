import * as express from "express";
import User from "../models/user";
import mongoose from "mongoose";
import { Md5 } from "ts-md5";

export class DatabaseController {
  migrate(req: express.Request, res: express.Response): void {
    //create admin

    User.findOneAndDelete({ username: "admin" }, () => {
      let admin = new User({
        firstName: "admin",
        lastName: "admin",
        username: "admin",
        password: Md5.hashStr("admin"),
        phone: "admin",
        email: "admin",
        name: "admin",
        pib: "admin",
        matBroj: "admin",
        type: "admin",
      });
      admin.save().catch((err: any) => {
        console.error(err);
      });
    });

    res.status(200).json({ message: "sve ok" });
  }
}
