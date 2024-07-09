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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const neo4jConnection_1 = __importDefault(require("./neo4jConnection"));
const signup_1 = __importDefault(require("./routes/signup"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
const port = process.env.PORT || 3001;
// Middleware to add Neo4j session to the request object
app.use((req, res, next) => {
    req.neo4jSession = neo4jConnection_1.default.session();
    next();
});
// Routes
app.use("/signup", signup_1.default);
// Function to check database connection
const checkDatabaseConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = neo4jConnection_1.default.session();
        yield session.run("RETURN 1");
        yield session.close();
        console.log("Successfully connected to the database");
    }
    catch (error) {
        console.error("Failed to connect to the database", error);
    }
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running on ${port}`);
    yield checkDatabaseConnection();
}));
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    yield neo4jConnection_1.default.close();
    console.log("Neo4j driver closed");
    process.exit(0);
}));
