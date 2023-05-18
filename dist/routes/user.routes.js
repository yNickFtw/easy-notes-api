"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const authenticateMiddleware_1 = require("../middlewares/authenticateMiddleware");
const router = (0, express_1.Router)();
router.post("/register", user_controller_1.default.create);
router.post("/authenticate", user_controller_1.default.authenticate);
router.get("/", authenticateMiddleware_1.checkIfIsAuthenticated, user_controller_1.default.findAll);
router.get("/profile", authenticateMiddleware_1.checkIfIsAuthenticated, user_controller_1.default.getLoggedUser);
router.get("/:id", authenticateMiddleware_1.checkIfIsAuthenticated, user_controller_1.default.findById);
exports.default = router;
