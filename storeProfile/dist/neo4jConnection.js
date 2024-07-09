"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3001;
app.use(express_1.default.json());
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log("Received data:", data);
    res.send({
        text: "Hello from Store Profile Service",
    });
}));
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
// import neo4j, { Driver, Session } from "neo4j-driver";
// import exp from "constants";
// const driver: Driver = neo4j.driver(
//   "neo4j+s://ea94a48f.databases.neo4j.io",
//   neo4j.auth.basic("neo4j", "sG8jKwphp4ymqMXe-JBv5sX1dKAJgDOEFZBR78lhVZU")
// );
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
// app.post("/actors", async (req: Request, res: Response) => {
//   const { name } = req.body;
//   const session: Session = driver.session();
//   try {
//     const result = await session.run(
//       "CREATE (a:Actor {name: $name}) RETURN a",
//       { name }
//     );
//     const actor = result.records[0].get("a").properties;
//     res.status(201).json(actor);
//   } catch (error) {
//     res.status(500).json({ error: (error as Error).message });
//   } finally {
//     await session.close();
//   }
// });
// app.post("/addActorToMovie", async (req: Request, res: Response) => {
//   const { movieTitle, actorName } = req.body;
//   const session: Session = driver.session();
//   try {
//     const result = await session.run(
//       `
//       MATCH (m:Movie {title: $movieTitle})
//       MATCH (a:Actor {name: $actorName})
//       CREATE (a)-[:ACTED_IN]->(m)
//       RETURN m
//       `,
//       { movieTitle, actorName }
//     );
//     const movie = result.records[0].get("m").properties;
//     res.status(201).json(movie);
//   } catch (error) {
//     res.status(500).json({ error: (error as Error).message });
//   } finally {
//     await session.close();
//   }
// });
