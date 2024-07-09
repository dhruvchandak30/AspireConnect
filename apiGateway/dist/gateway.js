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
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// app.use(express.json());
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.options('*', (req, res) => {
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.send();
});
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
