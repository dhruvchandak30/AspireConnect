"use strict";
// import express from "express";
// import dotenv from "dotenv";
// import { getProfileController } from "./controllers/getProfileController";
// // import { initializeNeo4j, getNeo4jSession } from "./neo4jConnection";
// dotenv.config();
// const app = express();
// app.use(express.json());
// app.get("/getprofile", getProfileController);
// const port = process.env.PORT || 3001;
// // initializeNeo4j().catch((error) => {
// //   console.error("Error initializing Neo4j", error);
// //   process.exit(1);
// // });
// app.get("/api/users", async (req, res) => {
//   const session = getNeo4jSession();
//   console.log(session);
//   try {
//     const result = await session.run("MATCH (u:User) RETURN u");
//     const users = result.records.map((record) => record.get("u").properties);
//     res.json(users);
//   } catch (error) {
//     console.error("Error fetching users from Neo4j", error);
//     res.status(500).json({ error: "Failed to fetch users" });
//   } finally {
//     session.close();
//   }
// });
// app.listen(port, () => {
//   console.log(`Profile Service Started on port ${port}`);
// });
