import { Router, Request, Response } from "express";

const signupRouter = Router();

interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
  gender: string;
  location: string;
  bio: string;
  journey: string;
  career: string;
  interests: string;
}

signupRouter.post("/", async (req: Request, res: Response) => {
  const userData: UserType = req.body;

  const userId = generateRandomId(10);

  const session = req.neo4jSession;

  try {
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
        password: userData.password,
        age: userData.age,
        gender: userData.gender,
        location: userData.location,
        bio: userData.bio,
        journey: userData.journey,
        career: userData.career,
        interests: userData.interests,
      }
    );

    const user = result?.records[0].get("u");
    console.log(user);

    res.send({
      message: "User successfully signed up",
      user: user.properties,
      node_id:user.elementId
    });
  } catch (error) {
    console.error("Error creating user node", error);
    res.status(500).send("Error creating user node");
  } finally {
    await session?.close();
  }
});

function generateRandomId(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

export default signupRouter;
