"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signupRouter = (0, express_1.Router)();
signupRouter.post("/", (req, res) => {
    const data = req.body;
    console.log(data);
    res.send({
        mssg: "Successful signup",
    });
});
exports.default = signupRouter;
