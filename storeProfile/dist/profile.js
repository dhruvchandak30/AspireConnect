"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const getProfileController_1 = require("./controllers/getProfileController");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/getprofile", getProfileController_1.getProfileController);
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Profile Service Started on port ${port}`);
});
