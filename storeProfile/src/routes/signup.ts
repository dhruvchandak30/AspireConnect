import { Router, Request, Response } from "express";

const signupRouter = Router();

signupRouter.post("/", (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);
  res.send({
    mssg: "Successful signup",
  });
});

export default signupRouter;
