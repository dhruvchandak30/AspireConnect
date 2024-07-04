import { Request, Response } from "express";

const profiles = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com" },
];

export const getProfileController = (req: Request, res: Response) => {
  console.log("Got Request for Get Profile");
  try {
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
