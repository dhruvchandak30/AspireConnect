import { Session } from "neo4j-driver";
import { Request } from "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    neo4jSession?: Session;
  }
}
