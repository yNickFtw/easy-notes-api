"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdFromToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "secret";
function getUserIdFromToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token.split("Bearer ")[1], JWT_SECRET);
        return (decoded === null || decoded === void 0 ? void 0 : decoded.id) || null;
    }
    catch (_a) {
        return null;
    }
}
exports.getUserIdFromToken = getUserIdFromToken;
