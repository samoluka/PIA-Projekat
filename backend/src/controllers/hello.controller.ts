import * as express from "express";

export class HelloController {
  hello = (req: express.Request, res: express.Response) => {
    res.send("hello");
  };
}
