"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
// routers
const user_routes_1 = __importDefault(require("./user.routes"));
const note_routes_1 = __importDefault(require("./note.routes"));
const router = (0, express_1.Router)();
exports.router = router;
router.use("/users", user_routes_1.default);
router.use("/notes", note_routes_1.default);
