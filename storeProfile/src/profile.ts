import express from "express";
import dotenv from "dotenv";
import { getProfileController } from "./controllers/getProfileController";

dotenv.config();

const app = express();
app.use(express.json());
app.get("/getprofile", getProfileController);
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Profile Service Started on port ${port}`);
});
