import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import driver from './neo4jConnection';
import signupRouter from './routes/signup';
import getUserRouter from './routes/getUsers';
import { session } from 'neo4j-driver';
import signinRouter from './routes/sigin';
import storeImageRouter from './routes/storeImage';

const app = express();
dotenv.config();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  app.options('*', (req, res) => {
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.send();
  });
app.use(express.json());

const port = process.env.PORT || 3001;

app.use((req: Request, res: Response, next: NextFunction) => {
    req.neo4jSession = driver.session();
    next();
});

// Routes
app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.use('/getuser', getUserRouter);
app.use('/storeimage',storeImageRouter);

const checkDatabaseConnection = async () => {
    try {
        const session = driver.session();
        await session.run('RETURN 1');
        await session.close();
        console.log('Successfully connected to the database');
    } catch (error) {
        console.error('Failed to connect to the database', error);
    }
};

app.listen(port, async () => {
    console.log(`Server is running on ${port}`);
    await checkDatabaseConnection();
});

process.on('SIGINT', async () => {
    await driver.close();
    console.log('Neo4j driver closed');
    process.exit(0);
});
