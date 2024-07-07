import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import neo4j, { Driver, Session } from 'neo4j-driver';

const app = express();
const port = 4000;

const driver: Driver = neo4j.driver(
  "neo4j+s://ea94a48f.databases.neo4j.io",
  neo4j.auth.basic("neo4j", "sG8jKwphp4ymqMXe-JBv5sX1dKAJgDOEFZBR78lhVZU")
);

app.use(bodyParser.json());

app.post('/movies', async (req: Request, res: Response) => {
  const { title } = req.body;
  const session: Session = driver.session();
  try {
    const result = await session.run(
      "CREATE (m:Movie {title: $title}) RETURN m",
      { title }
    );
    const movie = result.records[0].get('m').properties;
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  } finally {
    await session.close();
  }
});

app.post('/actors', async (req: Request, res: Response) => {
  const { name } = req.body;
  const session: Session = driver.session();
  try {
    const result = await session.run(
      "CREATE (a:Actor {name: $name}) RETURN a",
      { name }
    );
    const actor = result.records[0].get('a').properties;
    res.status(201).json(actor);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  } finally {
    await session.close();
  }
});

app.post('/addActorToMovie', async (req: Request, res: Response) => {
  const { movieTitle, actorName } = req.body;
  const session: Session = driver.session();
  try {
    const result = await session.run(
      `
      MATCH (m:Movie {title: $movieTitle})
      MATCH (a:Actor {name: $actorName})
      CREATE (a)-[:ACTED_IN]->(m)
      RETURN m
      `,
      { movieTitle, actorName }
    );
    const movie = result.records[0].get('m').properties;
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  } finally {
    await session.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
