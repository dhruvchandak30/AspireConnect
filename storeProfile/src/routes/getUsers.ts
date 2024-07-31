import { Router, Request, Response } from 'express';
import driver from '../neo4jConnection';
import { UserType } from '../types/types';

const getUserRouter = Router();

getUserRouter.post('/', async (req: Request, res: Response) => {
    const session = req.neo4jSession;

    const data = req.query.userId as string;
    try {
        if (data === '*') {
            // Get all Users
            const result = await session?.run(`MATCH (n:User) RETURN n`);
            const nodes = result?.records.map((record) => record.get('n'));
            res.json(nodes);
        } else {
            // get Specific User
            const result = await session?.run(
                `MATCH (n:User {id: $userId}) RETURN n`,
                { data }
            );
            const user = result?.records.map((record) => record.get('n'))[0];
            res.json(user);
        }
    } catch (error) {
        console.error('Error querying Neo4j', error);
        res.status(500).send('Internal Server Error from Store Profile Service');
    } finally {
        await session?.close();
    }
});

export default getUserRouter