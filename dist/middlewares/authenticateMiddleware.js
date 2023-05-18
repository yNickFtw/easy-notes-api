"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfIsAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || "secret";
function checkIfIsAuthenticated(req, res, next) {
    try {
        const token = req.headers["authorization"];
        if (!token)
            return res.status(401).json({ message: "Token not found" });
        const tokenSplited = token.split("Bearer ");
        const decoded = jsonwebtoken_1.default.verify(tokenSplited[1], JWT_SECRET);
        if (!decoded)
            return res.status(401).json({ message: "Invalid token" });
        next();
    }
    catch (error) {
        return res.status(401).json({ message: error.message });
    }
}
exports.checkIfIsAuthenticated = checkIfIsAuthenticated;
