import express from "express";
import routes from "./routes/route";
import dotenv from "dotenv";
import helmet from "helmet";
import { RateLimiterMemory } from "rate-limiter-flexible";
import bodyParser from 'body-parser';
dotenv.config();

const app = express();
// app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.options('*', (req, res) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.send();
});
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
