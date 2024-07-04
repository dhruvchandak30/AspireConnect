"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./routes/route"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
const rateLimiter = new rate_limiter_flexible_1.RateLimiterMemory({
    points: 10,
    duration: 60,
});
const rateLimiterMiddleware = (req, res, next) => {
    rateLimiter
        //@ts-ignore
        .consume(req.ip)
        .then(() => {
        next();
    })
        .catch(() => {
        res.status(429).send("Too Many Requests");
    });
};
app.use(rateLimiterMiddleware);
app.use("/", route_1.default);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Gateway Started on port ${port}`);
});
