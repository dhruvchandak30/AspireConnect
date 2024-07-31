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
const bcrypt = require('bcrypt');
const signinRouter = (0, express_1.Router)();
signinRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Got body', req.body);
    const signinData = req.body;
    const session = req.neo4jSession;
    try {
        const result = yield (session === null || session === void 0 ? void 0 : session.run(`MATCH (u:User {email: $email}) RETURN u`, { email: signinData.email }));
        if ((result === null || result === void 0 ? void 0 : result.records.length) === 0) {
            return res.send({
                message: 'User not found',
            });
        }
        const user = result === null || result === void 0 ? void 0 : result.records[0].get('u');
        const storedPassword = user.properties.password;
        const isMatch = yield bcrypt.compare(signinData.password, storedPassword);
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
            },
        });
    }
    catch (error) {
        console.error('Error signing in', error);
        res.status(500).send('Error signing in');
    }
    finally {
        yield (session === null || session === void 0 ? void 0 : session.close());
    }
}));
exports.default = signinRouter;
