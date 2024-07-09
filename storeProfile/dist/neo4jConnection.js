"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const neo4j_driver_1 = __importDefault(require("neo4j-driver"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const url = process.env.DATABASE_URL;
const name = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const driver = neo4j_driver_1.default.driver(url, neo4j_driver_1.default.auth.basic(name, password));
exports.default = driver;
// app.post("/movies", async (req: Request, res: Response) => {
//   const { title } = req.body;
//   const session: Session = driver.session();
//   try {
//     const result = await session.run(
//       "CREATE (m:Movie {title: $title}) RETURN m",
//       { title }
//     );
//     const movie = result.records[0].get("m").properties;
//     res.status(201).json(movie);
//   } catch (error) {
//     res.status(500).json({ error: (error as Error).message });
//   } finally {
//     await session.close();
//   }
// });
