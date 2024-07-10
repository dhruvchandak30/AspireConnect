import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import driver from "./neo4jConnection";
import signupRouter from "./routes/signup";
import { session } from "neo4j-driver";

const app = express();
dotenv.config();
app.use(express.json());

const port = process.env.PORT || 3001;

app.use((req: Request, res: Response, next: NextFunction) => {
  req.neo4jSession = driver.session();
  next();
});

// Routes
app.use("/signup", signupRouter);

const checkDatabaseConnection = async () => {
  try {
    const session = driver.session();
    await session.run("RETURN 1");
    await session.close();
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
};

app.listen(port, async () => {
  console.log(`Server is running on ${port}`);
  await checkDatabaseConnection();
});

process.on("SIGINT", async () => {
  await driver.close();
  console.log("Neo4j driver closed");
  process.exit(0);
});
