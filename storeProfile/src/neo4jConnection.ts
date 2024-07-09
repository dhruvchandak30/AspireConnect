import neo4j, { Driver, Session } from "neo4j-driver";
import dotenv from "dotenv";
dotenv.config();

const url: string = process.env.DATABASE_URL!;
const name: string = process.env.DATABASE_USERNAME!;
const password: string = process.env.DATABASE_PASSWORD!;

const driver: Driver = neo4j.driver(url, neo4j.auth.basic(name, password));

export default driver;

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
