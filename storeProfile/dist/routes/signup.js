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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signupRouter = (0, express_1.Router)();
signupRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const userId = generateRandomId(10);
    const session = req.neo4jSession;
    try {
        const result = yield (session === null || session === void 0 ? void 0 : session.run(`CREATE (u:User {
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
      }) RETURN u`, {
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
        }));
        const user = result === null || result === void 0 ? void 0 : result.records[0].get("u");
        console.log(user);
        res.send({
            message: "User successfully signed up",
            user: user.properties,
            node_id: user.elementId
        });
    }
    catch (error) {
        console.error("Error creating user node", error);
        res.status(500).send("Error creating user node");
    }
    finally {
        yield (session === null || session === void 0 ? void 0 : session.close());
    }
}));
function generateRandomId(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}
exports.default = signupRouter;
