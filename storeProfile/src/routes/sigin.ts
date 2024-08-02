import { Router, Request, Response } from 'express';
const bcrypt = require('bcrypt');

const signinRouter = Router();

interface SigninType {
    email: string;
    password: string;
}

signinRouter.post('/', async (req: Request, res: Response) => {
    console.log('Got body', req.body);
    const signinData: SigninType = req.body;

    const session = req.neo4jSession;

    try {
        const result = await session?.run(
            `MATCH (u:User {email: $email}) RETURN u`,
            { email: signinData.email }
        );

        if (result?.records.length === 0) {
            return res.send({
                message: 'User not found',
            });
        }

        const user = result?.records[0].get('u');
        const storedPassword = user.properties.password;

        const isMatch = await bcrypt.compare(
            signinData.password,
            storedPassword
        );

        if (!isMatch) {
            return res.send({
                message: 'Invalid credentials',
            });
        }
        res.send({
            message: 'Sign in successful',
            user: {
                email: user.properties.email,
                firstName: user.properties.firstName,
                lastName: user.properties.lastName,
                id: user.properties.id,
                image_url: user.properties.image_url,
            },
        });
    } catch (error) {
        console.error('Error signing in', error);
        res.status(500).send('Error signing in');
    } finally {
        await session?.close();
    }
});

export default signinRouter;
