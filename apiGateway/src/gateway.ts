import express from "express";
import routes from "./routes/route";
import dotenv from "dotenv";
import helmet from "helmet";
import { RateLimiterMemory } from "rate-limiter-flexible";

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());

const rateLimiter = new RateLimiterMemory({
  points: 10,
  duration: 60,
});

const rateLimiterMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  rateLimiter
    //@ts-ignore
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send("Too Many Requests");
    });
};

app.use(rateLimiterMiddleware);
app.use("/", routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Gateway Started on port ${port}`);
});
