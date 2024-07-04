"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileController = void 0;
const profiles = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" },
];
const getProfileController = (req, res) => {
    console.log("Got Request for Get Profile");
    try {
        res.json(profiles);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getProfileController = getProfileController;
