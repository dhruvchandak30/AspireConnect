import { Router, Request, Response } from 'express';
const bcrypt = require('bcrypt');
import { UserType } from '../types/types';

const signupRouter = Router();

signupRouter.post('/', async (req: Request, res: Response) => {
    console.log('Got body', req.body);
    const userData: UserType = req.body;
    const userId = generateRandomId(10);

    const session = req.neo4jSession;

    try {
        const existingUserResult = await session?.run(
            `MATCH (u:User { email: $email }) RETURN u`,
            { email: userData.email }
        );

        if (existingUserResult && existingUserResult.records.length > 0) {
            console.log('Returning');
            return res.send({
                message: 'User with this email already exists',
            });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const result = await session?.run(
            `CREATE (u:User {
        id: $userId,
        firstName: $firstName,
        lastName: $lastName,
        email: $email,
        password: $password,
        age: $age,
        gender: $gender,
        location: $location,
        bio: $bio,
        journey: $journey,
        career: $career,
        interests: $interests
      }) RETURN u`,
            {
                userId,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: hashedPassword,
                age: userData.age,
                gender: userData.gender,
                location: userData.location,
                bio: userData.bio,
                journey: userData.journey,
                career: userData.career,
                interests: userData.interests,
            }
        );

        const user = result?.records[0].get('u');
        console.log(user);

        console.log('Success');
        res.send({
            message: 'User successfully signed up',
            user: user.properties,
            node_id: user.elementId,
        });
        console.log('Success');
    } catch (error) {
        console.error('Error creating user node', error);
        res.status(500).send('Error creating user node');
    } finally {
        await session?.close();
    }
});

function generateRandomId(length: number): string {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

export default signupRouter;
