"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./routes/route"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_rate_limit_1 = require("express-rate-limit");
const helmet = require("helmet");
dotenv_1.default.config();
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 1 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(limiter);
app.use("/", route_1.default);
app.use(helmet());
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Gateway Started on port ${port}`);
});
