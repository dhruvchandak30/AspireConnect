import neo4j, { Driver, Session } from "neo4j-driver";
import dotenv from "dotenv";
dotenv.config();

const url: string = process.env.DATABASE_URL!;
const name: string = process.env.DATABASE_USERNAME!;
const password: string = process.env.DATABASE_PASSWORD!;

const driver: Driver = neo4j.driver(url, neo4j.auth.basic(name, password));

export default driver;
