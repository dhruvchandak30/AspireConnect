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
const getUserRouter = (0, express_1.Router)();
getUserRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = req.neo4jSession;
    const data = req.query.userId;
    try {
        if (data === '*') {
            // Get all Users
            const result = yield (session === null || session === void 0 ? void 0 : session.run(`MATCH (n:User) RETURN n`));
            const nodes = result === null || result === void 0 ? void 0 : result.records.map((record) => record.get('n'));
            res.json(nodes);
        }
        else {
            // get Specific User
            const result = yield (session === null || session === void 0 ? void 0 : session.run(`MATCH (n:User {id: $userId}) RETURN n`, { data }));
            const user = result === null || result === void 0 ? void 0 : result.records.map((record) => record.get('n'))[0];
            res.json(user);
        }
    }
    catch (error) {
        console.error('Error querying Neo4j', error);
        res.status(500).send('Internal Server Error');
    }
    finally {
        yield (session === null || session === void 0 ? void 0 : session.close());
    }
}));
