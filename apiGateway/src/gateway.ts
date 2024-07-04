import express from "express";
import routes from "./routes/route";
import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";
const helmet = require("helmet");

dotenv.config();
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();
app.use(express.json());
app.use(limiter);
app.use("/", routes);
app.use(helmet());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Gateway Started on port ${port}`);
});
